#!/usr/bin/env node

/**
 * Validation Script
 * Validates migrated images and catalog references
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_FILE = path.join(__dirname, '../data/product_catalog.json');
const PRODUCTS_DIR = path.join(__dirname, '../public/images/products');

// Validate image file exists
function validateImagePath(imagePath, baseDir) {
  if (!imagePath) return { exists: false, reason: 'null path' };
  
  // Remove leading slash and convert to filesystem path
  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(baseDir, '../..', relativePath);
  
  if (!fs.existsSync(fullPath)) {
    return { exists: false, reason: 'file not found', path: fullPath };
  }
  
  const stats = fs.statSync(fullPath);
  return { 
    exists: true, 
    size: stats.size,
    path: fullPath
  };
}

// Validate product images
function validateProduct(product, stats) {
  const issues = [];
  
  if (!product.sku) {
    issues.push('Missing SKU');
    return issues;
  }
  
  if (!product.images) {
    issues.push('No images object defined');
    stats.productsWithoutImages++;
    return issues;
  }
  
  const images = product.images;
  let hasAnyImage = false;
  
  // Check main image
  if (images.main) {
    const result = validateImagePath(images.main, PRODUCTS_DIR);
    if (result.exists) {
      stats.validImages++;
      stats.totalSize += result.size;
      hasAnyImage = true;
    } else {
      stats.brokenImages++;
      issues.push(`Main image missing: ${images.main} (${result.reason})`);
    }
  }
  
  // Check thumbnail
  if (images.thumbnail) {
    const result = validateImagePath(images.thumbnail, PRODUCTS_DIR);
    if (result.exists) {
      stats.validImages++;
      hasAnyImage = true;
    } else {
      stats.brokenImages++;
      issues.push(`Thumbnail missing: ${images.thumbnail}`);
    }
  }
  
  // Check gallery images
  if (images.gallery && Array.isArray(images.gallery)) {
    images.gallery.forEach((imgPath, idx) => {
      const result = validateImagePath(imgPath, PRODUCTS_DIR);
      if (result.exists) {
        stats.validImages++;
        stats.totalSize += result.size;
        hasAnyImage = true;
      } else {
        stats.brokenImages++;
        issues.push(`Gallery[${idx}] missing: ${imgPath}`);
      }
    });
  }
  
  // Check lifestyle images
  if (images.lifestyle && Array.isArray(images.lifestyle)) {
    images.lifestyle.forEach((imgPath, idx) => {
      const result = validateImagePath(imgPath, PRODUCTS_DIR);
      if (result.exists) {
        stats.validImages++;
        stats.totalSize += result.size;
        hasAnyImage = true;
      } else {
        stats.brokenImages++;
        issues.push(`Lifestyle[${idx}] missing: ${imgPath}`);
      }
    });
  }
  
  // Check spec images
  if (images.specs && Array.isArray(images.specs)) {
    images.specs.forEach((imgPath, idx) => {
      const result = validateImagePath(imgPath, PRODUCTS_DIR);
      if (result.exists) {
        stats.validImages++;
        stats.totalSize += result.size;
        hasAnyImage = true;
      } else {
        stats.brokenImages++;
        issues.push(`Specs[${idx}] missing: ${imgPath}`);
      }
    });
  }
  
  if (!hasAnyImage) {
    stats.productsWithoutImages++;
  }
  
  return issues;
}

// Main validation function
function validateImages() {
  console.log('🔍 Image Validation Script\n');
  
  // Check if catalog exists
  if (!fs.existsSync(CATALOG_FILE)) {
    console.error(`❌ Error: Catalog not found: ${CATALOG_FILE}`);
    process.exit(1);
  }
  
  // Load catalog
  const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  console.log(`📁 Loaded catalog with ${catalog.categories.length} categories\n`);
  
  const stats = {
    totalProducts: 0,
    productsWithImages: 0,
    productsWithoutImages: 0,
    validImages: 0,
    brokenImages: 0,
    totalSize: 0
  };
  
  const allIssues = [];
  
  // Validate each category
  for (const category of catalog.categories) {
    if (!category.products || !Array.isArray(category.products)) {
      continue;
    }
    
    for (const product of category.products) {
      stats.totalProducts++;
      
      const issues = validateProduct(product, stats);
      
      if (issues.length === 0 && product.images) {
        stats.productsWithImages++;
      }
      
      if (issues.length > 0) {
        allIssues.push({
          sku: product.sku,
          name: product.name,
          category: category.name,
          issues
        });
      }
    }
  }
  
  // Check for orphaned image folders (folders without catalog entries)
  console.log('🔍 Checking for orphaned image folders...\n');
  const orphanedFolders = [];
  
  if (fs.existsSync(PRODUCTS_DIR)) {
    const folders = fs.readdirSync(PRODUCTS_DIR, { withFileTypes: true })
      .filter(item => item.isDirectory());
    
    const catalogSkus = new Set();
    for (const category of catalog.categories) {
      if (category.products) {
        category.products.forEach(p => {
          if (p.sku) catalogSkus.add(p.sku.toUpperCase());
        });
      }
    }
    
    for (const folder of folders) {
      if (!catalogSkus.has(folder.name.toUpperCase())) {
        orphanedFolders.push(folder.name);
      }
    }
  }
  
  // Print summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 Validation Summary:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total Products:             ${stats.totalProducts}`);
  console.log(`Products with Images:       ${stats.productsWithImages} (${((stats.productsWithImages/stats.totalProducts)*100).toFixed(1)}%)`);
  console.log(`Products without Images:    ${stats.productsWithoutImages} (${((stats.productsWithoutImages/stats.totalProducts)*100).toFixed(1)}%)`);
  console.log(`Valid Image References:     ${stats.validImages}`);
  console.log(`Broken Image References:    ${stats.brokenImages}`);
  
  if (stats.totalSize > 0) {
    const sizeMB = (stats.totalSize / 1024 / 1024).toFixed(2);
    console.log(`Total Images Size:          ${sizeMB} MB`);
  }
  
  if (orphanedFolders.length > 0) {
    console.log(`Orphaned Image Folders:     ${orphanedFolders.length}`);
  }
  
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Show issues
  if (allIssues.length > 0) {
    console.log(`⚠️  Found ${allIssues.length} products with issues:\n`);
    
    allIssues.slice(0, 20).forEach(item => {
      console.log(`${item.sku} - ${item.name}`);
      console.log(`  Category: ${item.category}`);
      item.issues.forEach(issue => {
        console.log(`  • ${issue}`);
      });
      console.log('');
    });
    
    if (allIssues.length > 20) {
      console.log(`... and ${allIssues.length - 20} more products with issues\n`);
    }
  }
  
  // Show orphaned folders
  if (orphanedFolders.length > 0) {
    console.log(`🗑️  Orphaned image folders (not in catalog):\n`);
    orphanedFolders.forEach(folder => {
      console.log(`  • ${folder}`);
    });
    console.log('\nThese folders can be safely deleted or their products need to be added to catalog.\n');
  }
  
  // Overall result
  if (stats.brokenImages === 0 && allIssues.length === 0) {
    console.log('✅ All validations passed!\n');
  } else if (stats.brokenImages > 0) {
    console.log('❌ Validation failed - broken image references found\n');
    process.exit(1);
  } else {
    console.log('⚠️  Validation complete with warnings\n');
  }
  
  console.log('Next steps:');
  console.log('  1. Test images in browser: npm run dev');
  console.log('  2. Fix any broken image references');
  console.log('  3. Add images for products without them');
  console.log('  4. Update .gitignore to exclude vendor data\n');
}

// Run validation
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    validateImages();
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

export { validateImages };
