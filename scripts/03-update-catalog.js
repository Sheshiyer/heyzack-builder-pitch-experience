#!/usr/bin/env node

/**
 * Catalog Updater Script
 * Updates product_catalog.json with new image paths from migrated images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_FILE = path.join(__dirname, '../data/product_catalog.json');
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const BACKUP_FILE = path.join(__dirname, '../data/product_catalog.backup.json');

// Generate image URLs for a product
function generateImagePaths(hzRef, manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }
  
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const baseUrl = `/images/products/${hzRef}`;
  
  const imagePaths = {
    main: manifest.images.main ? `${baseUrl}/${manifest.images.main}` : null,
    mainFallback: manifest.images.mainFallback ? `${baseUrl}/${manifest.images.mainFallback}` : null,
    thumbnail: manifest.images.thumbnail ? `${baseUrl}/${manifest.images.thumbnail}` : null,
    gallery: manifest.images.gallery.map(img => `${baseUrl}/${img}`),
    lifestyle: manifest.images.lifestyle.map(img => `${baseUrl}/${img}`),
    specs: manifest.images.specs.map(img => `${baseUrl}/${img}`),
    package: manifest.images.package.map(img => `${baseUrl}/${img}`)
  };
  
  // Use first gallery image as main if no main image exists
  if (!imagePaths.main && imagePaths.gallery.length > 0) {
    imagePaths.main = imagePaths.gallery[0];
  }
  
  // Use main as thumbnail if no thumbnail exists
  if (!imagePaths.thumbnail && imagePaths.main) {
    imagePaths.thumbnail = imagePaths.main;
  }
  
  return imagePaths;
}

// Update catalog
function updateCatalog() {
  console.log('📝 Catalog Updater Script\n');
  
  // Check if catalog exists
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error(`❌ Error: Catalog not found: ${CATALOG_FILE}`);
    process.exit(1);
  }
  
  // Create backup
  console.log('💾 Creating backup...');
  fs.copyFileSync(CATALOG_FILE, BACKUP_FILE);
  console.log(`✓ Backup saved to: ${BACKUP_FILE}\n`);
  
  // Load catalog
  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  console.log(`📁 Loaded catalog with ${catalog.categories.length} categories\n`);
  
  const stats = {
    totalProducts: 0,
    productsUpdated: 0,
    productsWithoutImages: 0,
    imagesAdded: 0
  };
  
  // Process each category
  for (const category of catalog.categories) {
    console.log(`📦 Processing category: ${category.name}`);
    
    if (!category.products || !Array.isArray(category.products)) {
      console.log(`  ⚠️  No products array found, skipping\n`);
      continue;
    }
    
    for (const product of category.products) {
      stats.totalProducts++;
      
      if (!product.sku) {
        console.log(`  ⚠️  Product missing SKU: ${product.name}`);
        continue;
      }
      
      const hzRef = product.sku.toUpperCase();
      const productDir = path.join(PRODUCTS_DIR, hzRef);
      const manifestPath = path.join(productDir, 'manifest.json');
      
      if (!fs.existsSync(productDir)) {
        console.log(`  ⚠️  No images found for: ${hzRef} (${product.name})`);
        stats.productsWithoutImages++;
        continue;
      }
      
      // Generate image paths
      const imagePaths = generateImagePaths(hzRef, manifestPath);
      
      if (!imagePaths) {
        console.log(`  ⚠️  No manifest found for: ${hzRef}`);
        stats.productsWithoutImages++;
        continue;
      }
      
      // Update product with image paths
      product.images = imagePaths;
      stats.productsUpdated++;
      
      const totalImages = 
        (imagePaths.main ? 1 : 0) +
        imagePaths.gallery.length +
        imagePaths.lifestyle.length +
        imagePaths.specs.length +
        imagePaths.package.length;
      
      stats.imagesAdded += totalImages;
      
      console.log(`  ✓ ${hzRef}: ${totalImages} images`);
    }
    
    console.log('');
  }
  
  // Write updated catalog
  console.log('💾 Writing updated catalog...');
  fs.writeFileSync(
    CATALOG_FILE,
    JSON.stringify(catalog, null, 2),
    'utf8'
  );
  console.log(`✓ Catalog updated: ${CATALOG_FILE}\n`);
  
  // Print summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 Update Summary:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total Products:             ${stats.totalProducts}`);
  console.log(`Products Updated:           ${stats.productsUpdated}`);
  console.log(`Products Without Images:    ${stats.productsWithoutImages}`);
  console.log(`Total Image URLs Added:     ${stats.imagesAdded}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Show products without images
  if (stats.productsWithoutImages > 0) {
    console.log('⚠️  Products without images need attention:\n');
    
    for (const category of catalog.categories) {
      if (!category.products) continue;
      
      for (const product of category.products) {
        if (!product.images || !product.images.main) {
          console.log(`   - ${product.sku}: ${product.name}`);
        }
      }
    }
    console.log('');
  }
  
  console.log('✅ Catalog update complete!\n');
  console.log('Next steps:');
  console.log('  1. Review updated catalog: data/product_catalog.json');
  console.log('  2. Test image loading in application');
  console.log('  3. Run validation: node scripts/04-validate-images.js');
  console.log(`  4. If needed, restore backup from: ${BACKUP_FILE}\n`);
}

// Run updater
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    updateCatalog();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    console.error('\nBackup available at:', BACKUP_FILE);
    process.exit(1);
  }
}

export { updateCatalog };
