# 🚀 Deployment Guide for Arqam Landing Page

## Option 1: Vercel (Recommended) ⭐

### Why Vercel?
- **Perfect for Next.js** - Built by the Next.js team
- **Keeps API routes** - Your Supabase integration works perfectly
- **Custom domain support** - Easy arqam.ai setup
- **Automatic deployments** - Push to GitHub = auto deploy
- **Free tier** - Perfect for landing pages

### Setup Steps:

1. **Go to [vercel.com](https://vercel.com) and sign up with GitHub**

2. **Import your repository:**
   - Click "New Project"
   - Select `ventures-unit/Arqam-Landing`
   - Click "Import"

3. **Add environment variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ncrlekcxsepedqoucnsa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Deploy!** - Vercel will automatically build and deploy

5. **Add custom domain:**
   - Go to Project Settings → Domains
   - Add `arqam.ai`
   - Follow DNS instructions

### Benefits:
- ✅ API routes work perfectly
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy custom domain
- ✅ Zero configuration needed

---

## Option 2: GitHub Actions + Supabase

### Why GitHub Actions?
- **Stays on GitHub** - Everything in one place
- **Uses your Supabase** - No changes needed
- **Free** - GitHub Actions included

### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"

2. **The workflow is already created** (`.github/workflows/deploy.yml`)

3. **Push to trigger deployment:**
   ```bash
   git add .
   git commit -m "Enable GitHub Pages deployment"
   git push origin main
   ```

4. **Add custom domain:**
   - Go to repository Settings → Pages
   - Add `arqam.ai` in Custom domain
   - Update your DNS records

### Benefits:
- ✅ Everything stays on GitHub
- ✅ Uses existing Supabase setup
- ✅ Free hosting
- ✅ Custom domain support

---

## 🎯 **My Recommendation: Vercel**

For your use case, **Vercel is the better choice** because:

1. **API routes work out of the box** - No need to change your Supabase integration
2. **Better performance** - Optimized for Next.js
3. **Easier custom domain setup** - One-click SSL certificates
4. **Better developer experience** - Preview deployments, analytics, etc.

### Quick Vercel Setup:
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import `ventures-unit/Arqam-Landing`
4. Add environment variables
5. Deploy!

**Total setup time: 5 minutes** ⚡

---

## 🔧 **If you choose GitHub Actions:**

The workflow is already set up, but you'll need to modify the app for static export. Let me know if you want to go this route and I'll make the necessary changes.

---

## 📊 **Comparison:**

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| API Routes | ✅ Works | ❌ Static only |
| Custom Domain | ✅ Easy | ✅ Easy |
| Performance | ✅ Excellent | ✅ Good |
| Setup Time | ✅ 5 min | ⚠️ 15 min |
| Cost | ✅ Free tier | ✅ Free |
| Supabase Integration | ✅ No changes | ⚠️ Needs changes |

**Recommendation: Go with Vercel!** 🚀
