# HeyZack Product Image Migration Plan
## Systematic Approach to Update Product Images Without Exposing Vendor Information

**Date Created:** January 28, 2026  
**Status:** Ready for Implementation

---

## Executive Summary

This plan provides a complete workflow to reorganize vendor-supplied product images into a vendor-neutral structure, matching products by HeyZack reference numbers (HZ-*) while completely obscuring supplier identities.

---

## Current Situation Analysis

### Source Structure
```
HD IMAGES 2/
├── [VENDOR_NAME]/          ← Must be hidden
│   └── HZ-XX-XXXXXX01/     ← HeyZack reference number (our key identifier)
│       └── [images]
```

### Identified Vendors (to be anonymized)
- Hikins
- HONGSHENGXU
- Keeper
- Larkey
- Miaventilation
- Omnia
- Tongou
- TuoAn
- Tuya
- Wenhui

### Product Reference Pattern
All products use HeyZack reference numbers in format: `HZ-[CATEGORY]-[PRODUCT_ID]`

Examples:
- `HZ-SS-VIDDOR04` (Smart Sensors - Video Doorbell 04)
- `HZ-C-2KCAM01` (Camera - 2K Camera 01)
- `HZ-SL-VIDDOR01` (Smart Lock - Video Door 01)

---

## Implementation Strategy

### Phase 1: Discovery & Mapping (Automated)

**Objective:** Create a complete mapping of HZ reference numbers to their current image locations

**Actions:**
1. Scan all vendor folders for HZ reference numbers
2. Extract HZ codes from folder names (handling variations with parentheses and Chinese characters)
3. Catalog all image files with their paths
4. Generate a JSON mapping file

**Deliverable:** `image-mapping.json`

```json
{
  "HZ-SS-VIDDOR04": {
    "images": [
      "path/to/image1.png",
      "path/to/image2.jpg"
    ],
    "imageCount": 2
  }
}
```

### Phase 2: Vendor-Neutral Reorganization

**Objective:** Create a clean, vendor-agnostic directory structure

**⚠️ Important: Why NOT the `data` folder?**
- The `data` folder is for JSON/config files, not static assets
- Images in `data` folder won't be served by Vite dev server or production build
- Static assets need to be in `public` folder for direct access
- Images outside `public` won't be accessible at runtime via URL paths

**Correct Structure:**
```
public/                          ← Served directly by Vite (no import needed)
└── images/
    └── products/
        ├── HZ-SS-VIDDOR04/
        │   ├── main.webp           ← Primary product image (optimized)
        │   ├── main.jpg            ← Fallback for older browsers
        │   ├── thumbnail.webp      ← Small preview (200x200)
        │   ├── detail-01.webp      ← Additional views
        │   ├── detail-02.webp
        │   ├── lifestyle-01.webp   ← Lifestyle/scene images
        │   ├── spec-01.webp        ← Specification diagrams
        │   └── package-01.webp     ← Packaging images
        ├── HZ-C-2KCAM01/
        │   ├── main.webp
        │   ├── main.jpg
        │   └── ...
        └── [other-products]/

data/                            ← Keep only JSON/config here
└── product_catalog.json         ← References images via /images/products/...
```

**Image Path in Code:**
```tsx
// Correct way to reference images from public folder
<img src="/images/products/HZ-SS-VIDDOR04/main.webp" />

// NOT this (data folder won't work)
<img src="/data/HD IMAGES 2/Vendor/..." /> ❌
```

**Naming Convention:**
- `main.webp` - Primary product image (optimized WebP)
- `main.jpg` - Fallback JPEG version
- `thumbnail.webp` - Small preview (200x200 or 300x300)
- `detail-01.webp`, `detail-02.webp`, etc. - Additional views
- `lifestyle-01.webp` - Lifestyle/scene images
- `spec-01.webp` - Specification diagrams
- `package-01.webp` - Packaging images
- `360-##.webp` - 360-degree view frames (if applicable)

### Phase 3: Automated Migration Script

**Script Functions:**

1. **Read mapping file** - Load discovered image paths

2. **Create product folders** - Generate `public/images/products/[HZ-SKU]/` structure

3. **Copy & Rename images** with standardized naming:
   - Extract images from vendor folders
   - Detect image type (main product, detail, lifestyle, spec)
   - Apply sequential naming: `detail-01.webp`, `detail-02.webp`, etc.
   - Remove vendor-specific names and Chinese characters
   - Sanitize filenames (remove special chars, spaces)

4. **Optimize images:**
   - Generate WebP versions (quality: 85)
   - Generate JPEG fallbacks (quality: 90)
   - Create thumbnails (300x300, crop: cover)
   - Resize large images (max: 2000x2000)
   - Strip EXIF metadata

5. **Generate manifest for each product:**
   ```json
   {
     "sku": "HZ-SS-VIDDOR04",
     "images": {
       "main": "main.webp",
       "mainFallback": "main.jpg",
       "thumbnail": "thumbnail.webp",
       "gallery": ["detail-01.webp", "detail-02.webp"],
       "lifestyle": ["lifestyle-01.webp"],
       "specs": ["spec-01.webp"]
     },
     "migrated": "2026-01-28T10:30:00Z"
   }
   ```

6. **Verify all products from catalog have images**

7. **Copy operation details:**
   ```
   SOURCE: /data/HD IMAGES 2/[VENDOR]/[HZ-SKU]/image.jpg
   ↓
   DESTINATION: /public/images/products/[HZ-SKU]/detail-01.webp
   ```

**Safety Features:**
- Dry-run mode (preview without changes)
- Backup original structure before migration
- Validation checks (file exists, readable, valid image)
- Progress logging with statistics
- Error handling (skip corrupted images, log issues)
- Duplicate detection (warn if same image copied twice)

### Phase 4: Update Product Catalog References

**Actions:**
1. Update `product_catalog.json` with new image paths (relative to `public/`)
2. Add image array to each product entry
3. Remove any vendor references
4. Use paths that work directly in browser (no bundler processing needed)

**Example Product Entry Update:**
```json
{
  "sku": "HZ-SS-VIDDOR04",
  "name": "Video Door Bell Battery powered",
  "images": {
    "main": "/images/products/HZ-SS-VIDDOR04/main.webp",
    "mainFallback": "/images/products/HZ-SS-VIDDOR04/main.jpg",
    "thumbnail": "/images/products/HZ-SS-VIDDOR04/thumbnail.webp",
    "gallery": [
      "/images/products/HZ-SS-VIDDOR04/detail-01.webp",
      "/images/products/HZ-SS-VIDDOR04/detail-02.webp",
      "/images/products/HZ-SS-VIDDOR04/detail-03.webp"
    ],
    "lifestyle": [
      "/images/products/HZ-SS-VIDDOR04/lifestyle-01.webp"
    ]
  }
}
```

**Path Reference Guide:**
```tsx
// In React components, reference directly:
const product = catalog.products.find(p => p.sku === 'HZ-SS-VIDDOR04');

// Simple image tag:
<img src={product.images.main} alt={product.name} />

// With WebP fallback:
<picture>
  <source srcSet={product.images.main} type="image/webp" />
  <img src={product.images.mainFallback} alt={product.name} />
</picture>

// Path resolves to: /images/products/HZ-SS-VIDDOR04/main.webp
// Served from: public/images/products/HZ-SS-VIDDOR04/main.webp
```

### Phase 5: Frontend Integration

**Component Updates:**
1. Update image loading components to use new paths
2. Implement lazy loading for performance
3. Add fallback images for missing products
4. Implement image optimization (WebP with JPEG fallback)

---

## Security & Privacy Measures

### Vendor Information Protection

✅ **DO:**
- Use only HZ reference numbers in all public-facing code
- Store images in HZ-named folders
- Reference products by SKU only
- Keep vendor mapping in private/secure files (gitignored)

❌ **DON'T:**
- Expose vendor folder names in URLs
- Include vendor names in image filenames
- Commit vendor mapping to public repositories
- Reference vendor names in frontend code

### Files to Gitignore
```
.gitignore additions:
# Source vendor images (keep private, do not commit)
/data/HD IMAGES 2/

# Vendor mapping files (sensitive information)
/scripts/vendor-mapping.json
/scripts/vendor-source-paths.json
/scripts/image-source-mapping.json

# Temporary migration files
/scripts/migration-backup/
/scripts/migration-logs/

# Keep committed:
# public/images/products/ - These ARE committed (vendor-neutral names)
# data/product_catalog.json - This IS committed (no vendor info)
```

**Important Note:**
- ✅ **DO commit** `public/images/products/` - these have vendor-neutral names
- ❌ **DON'T commit** `data/HD IMAGES 2/` - contains vendor folder structure
- ✅ **DO commit** updated `product_catalog.json` - uses clean paths only

---

## Automation Scripts

### Script 1: Image Discovery & Mapping
**File:** `scripts/01-discover-images.js`

**Purpose:** Scan HD IMAGES 2 folder and create mapping

**Output:** `scripts/image-mapping.json` (gitignored)

### Script 2: Image Migration
**File:** `scripts/02-migrate-images.js`

**Purpose:** Copy and rename images to new structure

**Features:**
- Dry-run mode: `--dry-run`
- Specific products: `--products HZ-SS-VIDDOR04,HZ-C-2KCAM01`
- Image optimization: `--optimize`

### Script 3: Catalog Updater
**File:** `scripts/03-update-catalog.js`

**Purpose:** Update product_catalog.json with new image paths

### Script 4: Validation
**File:** `scripts/04-validate-images.js`

**Purpose:** Verify all products have images and check for issues

---

## Execution Checklist

- [ ] **Step 1:** Run discovery script to map all HZ references to images
- [ ] **Step 2:** Review mapping file for any unmapped products
- [ ] **Step 3:** Create backup of current product_catalog.json
- [ ] **Step 4:** Run migration script in dry-run mode
- [ ] **Step 5:** Review dry-run output
- [ ] **Step 6:** Execute actual migration
- [ ] **Step 7:** Run validation script
- [ ] **Step 8:** Update product catalog with new paths
- [ ] **Step 9:** Update .gitignore to exclude vendor data
- [ ] **Step 10:** Test frontend with new image paths
- [ ] **Step 11:** Optimize images (WebP conversion)
- [ ] **Step 12:** Deploy to production

---

## Expected Outcomes

1. ✅ All product images **copied and renamed** from vendor folders to `public/images/products/`
2. ✅ Images organized by HZ reference number only (no vendor names)
3. ✅ Zero vendor information exposed in public code or URLs
4. ✅ Standardized image naming convention across all products
5. ✅ Optimized images (WebP + JPEG fallback) for web performance
6. ✅ Images properly served by Vite dev server and production build
7. ✅ Product catalog references clean, public paths
8. ✅ Complete traceability via private mapping file
9. ✅ Original vendor images remain untouched in `data/` (gitignored)
10. ✅ Easy to add new products following same pattern

---

## Maintenance Guidelines

### Adding New Products
1. Receive images from vendor
2. Place in temporary staging folder: `data/HD IMAGES 2/[VENDOR]/[HZ-SKU]/`
3. Extract HZ reference number from folder name
4. Run migration script with specific product flag:
   ```bash
   node scripts/02-migrate-images.js --products HZ-XX-XXXXXX
   ```
5. Script will:
   - Copy images to `public/images/products/HZ-XX-XXXXXX/`
   - Rename with standard convention
   - Optimize and convert to WebP
   - Generate manifest
6. Update product catalog with new image paths
7. Test in browser: `http://localhost:5173/images/products/HZ-XX-XXXXXX/main.webp`
8. Commit only the `public/images/products/` folder
9. Keep `data/HD IMAGES 2/` folder local (gitignored)

### Updating Existing Images
1. Place new images in staging with HZ reference
2. Run migration script with `--overwrite` flag
3. Verify changes
4. Clear cache/CDN if applicable

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Lost vendor mapping | Keep encrypted backup separate from codebase |
| Missing images | Implement fallback image system |
| Large file sizes | Automate WebP conversion and compression |
| URL changes break site | Implement redirect mapping if needed |
| Future vendor changes | Process remains same, just update mapping |

---

## Technical Requirements

**Node.js Scripts:**
- fs-extra (file operations)
- glob (pattern matching)
- sharp (image optimization)
- chalk (terminal colors)

**Install:**
```bash
npm install fs-extra glob sharp chalk --save-dev
```

---

## Next Steps

**Immediate Actions:**
1. Review and approve this plan
2. Set up development environment for script execution
3. Create backup of current data
4. Begin Phase 1 (Discovery & Mapping)

**Timeline Estimate:**
- Phase 1: 1 hour (automated)
- Phase 2-3: 2-3 hours (migration execution)
- Phase 4-5: 2-3 hours (catalog and frontend updates)
- Testing: 1-2 hours

**Total:** ~6-9 hours for complete migration

---

## Questions & Decisions Needed

1. **Image Optimization:** Should we convert all images to WebP format?
2. **CDN:** Will images be served from a CDN? (affects path structure)
3. **Responsive Images:** Do we need multiple sizes (thumbnail, medium, large)?
4. **Lazy Loading:** Should we implement progressive image loading?
5. **Fallback Strategy:** What placeholder image for missing products?

---

## Appendix: Command Reference

```bash
# Discover and map images
node scripts/01-discover-images.js

# Dry run migration (preview only)
node scripts/02-migrate-images.js --dry-run

# Execute migration
node scripts/02-migrate-images.js

# Migrate specific products
node scripts/02-migrate-images.js --products HZ-SS-VIDDOR04,HZ-C-2KCAM01

# With optimization
node scripts/02-migrate-images.js --optimize

# Update catalog
node scripts/03-update-catalog.js

# Validate results
node scripts/04-validate-images.js
```

---

**Document Owner:** Development Team  
**Last Updated:** January 28, 2026  
**Status:** Ready for Implementation Review
