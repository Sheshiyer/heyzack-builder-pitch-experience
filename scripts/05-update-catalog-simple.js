#!/usr/bin/env node

/**
 * Simple Catalog Image Updater
 * Updates product_catalog.json to use existing numbered images (1.png, 2.png, etc.)
 * from public/images/products/{SKU}/ folders
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_FILE = path.join(__dirname, '../data/product_catalog.json');
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');
const BACKUP_FILE = path.join(__dirname, '../data/product_catalog.backup.json');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

// Find images in a product folder
function findProductImages(productDir) {
  if (!fs.existsSync(productDir)) {
    return null;
  }

  const files = fs.readdirSync(productDir);
  const images = [];

  // Look for numbered images (1.png, 2.jpg, etc.)
  for (let i = 1; i <= 20; i++) {
    for (const ext of IMAGE_EXTENSIONS) {
      const filename = `${i}${ext}`;
      if (files.includes(filename)) {
        images.push(filename);
        break; // Found this number, move to next
      }
    }
  }

  // Also check for main.png/jpg if exists
  for (const ext of IMAGE_EXTENSIONS) {
    if (files.includes(`main${ext}`)) {
      images.unshift(`main${ext}`); // Add to beginning
      break;
    }
  }

  return images.length > 0 ? images : null;
}

// Generate image paths for catalog
function generateImagePaths(sku, images) {
  const baseUrl = `/images/products/${sku}`;
  
  return {
    main: `${baseUrl}/${images[0]}`,
    mainFallback: null,
    thumbnail: `${baseUrl}/${images[0]}`,
    gallery: images.map(img => `${baseUrl}/${img}`),
    lifestyle: [],
    specs: [],
    package: []
  };
}

// Main function
function updateCatalog() {
  console.log('📝 Simple Catalog Image Updater\n');
  console.log('This script updates the catalog to use existing numbered images (1.png, 2.png, etc.)\n');

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
    totalImagesLinked: 0
  };

  const productsWithoutImages = [];

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

      const sku = product.sku.toUpperCase();
      const productDir = path.join(PRODUCTS_DIR, sku);
      
      // Find images in product folder
      const images = findProductImages(productDir);

      if (!images) {
        console.log(`  ⚠️  No images found for: ${sku}`);
        stats.productsWithoutImages++;
        productsWithoutImages.push({ sku, name: product.name, category: category.name });
        continue;
      }

      // Update product with new image paths
      product.images = generateImagePaths(sku, images);
      stats.productsUpdated++;
      stats.totalImagesLinked += images.length;

      console.log(`  ✓ ${sku}: ${images.length} images (main: ${images[0]})`);
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
  console.log(`Total Images Linked:        ${stats.totalImagesLinked}`);
  console.log('═══════════════════════════════════════════════════════\n');

  // Show products without images
  if (productsWithoutImages.length > 0) {
    console.log('⚠️  Products without image folders:\n');
    productsWithoutImages.forEach(p => {
      console.log(`   - ${p.sku}: ${p.name} (${p.category})`);
    });
    console.log('');
  }

  console.log('✅ Catalog update complete!\n');
  console.log('Next steps:');
  console.log('  1. Run the app: npm run dev');
  console.log('  2. Check that images load correctly');
  console.log(`  3. If needed, restore backup from: ${BACKUP_FILE}\n`);
}

// Run
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
