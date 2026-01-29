#!/usr/bin/env node

/**
 * Content Quality Analysis Script
 * 
 * This script analyzes the product catalog to identify:
 * 1. Formatting issues (random characters, improper capitalization)
 * 2. Content repetition across pillars, automations, and connected scenes
 * 3. Generic/mumbo jumbo content that doesn't add value
 * 4. Missing or malformed data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_PATH = path.join(__dirname, '../data/product_catalog.json');
const REPORT_PATH = path.join(__dirname, 'CONTENT_QUALITY_REPORT.md');

// Load catalog
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));

// Extract all products from all categories
const products = [];
if (catalog.categories && Array.isArray(catalog.categories)) {
  catalog.categories.forEach(category => {
    if (category.products && Array.isArray(category.products)) {
      products.push(...category.products);
    }
  });
}

console.log(`📊 Analyzing ${products.length} products...\n`);

const issues = {
  formatting: [],
  repetition: [],
  generic: [],
  missing: []
};

// Common generic phrases that indicate low-quality content
const GENERIC_PHRASES = [
  /optimizes operational efficiency/i,
  /simplifies daily interactions/i,
  /continuous monitoring and protection/i,
  /automated tv control with motion detection/i,
  /controls .* via smart home hub/i,
  /syncs with smart bulbs/i,
  /integrates with smart speaker/i
];

// Formatting issue patterns
const FORMATTING_ISSUES = [
  { pattern: /^[,;.]/, name: 'Starts with punctuation' },
  { pattern: /\s{2,}/, name: 'Multiple spaces' },
  { pattern: /[a-z]\)[,.]/, name: 'Malformed list item' },
  { pattern: /\d+°[CF]\s*or\s*\d+%?\)/, name: 'Orphaned condition fragment' },
  { pattern: /^\s*[a-z]/, name: 'Starts with lowercase (should be capitalized)' },
  { pattern: /\*\*/, name: 'Markdown formatting left in' }
];

/**
 * Check for formatting issues in text
 */
function checkFormatting(text, productSku, fieldName) {
  if (!text || typeof text !== 'string') return;
  
  FORMATTING_ISSUES.forEach(({ pattern, name }) => {
    if (pattern.test(text)) {
      issues.formatting.push({
        sku: productSku,
        field: fieldName,
        issue: name,
        text: text.substring(0, 100)
      });
    }
  });
}

/**
 * Calculate similarity between two strings (simple Levenshtein-based)
 */
function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

/**
 * Check for repetitive content across product sections
 */
function checkRepetition(product) {
  const allContent = [];
  
  // Collect all automation texts
  if (product.automations && Array.isArray(product.automations)) {
    product.automations.forEach(auto => {
      allContent.push({ type: 'automation', text: auto });
    });
  }
  
  // Collect all connected scene texts
  if (product.connected_scenes && Array.isArray(product.connected_scenes)) {
    product.connected_scenes.forEach(scene => {
      allContent.push({ type: 'connected_scene', text: scene });
    });
  }
  
  // Check for high similarity (>80%) between different items
  for (let i = 0; i < allContent.length; i++) {
    for (let j = i + 1; j < allContent.length; j++) {
      const sim = similarity(allContent[i].text, allContent[j].text);
      if (sim > 0.8) {
        issues.repetition.push({
          sku: product.sku,
          similarity: (sim * 100).toFixed(1) + '%',
          item1: { type: allContent[i].type, text: allContent[i].text.substring(0, 80) },
          item2: { type: allContent[j].type, text: allContent[j].text.substring(0, 80) }
        });
      }
    }
  }
}

/**
 * Check for generic/low-value content
 */
function checkGeneric(product) {
  const checkText = (text, fieldName) => {
    if (!text || typeof text !== 'string') return;
    
    GENERIC_PHRASES.forEach(pattern => {
      if (pattern.test(text)) {
        issues.generic.push({
          sku: product.sku,
          field: fieldName,
          match: text.match(pattern)[0],
          text: text.substring(0, 100)
        });
      }
    });
  };
  
  // Check automations
  if (product.automations && Array.isArray(product.automations)) {
    product.automations.forEach((auto, i) => {
      checkText(auto, `automations[${i}]`);
    });
  }
  
  // Check connected scenes
  if (product.connected_scenes && Array.isArray(product.connected_scenes)) {
    product.connected_scenes.forEach((scene, i) => {
      checkText(scene, `connected_scenes[${i}]`);
    });
  }
}

/**
 * Check for missing or incomplete data
 */
function checkMissing(product) {
  // Check if automations are missing or empty
  if (!product.automations || product.automations.length === 0) {
    issues.missing.push({
      sku: product.sku,
      field: 'automations',
      issue: 'Missing or empty'
    });
  }
  
  // Check if connected_scenes are missing or empty
  if (!product.connected_scenes || product.connected_scenes.length === 0) {
    issues.missing.push({
      sku: product.sku,
      field: 'connected_scenes',
      issue: 'Missing or empty'
    });
  }
  
  // Check for very short content (likely incomplete)
  if (product.automations && Array.isArray(product.automations)) {
    product.automations.forEach((auto, i) => {
      if (auto && auto.length < 20) {
        issues.missing.push({
          sku: product.sku,
          field: `automations[${i}]`,
          issue: 'Too short (< 20 chars)',
          text: auto
        });
      }
    });
  }
}

// Run analysis on all products
products.forEach(product => {
  // Check formatting in automations and connected scenes
  if (product.automations && Array.isArray(product.automations)) {
    product.automations.forEach((auto, i) => {
      checkFormatting(auto, product.sku, `automations[${i}]`);
    });
  }
  
  if (product.connected_scenes && Array.isArray(product.connected_scenes)) {
    product.connected_scenes.forEach((scene, i) => {
      checkFormatting(scene, product.sku, `connected_scenes[${i}]`);
    });
  }
  
  // Check for repetition
  checkRepetition(product);
  
  // Check for generic content
  checkGeneric(product);
  
  // Check for missing data
  checkMissing(product);
});

// Generate report
let report = `# Product Catalog Content Quality Report

Generated: ${new Date().toISOString()}

Total Products Analyzed: ${products.length}

---

## Summary

| Issue Type | Count |
|------------|-------|
| Formatting Issues | ${issues.formatting.length} |
| Repetitive Content | ${issues.repetition.length} |
| Generic/Low-Value Content | ${issues.generic.length} |
| Missing/Incomplete Data | ${issues.missing.length} |

---

## 1. Formatting Issues (${issues.formatting.length})

These are text fragments with improper formatting, random characters, or capitalization issues.

`;

issues.formatting.forEach(issue => {
  report += `### ${issue.sku} - ${issue.field}
- **Issue**: ${issue.issue}
- **Text**: \`${issue.text}...\`

`;
});

report += `---

## 2. Repetitive Content (${issues.repetition.length})

Content that appears nearly identical across different sections of the same product.

`;

issues.repetition.forEach(issue => {
  report += `### ${issue.sku} (${issue.similarity} similar)
- **Type 1**: ${issue.item1.type}
  - Text: \`${issue.item1.text}...\`
- **Type 2**: ${issue.item2.type}
  - Text: \`${issue.item2.text}...\`

`;
});

report += `---

## 3. Generic/Low-Value Content (${issues.generic.length})

Content using generic phrases that don't provide specific product value.

`;

// Group by phrase pattern
const genericByPattern = {};
issues.generic.forEach(issue => {
  const key = issue.match;
  if (!genericByPattern[key]) {
    genericByPattern[key] = [];
  }
  genericByPattern[key].push(issue);
});

Object.keys(genericByPattern).forEach(pattern => {
  report += `### Pattern: "${pattern}"
Found in ${genericByPattern[pattern].length} products:
`;
  genericByPattern[pattern].forEach(issue => {
    report += `- ${issue.sku} (${issue.field})\n`;
  });
  report += '\n';
});

report += `---

## 4. Missing/Incomplete Data (${issues.missing.length})

Products with missing or incomplete automation/integration data.

`;

// Group by issue type
const missingByType = {};
issues.missing.forEach(issue => {
  const key = issue.field;
  if (!missingByType[key]) {
    missingByType[key] = [];
  }
  missingByType[key].push(issue);
});

Object.keys(missingByType).forEach(field => {
  report += `### ${field}
Found in ${missingByType[field].length} products:
`;
  missingByType[field].forEach(issue => {
    report += `- ${issue.sku}${issue.text ? `: "${issue.text}"` : ''}\n`;
  });
  report += '\n';
});

report += `---

## Recommendations

### 1. Fix Formatting Issues
- Remove leading punctuation and orphaned text fragments
- Ensure all sentences start with capital letters
- Remove markdown formatting artifacts
- Clean up whitespace

### 2. Address Repetition
- Make each section distinct:
  - **Automations**: Specific trigger → action workflows
  - **Connected Scenes**: Partner ecosystem integrations
  - **Pillars**: High-level benefits (handled by constants.tsx)
- Avoid copy-pasting similar content

### 3. Replace Generic Content
- Use product-specific capabilities from specs
- Reference actual features (e.g., "2K video", "fingerprint unlock")
- Focus on unique value propositions
- Follow .agent.md guidelines for benefit-focused copy

### 4. Fill Missing Data
- Add automation examples for products missing them
- Define connected scene integrations
- Ensure minimum content quality standards

---

## Next Steps

1. Review this report to prioritize fixes
2. Run \`06-fix-content-quality.js\` to automatically fix formatting issues
3. Manually review and rewrite generic content
4. Add missing automation/integration data
5. Re-run this analysis to verify improvements

`;

// Write report
fs.writeFileSync(REPORT_PATH, report, 'utf-8');

console.log(`✅ Analysis complete!`);
console.log(`\n📋 Report Summary:`);
console.log(`   - ${issues.formatting.length} formatting issues`);
console.log(`   - ${issues.repetition.length} repetitive content instances`);
console.log(`   - ${issues.generic.length} generic content instances`);
console.log(`   - ${issues.missing.length} missing/incomplete data items`);
console.log(`\n📄 Full report saved to: ${REPORT_PATH}`);
console.log(`\n💡 Next: Review the report and run '06-fix-content-quality.js' to auto-fix formatting issues.\n`);
