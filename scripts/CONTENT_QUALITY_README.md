# Content Quality Management Scripts

This directory contains scripts to analyze and fix content quality issues in the product catalog.

## Problem Statement

The product catalog had several content quality issues:
1. **Formatting issues**: Random characters, improper capitalization, malformed patterns like `Trigger:*` instead of `Trigger:`
2. **Content repetition**: Similar text across automations, connected scenes, and pillar descriptions
3. **Generic content**: "Mumbo jumbo" phrases that don't provide specific product value
4. **Missing data**: Products without automation or integration examples

## Available Scripts

### 1. `05-analyze-content-quality.js`
**Purpose**: Analyzes the entire product catalog and generates a detailed report.

**Usage**:
```bash
node scripts/05-analyze-content-quality.js
```

**What it checks**:
- Formatting issues (starts with punctuation, malformed patterns, lowercase starts)
- Content repetition (>80% similarity between different sections)
- Generic phrases that appear across multiple products
- Missing or incomplete automation/integration data

**Output**: Generates `CONTENT_QUALITY_REPORT.md` with detailed findings grouped by issue type.

---

### 2. `06-fix-content-quality.js`
**Purpose**: Automatically fixes basic formatting issues and identifies generic content.

**Usage**:
```bash
node scripts/06-fix-content-quality.js
```

**What it fixes**:
- Leading punctuation removal
- Capitalizes first letter
- Removes multiple spaces
- Removes markdown formatting artifacts
- Deduplicates similar content within same product

**Safety**: Creates backup file `product_catalog.backup-prefixes-fix.json` before making changes.

---

### 3. `07-deep-fix-formatting.js`
**Purpose**: Fixes specific malformed patterns in automation/integration text.

**Usage**:
```bash
node scripts/07-deep-fix-formatting.js
```

**What it fixes**:
- `Trigger:*` → `Trigger:`
- `Trigger*:` → `Trigger:`
- `Action:*` → `Action:`
- `Action*:` → `Action:`
- Leading/trailing punctuation
- Capitalization

**Safety**: Creates backup file `product_catalog.backup-deep-fix.json` before making changes.

---

## Recommended Workflow

### Step 1: Run Analysis
```bash
node scripts/05-analyze-content-quality.js
```

Review the generated `CONTENT_QUALITY_REPORT.md` to understand the scope of issues.

### Step 2: Auto-Fix Formatting
```bash
node scripts/07-deep-fix-formatting.js
```

This fixes most formatting patterns automatically.

### Step 3: Verify Fixes
```bash
node scripts/05-analyze-content-quality.js
```

Re-run analysis to see improvements and identify remaining issues.

### Step 4: Manual Review
Open `CONTENT_QUALITY_REPORT.md` and manually address:
- **Generic content**: Rewrite with product-specific benefits
- **Missing data**: Add automation examples and ecosystem integrations
- **Complex formatting issues**: Fix edge cases that scripts couldn't handle

### Step 5: Content Guidelines

When rewriting content, follow these principles from `.agent.md`:

#### Automations should describe **Trigger → Action** workflows:
✅ **Good**: "Trigger: Motion detected at night. Action: Turns on hallway lights at 30% brightness."
❌ **Bad**: "Automated TV Control with Motion Detection"

#### Connected Scenes should describe **Ecosystem Integrations**:
✅ **Good**: "Syncs with smart thermostat to adjust AC when window opens"
❌ **Bad**: "Controls TV or AC via smart home hub"

#### Avoid Generic Phrases:
- ❌ "Optimizes operational efficiency to reduce waste"
- ❌ "Simplifies daily interactions through intuitive automation"
- ✅ Use product-specific capabilities from specs field

#### Lead with Benefits:
- ❌ "2K resolution, PIR motion detection, night vision"
- ✅ "See every visitor in crisp detail, even in complete darkness"

---

## Report Structure

The analysis report contains four main sections:

### 1. Formatting Issues
Lists specific text fragments with problems like:
- Starts with punctuation (`, temperature above 30°C`)
- Malformed patterns (`Trigger:*`, `Action:*`)
- Lowercase starts
- Multiple spaces

### 2. Repetitive Content
Identifies text that appears >80% similar within the same product across:
- Automations
- Connected scenes
- Pillar descriptions

### 3. Generic Content
Flags phrases that appear across multiple products:
- "Automated TV Control with Motion Detection"
- "Controls TV or AC via smart home hub"
- "Optimizes operational efficiency"

### 4. Missing Data
Products without:
- Automation examples
- Connected scene integrations
- Or with very short (<20 char) content

---

## Statistics (Latest Run)

After running fixes:
- **Formatting Issues**: 23 remaining (down from 26)
- **Repetitive Content**: 0 instances
- **Generic Content**: 5 instances across 3 products
- **Missing Data**: 4 items

---

## Integration with CategoryDrawer

The CategoryDrawer component displays:
1. **Title + SKU** (from product name/sku)
2. **Image** (from imageUrl)
3. **Tagline** (extracted from first paragraph of description)
4. **Three Pillars** (Security/Savings/Comfort - inferred from automations)
5. **Smart Automations** (from `automations` array)
6. **Ecosystem Integration** (from `connected_scenes` array)

These scripts ensure all this content is:
- Properly formatted
- Non-repetitive
- Specific to each product
- Aligned with brand voice guidelines

---

## Maintenance

Run these scripts periodically when:
- Adding new products to catalog
- Updating product descriptions
- Migrating content from external sources
- Before major releases

The backup files allow you to revert changes if needed.

---

## Files Created

- `05-analyze-content-quality.js` - Analysis script
- `06-fix-content-quality.js` - Basic auto-fix script
- `07-deep-fix-formatting.js` - Pattern-specific fix script
- `CONTENT_QUALITY_REPORT.md` - Generated analysis report
- `product_catalog.backup-*.json` - Safety backups

---

## Next Steps

1. ✅ Formatting issues reduced from 26 → 23
2. ⚠️ Manually review 5 generic content instances
3. ⚠️ Rewrite generic automations with product-specific triggers/actions
4. ⚠️ Fill in 4 missing data items
5. 📝 Follow `.agent.md` guidelines for all rewrites

---

*These scripts are part of the HeyZack pitch deck content quality initiative to ensure all product information is clear, specific, and benefit-focused.*
