# 🚀 Deployment Guide - GitHub Pages met Database

Deze guide helpt je om je app te deployen naar GitHub Pages met Supabase database integratie via GitHub Actions.

## 📋 **Voorbereiding**

### 1. Database Setup

Zorg ervoor dat je Supabase database is opgezet:

- ✅ Tabel `feedback` aangemaakt
- ✅ API credentials beschikbaar

### 2. GitHub Secrets Configureren

1. Ga naar je repository: https://github.com/voxxai/salaryCalculator
2. Ga naar **Settings** → **Secrets and variables** → **Actions**
3. Klik op **"New repository secret"**
4. Voeg deze secrets toe:

```
Name: REACT_APP_SUPABASE_URL
Value: https://rocptcvhjrbpfuifltxa.supabase.co
```

```
Name: REACT_APP_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvY3B0Y3ZoanJicGZ1aWZsdHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjgyMTYsImV4cCI6MjA2ODUwNDIxNn0.Ej7kK2DQdpepTAAHqnHlrwZ4d9WCLYQJqXOKO5ruqes
```

## 🚀 **Automatische Deployment**

### Stap 1: Commit en Push

```bash
git add .
git commit -m "Add GitHub Actions deployment with database integration"
git push origin master
```

### Stap 2: GitHub Actions Workflow

De GitHub Actions workflow zal automatisch:

1. **Code checkouten** van de master branch
2. **Dependencies installeren** (npm ci)
3. **App builden** met environment variables uit GitHub Secrets
4. **Deployen** naar de `gh-pages` branch
5. **GitHub Pages** wordt automatisch bijgewerkt

### Stap 3: Verificatie

- **GitHub Actions**: Check de Actions tab in je repository
- **Live App**: https://voxxai.github.io/salaryCalculator/
- **Database**: Check Supabase dashboard voor nieuwe feedback

## 🔍 **Hoe het werkt**

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with environment variables
        env:
          REACT_APP_SUPABASE_URL: ${{ secrets.REACT_APP_SUPABASE_URL }}
          REACT_APP_SUPABASE_ANON_KEY: ${{ secrets.REACT_APP_SUPABASE_ANON_KEY }}
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          publish_branch: gh-pages
```

### Environment Variables

- **REACT_APP_SUPABASE_URL**: Je Supabase project URL
- **REACT_APP_SUPABASE_ANON_KEY**: Je Supabase anon key
- Deze worden veilig opgeslagen in GitHub Secrets
- Alleen beschikbaar tijdens de build in GitHub Actions

## 🛠️ **Troubleshooting**

### "Database not configured" error

- ✅ Controleer of GitHub Secrets correct zijn ingesteld
- ✅ Controleer of de database tabel bestaat
- ✅ Controleer of de API credentials correct zijn

### Build fails in GitHub Actions

- ✅ Controleer GitHub Actions logs
- ✅ Controleer of alle dependencies correct zijn
- ✅ Controleer of TypeScript errors zijn opgelost

### Feedback wordt niet opgeslagen

- ✅ Controleer Supabase tabel structuur
- ✅ Controleer API credentials in GitHub Secrets
- ✅ Check browser console voor errors

## 📱 **Cross-Device Testing**

1. **Test op verschillende apparaten**:
   - Desktop browser
   - Mobiele browser
   - Tablet

2. **Verstuur feedback** van elk apparaat

3. **Check Supabase dashboard** - alle feedback zou zichtbaar moeten zijn

## 🔒 **Security Best Practices**

- ✅ **Nooit** API keys in code committen
- ✅ GitHub Secrets voor veilige opslag van credentials
- ✅ .env bestand staat in .gitignore (voor lokale development)
- ✅ Database heeft Row Level Security (optioneel)

## 🎉 **Success!**

Je app is nu live met:

- ✅ **Automatische deployment** via GitHub Actions
- ✅ **Cross-device feedback sync** via Supabase
- ✅ **Real-time database updates**
- ✅ **Secure API credentials** in GitHub Secrets
- ✅ **gh-pages branch** als deployment target

**Live URL**: https://voxxai.github.io/salaryCalculator/

## 📝 **Lokale Development**

Voor lokale development kun je nog steeds `npm start` gebruiken:

```bash
# Start development server (gebruikt .env bestand)
npm start

# Build voor lokale testing
npm run build
```

**De GitHub Actions workflow vervangt `npm run deploy` volledig!**
