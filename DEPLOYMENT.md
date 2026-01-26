# Deployment Configuration

## Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero configuration for Vite projects
- Automatic deployments from Git
- Free tier available
- Built-in CDN and edge functions
- Environment variable management

**Steps:**
1. Install Vercel CLI:
   ```bash
   bun install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:
   - `API_KEY` = Your Gemini API key

**Configuration:**
Create `vercel.json`:
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "API_KEY": "@api_key"
  }
}
```

---

### Option 2: Netlify

**Advantages:**
- Simple Git integration
- Free tier with generous limits
- Form handling & serverless functions
- Instant rollbacks

**Steps:**
1. Create `netlify.toml`:
   ```toml
   [build]
     command = "bun run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy via Netlify CLI or Git integration

3. Set environment variables:
   - `API_KEY` = Your Gemini API key

---

### Option 3: Cloudflare Pages

**Advantages:**
- Global CDN with edge computing
- Unlimited bandwidth
- Workers for serverless functions
- Free tier

**Steps:**
1. Connect Git repository to Cloudflare Pages

2. Build settings:
   - Build command: `bun run build`
   - Output directory: `dist`

3. Environment variables:
   - `API_KEY` = Your Gemini API key

---

### Option 4: Self-Hosted (Docker)

**Advantages:**
- Complete control
- Custom infrastructure
- Private deployment

**Dockerfile:**
```dockerfile
FROM oven/bun:1 AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Deploy:**
```bash
docker build -t heyzack-pitch .
docker run -p 80:80 -e API_KEY=your_gemini_key heyzack-pitch
```

---

### Option 5: Static Hosting (AWS S3 + CloudFront)

**Advantages:**
- Highly scalable
- Pay-as-you-go pricing
- Integration with AWS services

**Steps:**
1. Build project:
   ```bash
   bun run build
   ```

2. Upload `dist/` to S3 bucket

3. Configure S3 for static website hosting

4. Create CloudFront distribution pointing to S3

5. Handle API_KEY via AWS Lambda@Edge or environment-specific builds

---

## Environment Variables

All deployment options require setting:

- `API_KEY` - Gemini API key from [ai.google.dev](https://ai.google.dev/)

**Security Note:** Never commit `.env.local` with real API keys. Use platform-specific environment variable management.

---

## Build Optimization

### Code Splitting

Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ai-vendor': ['@google/genai'],
          'icons-vendor': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Environment-Specific Builds

**Production build with optimizations:**
```bash
bun run build
```

**Preview production build locally:**
```bash
bun run preview
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install dependencies
        run: bun install
      
      - name: Build
        run: bun run build
        env:
          API_KEY: ${{ secrets.API_KEY }}
      
      - name: Deploy to Vercel
        run: |
          bun install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Post-Deployment Checklist

- [ ] Verify all 15 product category sections load correctly
- [ ] Test language toggle (EN/FR) functionality
- [ ] Confirm Gemini AI assistant responds (API key configured)
- [ ] Check ROI calculator functionality
- [ ] Test responsive design on mobile/tablet
- [ ] Verify snap-scroll navigation works smoothly
- [ ] Check browser console for errors
- [ ] Test performance (Lighthouse score)
- [ ] Ensure all images load correctly
- [ ] Verify footer links and social icons

---

## Monitoring & Analytics

**Recommended Tools:**
- **Google Analytics 4** - User behavior tracking
- **Sentry** - Error monitoring
- **Vercel Analytics** - Performance metrics (if using Vercel)
- **LogRocket** - Session replay and debugging

Add tracking code to `index.html` or create analytics component.

---

## Troubleshooting

### "API_KEY not defined" Error
- Ensure environment variable is set in deployment platform
- Check variable name matches exactly (case-sensitive)
- Restart deployment after setting variables

### Build Fails
- Verify Bun version compatibility (1.3.6+)
- Check all dependencies are listed in `package.json`
- Clear `dist/` and rebuild: `rm -rf dist && bun run build`

### Large Bundle Size Warning
- Acceptable for demo/pitch deck (1.2MB is reasonable with Gemini AI SDK)
- Implement code splitting if performance issues arise
- Consider lazy loading heavy components (AI assistant, calculator)

---

## Custom Domain Setup

**Vercel:**
```bash
vercel domains add yourdomain.com
```

**Netlify:**
Add custom domain in Netlify dashboard > Domain settings

**Cloudflare Pages:**
Add domain in Pages dashboard > Custom domains

**Remember:** Update DNS records (A, CNAME) with your domain provider.
