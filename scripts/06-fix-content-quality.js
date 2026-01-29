#!/usr/bin/env node

/**
 * Content Quality Fix Script
 * 
 * Automatically fixes formatting issues and provides suggestions for content improvements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_PATH = path.join(__dirname, '../data/product_catalog.json');
const BACKUP_PATH = path.join(__dirname, '../data/product_catalog.backup-prefixes-fix.json');

// Load catalog
const catalogData = fs.readFileSync(CATALOG_PATH, 'utf-8');
const catalog = JSON.parse(catalogData);

// Extract all products from all categories
const products = [];
if (catalog.categories && Array.isArray(catalog.categories)) {
  catalog.categories.forEach(category => {
    if (category.products && Array.isArray(category.products)) {
      products.push(...category.products);
    }
  });
}

console.log(`🔧 Fixing content quality issues in ${products.length} products...\n`);

let fixCount = 0;

/**
 * Fix formatting issues in text
 */
function fixFormatting(text) {
  if (!text || typeof text !== 'string') return text;
  
  let fixed = text;
  let hadIssues = false;
  
  // Remove leading punctuation (comma, semicolon, period)
  if (/^[,;.]/.test(fixed)) {
    fixed = fixed.replace(/^[,;.]\s*/, '');
    hadIssues = true;
  }
  
  // Capitalize first letter if lowercase
  if (/^\s*[a-z]/.test(fixed)) {
    fixed = fixed.charAt(0).toUpperCase() + fixed.slice(1);
    hadIssues = true;
  }
  
  // Remove multiple spaces
  if (/\s{2,}/.test(fixed)) {
    fixed = fixed.replace(/\s{2,}/g, ' ');
    hadIssues = true;
  }
  
  // Remove markdown formatting artifacts
  if (/\*\*/.test(fixed)) {
    fixed = fixed.replace(/\*\*/g, '');
    hadIssues = true;
  }
  
  // Fix orphaned condition fragments like ", temperature above 30°C or humidity below 40%)"
  // These should be part of a complete sentence
  if (/^[,;]\s*temperature/.test(fixed)) {
    fixed = `When ${fixed.replace(/^[,;]\s*/, '')}`;
    hadIssues = true;
  }
  
  // Trim whitespace
  fixed = fixed.trim();
  
  if (hadIssues) {
    fixCount++;
  }
  
  return fixed;
}

/**
 * Remove duplicate or near-duplicate content
 */
function deduplicateArray(arr) {
  if (!arr || !Array.isArray(arr)) return arr;
  
  const seen = new Set();
  const result = [];
  
  arr.forEach(item => {
    if (!item) return;
    
    // Normalize for comparison
    const normalized = item.toLowerCase().trim();
    
    // Check if we've seen something very similar
    let isDuplicate = false;
    for (const seenItem of seen) {
      // Simple similarity check
      if (normalized === seenItem || normalized.includes(seenItem) || seenItem.includes(normalized)) {
        isDuplicate = true;
        break;
      }
    }
    
    if (!isDuplicate) {
      seen.add(normalized);
      result.push(fixFormatting(item));
    }
  });
  
  return result;
}

/**
 * Check if content is too generic and should be flagged
 */
function isGeneric(text) {
  const genericPatterns = [
    /optimizes operational efficiency to reduce waste/i,
    /simplifies daily interactions through intuitive/i,
    /continuous monitoring and protection for your property/i
  ];
  
  return genericPatterns.some(pattern => pattern.test(text));
}

// Backup original file
console.log('📦 Creating backup...');
fs.writeFileSync(BACKUP_PATH, catalogData, 'utf-8');
console.log(`   ✓ Backup saved to: ${BACKUP_PATH}\n`);

// Process each product
const genericProducts = [];

products.forEach(product => {
  // Fix automations
  if (product.automations && Array.isArray(product.automations)) {
    product.automations = deduplicateArray(product.automations);
    
    // Flag generic content
    product.automations.forEach(auto => {
      if (isGeneric(auto)) {
        genericProducts.push({
          sku: product.sku,
          field: 'automations',
          text: auto
        });
      }
    });
  }
  
  // Fix connected scenes
  if (product.connected_scenes && Array.isArray(product.connected_scenes)) {
    product.connected_scenes = deduplicateArray(product.connected_scenes);
    
    // Flag generic content
    product.connected_scenes.forEach(scene => {
      if (isGeneric(scene)) {
        genericProducts.push({
          sku: product.sku,
          field: 'connected_scenes',
          text: scene
        });
      }
    });
  }
  
  // Fix description if needed (first paragraph only, used as tagline)
  if (product.description && typeof product.description === 'string') {
    const parts = product.description.split('\n\n');
    if (parts[0]) {
      const fixedFirstParagraph = fixFormatting(parts[0]);
      product.description = [fixedFirstParagraph, ...parts.slice(1)].join('\n\n');
    }
  }
});

// Save fixed catalog
console.log('💾 Saving fixed catalog...');
fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
console.log(`   ✓ Fixed catalog saved\n`);

console.log(`✅ Formatting fixes applied: ${fixCount} instances`);

if (genericProducts.length > 0) {
  console.log(`\n⚠️  Warning: ${genericProducts.length} generic content items found`);
  console.log(`   These need manual review and rewriting:\n`);
  
  // Group by SKU
  const byProduct = {};
  genericProducts.forEach(item => {
    if (!byProduct[item.sku]) {
      byProduct[item.sku] = [];
    }
    byProduct[item.sku].push(item);
  });
  
  Object.keys(byProduct).slice(0, 10).forEach(sku => {
    console.log(`   ${sku}:`);
    byProduct[sku].forEach(item => {
      console.log(`     - ${item.field}: "${item.text.substring(0, 60)}..."`);
    });
  });
  
  if (Object.keys(byProduct).length > 10) {
    console.log(`   ... and ${Object.keys(byProduct).length - 10} more products`);
  }
}

console.log(`\n📊 Run '05-analyze-content-quality.js' to generate a full report.`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Review the report for generic content`);
console.log(`   2. Rewrite generic automations with product-specific benefits`);
console.log(`   3. Ensure automations describe trigger→action workflows`);
console.log(`   4. Ensure connected_scenes describe ecosystem integrations`);
console.log(`   5. Follow .agent.md guidelines for benefit-focused copy\n`);
