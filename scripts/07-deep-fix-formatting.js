#!/usr/bin/env node

/**
 * Deep Content Fix Script
 * 
 * Fixes specific formatting patterns in product catalog
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_PATH = path.join(__dirname, '../data/product_catalog.json');
const BACKUP_PATH = path.join(__dirname, '../data/product_catalog.backup-deep-fix.json');

console.log('🔧 Deep fixing content quality issues...\n');

// Load catalog
const catalogData = fs.readFileSync(CATALOG_PATH, 'utf-8');
const catalog = JSON.parse(catalogData);

// Create backup
fs.writeFileSync(BACKUP_PATH, catalogData, 'utf-8');
console.log(`✓ Backup created: ${BACKUP_PATH}\n`);

let fixCount = 0;

/**
 * Fix all text formatting issues
 */
function deepFixText(text) {
  if (!text || typeof text !== 'string') return text;
  
  let fixed = text;
  
  // Fix malformed Trigger:* → Trigger:
  fixed = fixed.replace(/Trigger[:*]*\*/g, 'Trigger:');
  
  // Fix malformed Action:* → Action:
  fixed = fixed.replace(/Action[:*]*\*/g, 'Action:');
  
  // Remove leading punctuation
  fixed = fixed.replace(/^[,;.]\s*/, '');
  
  // Capitalize first letter
  if (fixed.length > 0 && /^[a-z]/.test(fixed)) {
    fixed = fixed.charAt(0).toUpperCase() + fixed.slice(1);
  }
  
  // Remove multiple spaces
  fixed = fixed.replace(/\s{2,}/g, ' ');
  
  // Trim
  fixed = fixed.trim();
  
  if (fixed !== text) {
    fixCount++;
  }
  
  return fixed;
}

// Process all categories and products
if (catalog.categories && Array.isArray(catalog.categories)) {
  catalog.categories.forEach(category => {
    if (category.products && Array.isArray(category.products)) {
      category.products.forEach(product => {
        // Fix automations
        if (product.automations && Array.isArray(product.automations)) {
          product.automations = product.automations.map(deepFixText);
        }
        
        // Fix connected_scenes
        if (product.connected_scenes && Array.isArray(product.connected_scenes)) {
          product.connected_scenes = product.connected_scenes.map(deepFixText);
        }
      });
    }
  });
}

// Save fixed catalog
fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');

console.log(`✅ Fixed ${fixCount} text formatting issues`);
console.log(`\n💾 Updated catalog saved to: ${CATALOG_PATH}`);
console.log(`\n🔄 Run analysis again to verify:node scripts/05-analyze-content-quality.js\n`);
