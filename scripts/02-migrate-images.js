#!/usr/bin/env node

/**
 * Image Migration Script
 * Copies and renames images from vendor folders to public/images/products/
 * with vendor-neutral naming convention
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../data/HD IMAGES 2');
const DEST_DIR = path.join(__dirname, '../public/images/products');
const MAPPING_FILE = path.join(__dirname, 'image-mapping.json');
const MANIFEST_DIR = path.join(__dirname, '../public/images/products');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const shouldOptimize = args.includes('--optimize');
const shouldOverwrite = args.includes('--overwrite');

// Parse --products flag
const productsIndex = args.indexOf('--products');
const specificProducts = productsIndex !== -1 && args[productsIndex + 1]
  ? args[productsIndex + 1].split(',').map(p => p.trim().toUpperCase())
  : null;

// Categorize images by filename patterns
function categorizeImage(filename) {
  const lower = filename.toLowerCase();
  const name = path.parse(filename).name.toLowerCase();
  
  // Main product images (usually first or named "main", "product", etc.)
  if (name.match(/^(main|product|hero|primary|01|1|正面|主图1|主图)/)) {
    return 'main';
  }
  
  // Lifestyle/scene images
  if (lower.match(/(lifestyle|scene|room|场景|使用)/)) {
    return 'lifestyle';
  }
  
  // Specification/detail images
  if (lower.match(/(spec|detail|dimension|size|规格|详情|尺寸)/)) {
    return 'spec';
  }
  
  // Package/box images
  if (lower.match(/(package|box|包装)/)) {
    return 'package';
  }
  
  // Thumbnail
  if (lower.match(/(thumb|small|thumbnail)/)) {
    return 'thumbnail';
  }
  
  // Default to detail
  return 'detail';
}

// Generate standardized filename
function generateFilename(originalFilename, category, index, ext) {
  if (category === 'main') {
    return `main${ext}`;
  }
  if (category === 'thumbnail') {
    return `thumbnail${ext}`;
  }
  
  // For other categories, use sequential numbering
  const num = String(index).padStart(2, '0');
  return `${category}-${num}${ext}`;
}

// Sanitize and prepare image for copying
function prepareImage(sourceInfo, hzRef, stats) {
  const ext = path.extname(sourceInfo.filename).toLowerCase();
  const category = categorizeImage(sourceInfo.filename);
  
  return {
    sourcePath: sourceInfo.fullPath,
    category,
    ext,
    size: sourceInfo.size
  };
}

// Copy and rename images for a product
function migrateProduct(hzRef, imageData, stats, isDryRun) {
  const productDir = path.join(DEST_DIR, hzRef);
  
  console.log(`\n📦 Processing: ${hzRef}`);
  console.log(`   Images: ${imageData.imageCount}`);
  
  if (!isDryRun) {
    fs.mkdirSync(productDir, { recursive: true });
  }
  
  // Prepare all images
  const preparedImages = imageData.images.map((img, idx) => 
    prepareImage(img, hzRef, stats)
  );
  
  // Group by category
  const byCategory = {};
  preparedImages.forEach(img => {
    if (!byCategory[img.category]) {
      byCategory[img.category] = [];
    }
    byCategory[img.category].push(img);
  });
  
  // Process each category
  const migratedFiles = {
    main: null,
    mainFallback: null,
    thumbnail: null,
    gallery: [],
    lifestyle: [],
    specs: [],
    package: []
  };
  
  Object.entries(byCategory).forEach(([category, images]) => {
    images.forEach((img, idx) => {
      const filename = generateFilename(img.sourcePath, category, idx + 1, img.ext);
      const destPath = path.join(productDir, filename);
      
      if (isDryRun) {
        console.log(`   [DRY RUN] Would copy:`);
        console.log(`      ${path.relative(SOURCE_DIR, img.sourcePath)}`);
        console.log(`      → ${filename}`);
      } else {
        // Check if file exists and overwrite flag
        if (fs.existsSync(destPath) && !shouldOverwrite) {
          console.log(`   ⚠️  Skip (exists): ${filename}`);
          stats.skipped++;
        } else {
          try {
            fs.copyFileSync(img.sourcePath, destPath);
            console.log(`   ✓ Copied: ${filename}`);
            stats.copied++;
            stats.totalSize += img.size;
          } catch (error) {
            console.error(`   ❌ Error copying ${filename}:`, error.message);
            stats.errors++;
          }
        }
      }
      
      // Track in manifest
      if (category === 'main') {
        migratedFiles.main = filename;
      } else if (category === 'detail') {
        migratedFiles.gallery.push(filename);
      } else if (category === 'lifestyle') {
        migratedFiles.lifestyle.push(filename);
      } else if (category === 'spec') {
        migratedFiles.specs.push(filename);
      } else if (category === 'package') {
        migratedFiles.package.push(filename);
      } else if (category === 'thumbnail') {
        migratedFiles.thumbnail = filename;
      }
    });
  });
  
  // Generate product manifest
  if (!isDryRun) {
    const manifestPath = path.join(productDir, 'manifest.json');
    const manifest = {
      sku: hzRef,
      images: migratedFiles,
      imageCount: imageData.imageCount,
      migrated: new Date().toISOString(),
      sourceImageCount: imageData.imageCount
    };
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`   ✓ Generated manifest.json`);
  }
  
  return migratedFiles;
}

// Main migration function
function migrateImages() {
  console.log('🚀 Image Migration Script\n');
  
  if (isDryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be copied\n');
  }
  
  // Load mapping file
  if (!fs.existsSync(MAPPING_FILE)) {
    console.error(`❌ Error: Mapping file not found: ${MAPPING_FILE}`);
    console.error('Please run 01-discover-images.js first');
    process.exit(1);
  }
  
  const imageMapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
  console.log(`📁 Loaded mapping for ${Object.keys(imageMapping).length} products\n`);
  
  // Filter products if specified
  let productsToMigrate = Object.keys(imageMapping);
  if (specificProducts) {
    productsToMigrate = productsToMigrate.filter(ref => 
      specificProducts.includes(ref)
    );
    console.log(`🎯 Migrating specific products: ${specificProducts.join(', ')}\n`);
  }
  
  if (productsToMigrate.length === 0) {
    console.error('❌ No products to migrate');
    process.exit(1);
  }
  
  const stats = {
    totalProducts: productsToMigrate.length,
    processedProducts: 0,
    copied: 0,
    skipped: 0,
    errors: 0,
    totalSize: 0
  };
  
  const startTime = Date.now();
  
  // Create destination directory
  if (!isDryRun) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }
  
  // Migrate each product
  productsToMigrate.forEach(hzRef => {
    const imageData = imageMapping[hzRef];
    migrateProduct(hzRef, imageData, stats, isDryRun);
    stats.processedProducts++;
  });
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  // Print summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 Migration Summary:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Products Processed:     ${stats.processedProducts}/${stats.totalProducts}`);
  console.log(`Images Copied:          ${stats.copied}`);
  console.log(`Images Skipped:         ${stats.skipped}`);
  console.log(`Errors:                 ${stats.errors}`);
  
  if (!isDryRun) {
    const sizeMB = (stats.totalSize / 1024 / 1024).toFixed(2);
    console.log(`Total Size Copied:      ${sizeMB} MB`);
  }
  
  console.log(`Duration:               ${duration}s`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  if (isDryRun) {
    console.log('✅ Dry run complete!\n');
    console.log('Next steps:');
    console.log('  1. Review the output above');
    console.log('  2. Run actual migration: node scripts/02-migrate-images.js');
    console.log('  3. Add --overwrite flag to replace existing files\n');
  } else {
    console.log('✅ Migration complete!\n');
    console.log('Next steps:');
    console.log('  1. Review migrated images in: public/images/products/');
    console.log('  2. Update product catalog: node scripts/03-update-catalog.js');
    console.log('  3. Validate: node scripts/04-validate-images.js\n');
    
    if (stats.errors > 0) {
      console.log(`⚠️  ${stats.errors} errors occurred during migration`);
      console.log('   Check the output above for details\n');
    }
  }
}

// Run migration
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    migrateImages();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

export { migrateImages };
