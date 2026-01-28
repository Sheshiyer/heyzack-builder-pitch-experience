#!/usr/bin/env node

/**
 * Catalog Cleanup Script
 * - Removes variant products (identified as duplicates)
 * - Updates image paths for products with new images
 * - Uses HZ-C-BATSOL02 images for HZ-C-BATSOL01
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_FILE = path.join(__dirname, '../data/product_catalog.json');

// Products to REMOVE (variants without unique images)
const productsToRemove = [
  'HZ-CS-BATSOL02',
  'HZ-CS-35S10N01',
  'HZ-CS-CURKIT02',
  'HZ-CS-CURKIT03',
  'HZ-CS-CURKIT04',
  'HZ-CS-CURKIT05',
  'HZ-CS-CURKIT06',
  'HZ-CS-CURKIT07',
  'HZ-CS-CURKIT08',
  'HZ-CS-CURKIT10',
  'HZ-CS-CURKIT11',
  'HZ-CS-CURKIT12',
  'HZ-CS-CURKIT13',
  'HZ-CS-CURKIT14',
  'HZ-CS-CURKIT15',
  'HZ-CS-CURKIT16',
  'HZ-SA-CONACC02',
  'HZ-SL-24VTRA01',
  'HZ-SL-24VTRA03'
];

// Helper function to generate image paths
function generateImages(sku, count = 8) {
  const base = `/images/products/${sku}`;
  return {
    main: `${base}/1.png`,
    mainFallback: null,
    thumbnail: `${base}/1.png`,
    gallery: Array.from({length: count}, (_, i) => `${base}/${i+1}.png`),
    lifestyle: [],
    specs: [],
    package: []
  };
}

function cleanupCatalog() {
  console.log('🧹 Catalog Cleanup Script\n');

  // Load catalog
  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  console.log(`📁 Loaded catalog with ${catalog.categories.length} categories\n`);

  let removedCount = 0;
  let updatedCount = 0;

  // Process each category
  for (const category of catalog.categories) {
    if (!category.products) continue;

    // Filter out products to remove
    const originalLength = category.products.length;
    category.products = category.products.filter(p => {
      if (p.sku && productsToRemove.includes(p.sku.toUpperCase())) {
        console.log(`  🗑️  Removed: ${p.sku} - ${p.name}`);
        removedCount++;
        return false;
      }
      return true;
    });

    // Update specific products
    for (const product of category.products) {
      if (!product.sku) continue;
      const sku = product.sku.toUpperCase();

      // HZ-C-BATSOL01 uses HZ-C-BATSOL02 images
      if (sku === 'HZ-C-BATSOL01') {
        product.images = generateImages('HZ-C-BATSOL02');
        console.log(`  ✓ Updated: ${sku} - using HZ-C-BATSOL02 images`);
        updatedCount++;
      }

      // New images added by user
      if (['HZ-LT-CONACC02', 'HZ-LT-SPOTLT07', 'HZ-SN-CONACC01'].includes(sku)) {
        product.images = generateImages(sku);
        console.log(`  ✓ Updated: ${sku} - added new images`);
        updatedCount++;
      }
    }
  }

  // Update product stats
  let totalProducts = 0;
  const categorySummary = {};
  for (const category of catalog.categories) {
    if (category.products) {
      const count = category.products.length;
      category.product_count = count;
      totalProducts += count;
      categorySummary[category.name] = count;
    }
  }
  catalog.product_stats.total_products = totalProducts;
  catalog.product_stats.categories_summary = categorySummary;

  // Save updated catalog
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📊 Cleanup Summary:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Products Removed:       ${removedCount}`);
  console.log(`Products Updated:       ${updatedCount}`);
  console.log(`Total Products Now:     ${totalProducts}`);
  console.log('═══════════════════════════════════════════════════════\n');

  console.log('✅ Catalog cleanup complete!\n');
}

// Run
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    cleanupCatalog();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

export { cleanupCatalog };
