#!/usr/bin/env node

/**
 * Image Discovery Script
 * Scans HD IMAGES 2 folder and creates mapping of HZ reference numbers to image locations
 * Keeps vendor information private while creating traceable mapping
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../data/HD IMAGES 2');
const OUTPUT_FILE = path.join(__dirname, 'image-mapping.json');
const VENDOR_MAPPING_FILE = path.join(__dirname, 'vendor-mapping.json');

// Image file extensions to include
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];

// Extract HZ reference number from folder name
function extractHZReference(folderName) {
  // Match patterns like:
  // HZ-SS-VIDDOR04
  // HZ-SS-VIDDOR04 (IPB196)
  // 01-HZ-SN-CONACC05
  // 人体传感器 HZ-SN-CONACC03
  const hzPattern = /HZ-[A-Z]{1,2}-[A-Z0-9]+/i;
  const match = folderName.match(hzPattern);
  return match ? match[0].toUpperCase() : null;
}

// Check if file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

// Recursively find all images in a directory
function findImagesInDirectory(dir, relativeTo = dir) {
  const images = [];
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      // Skip hidden files and system folders
      if (item.name.startsWith('.') || item.name === '__MACOSX') {
        continue;
      }
      
      if (item.isDirectory()) {
        // Recursively search subdirectories
        images.push(...findImagesInDirectory(fullPath, relativeTo));
      } else if (item.isFile() && isImageFile(item.name)) {
        images.push({
          filename: item.name,
          fullPath: fullPath,
          relativePath: path.relative(relativeTo, fullPath),
          size: fs.statSync(fullPath).size
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return images;
}

// Main discovery function
function discoverImages() {
  console.log('🔍 Starting image discovery...\n');
  console.log(`Source directory: ${SOURCE_DIR}\n`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Error: Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }
  
  const imageMapping = {};
  const vendorMapping = {};
  const stats = {
    totalVendors: 0,
    totalProducts: 0,
    totalImages: 0,
    productsWithoutImages: [],
    productsWithImages: [],
    unmatchedFolders: []
  };
  
  // Read vendor directories
  const vendors = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory() && !item.name.startsWith('.'));
  
  stats.totalVendors = vendors.length;
  console.log(`📁 Found ${vendors.length} vendor folders\n`);
  
  // Process each vendor
  for (const vendor of vendors) {
    const vendorPath = path.join(SOURCE_DIR, vendor.name);
    console.log(`Processing vendor: ${vendor.name}`);
    
    // Read product directories
    const products = fs.readdirSync(vendorPath, { withFileTypes: true })
      .filter(item => item.isDirectory() && !item.name.startsWith('.'));
    
    for (const product of products) {
      const productPath = path.join(vendorPath, product.name);
      const hzRef = extractHZReference(product.name);
      
      if (hzRef) {
        stats.totalProducts++;
        
        // Find all images in product directory
        const images = findImagesInDirectory(productPath, SOURCE_DIR);
        
        if (images.length > 0) {
          if (!imageMapping[hzRef]) {
            imageMapping[hzRef] = {
              images: [],
              imageCount: 0,
              totalSize: 0
            };
          }
          
          // Add images to mapping
          imageMapping[hzRef].images.push(...images);
          imageMapping[hzRef].imageCount = imageMapping[hzRef].images.length;
          imageMapping[hzRef].totalSize = imageMapping[hzRef].images.reduce((sum, img) => sum + img.size, 0);
          
          stats.productsWithImages.push(hzRef);
          
          // Store vendor mapping (private file)
          if (!vendorMapping[hzRef]) {
            vendorMapping[hzRef] = {
              vendor: vendor.name,
              productFolder: product.name,
              sourcePath: path.relative(__dirname, productPath)
            };
          }
          
          console.log(`  ✓ ${hzRef}: ${images.length} images`);
        } else {
          stats.productsWithoutImages.push(hzRef);
          console.log(`  ⚠ ${hzRef}: No images found`);
        }
      } else {
        stats.unmatchedFolders.push(`${vendor.name}/${product.name}`);
        console.log(`  ⚠ Could not extract HZ reference from: ${product.name}`);
      }
    }
    
    console.log('');
  }
  
  stats.totalImages = Object.values(imageMapping).reduce((sum, item) => sum + item.imageCount, 0);
  
  // Write output files
  console.log('💾 Writing mapping files...\n');
  
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(imageMapping, null, 2),
    'utf8'
  );
  console.log(`✓ Image mapping saved to: ${OUTPUT_FILE}`);
  
  fs.writeFileSync(
    VENDOR_MAPPING_FILE,
    JSON.stringify(vendorMapping, null, 2),
    'utf8'
  );
  console.log(`✓ Vendor mapping saved to: ${VENDOR_MAPPING_FILE} (PRIVATE - DO NOT COMMIT)\n`);
  
  // Print summary statistics
  console.log('📊 Discovery Summary:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total Vendors:              ${stats.totalVendors}`);
  console.log(`Total Products Found:       ${stats.totalProducts}`);
  console.log(`Products with Images:       ${stats.productsWithImages.length}`);
  console.log(`Products without Images:    ${stats.productsWithoutImages.length}`);
  console.log(`Total Images Found:         ${stats.totalImages}`);
  console.log(`Unmatched Folders:          ${stats.unmatchedFolders.length}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Show products without images
  if (stats.productsWithoutImages.length > 0) {
    console.log('⚠️  Products without images:');
    stats.productsWithoutImages.forEach(ref => console.log(`   - ${ref}`));
    console.log('');
  }
  
  // Show unmatched folders
  if (stats.unmatchedFolders.length > 0) {
    console.log('⚠️  Folders without HZ reference:');
    stats.unmatchedFolders.slice(0, 10).forEach(folder => console.log(`   - ${folder}`));
    if (stats.unmatchedFolders.length > 10) {
      console.log(`   ... and ${stats.unmatchedFolders.length - 10} more`);
    }
    console.log('');
  }
  
  // Show top 5 products by image count
  console.log('📸 Top 5 products by image count:');
  const sortedProducts = Object.entries(imageMapping)
    .sort((a, b) => b[1].imageCount - a[1].imageCount)
    .slice(0, 5);
  
  sortedProducts.forEach(([ref, data], index) => {
    const sizeMB = (data.totalSize / 1024 / 1024).toFixed(2);
    console.log(`   ${index + 1}. ${ref}: ${data.imageCount} images (${sizeMB} MB)`);
  });
  console.log('');
  
  console.log('✅ Discovery complete!\n');
  console.log('Next steps:');
  console.log('  1. Review image-mapping.json');
  console.log('  2. Run migration script: node scripts/02-migrate-images.js --dry-run');
  console.log('  3. Add vendor-mapping.json to .gitignore\n');
  
  return {
    imageMapping,
    vendorMapping,
    stats
  };
}

// Run discovery
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    discoverImages();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

export { discoverImages, extractHZReference };
