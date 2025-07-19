# 📱 App Deployment Guide

## 🚀 Free Hosting Options

### 1. **Netlify (Recommended)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### 2. **Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 3. **GitHub Pages**

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/salary-calculator"

# Deploy
npm run deploy
```

### 4. **Firebase Hosting**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize and deploy
firebase init hosting
firebase deploy
```

## 📱 PWA Installation Instructions

### Android (Chrome)

1. Open Chrome on your phone
2. Navigate to your app URL
3. Tap **"Install"** in the address bar
4. Or tap **⋮** → **"Add to Home screen"**

### iPhone (Safari)

1. Open Safari on your phone
2. Navigate to your app URL
3. Tap **Share** button (□ with ↑)
4. Tap **"Add to Home Screen"**

## 🔧 Local Testing

Test the PWA locally:

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build

# Open http://localhost:3000 on your phone
```

## 📋 PWA Features

✅ **Offline Support** - Works without internet
✅ **Home Screen Icon** - Looks like a native app
✅ **Full Screen Mode** - No browser UI
✅ **Fast Loading** - Cached for instant access
✅ **Push Notifications** - (Can be added later)

## 🌐 Production URL

After deployment, your app will be available at:

- **Netlify**: `https://your-app-name.netlify.app`
- **Vercel**: `https://your-app-name.vercel.app`
- **GitHub Pages**: `https://yourusername.github.io/salary-calculator`

## 📱 App Store Alternative

For a more native experience, consider:

- **Capacitor** - Convert to native iOS/Android app
- **React Native** - Build native mobile app
- **Expo** - Easy React Native development
