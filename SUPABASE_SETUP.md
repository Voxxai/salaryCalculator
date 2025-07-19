# 🗄️ Supabase Database Setup Guide

Deze guide helpt je om een gratis Supabase database op te zetten voor je feedback systeem.

## 🚀 Stap 1: Maak een Supabase Account

1. Ga naar [supabase.com](https://supabase.com)
2. Klik op "Start your project"
3. Log in met GitHub of maak een account
4. Klik op "New Project"

## 🏗️ Stap 2: Maak een Nieuw Project

1. **Project naam**: `salary-calculator-feedback`
2. **Database password**: Kies een sterk wachtwoord
3. **Region**: Kies een regio dicht bij je (bijv. West Europe)
4. Klik op "Create new project"

## 📊 Stap 3: Maak de Feedback Tabel

1. Ga naar **Table Editor** in je Supabase dashboard
2. Klik op **"New table"**
3. Vul de volgende gegevens in:

### Tabel Naam: `feedback`

### Kolommen:

```sql
id: bigint (Primary Key, Auto Increment)
type: text (NOT NULL)
title: text (NOT NULL)
description: text (NOT NULL)
priority: text (NOT NULL)
contact_email: text (NULL)
created_at: timestamp with time zone (Default: now())
device_info: text (NULL)
user_agent: text (NULL)
```

### SQL Script (optioneel):

```sql
CREATE TABLE feedback (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_info TEXT,
  user_agent TEXT
);
```

## 🔑 Stap 4: Haal je API Keys Op

1. Ga naar **Settings** → **API** in je Supabase dashboard
2. Kopieer de volgende waarden:
   - **Project URL** (bijv. `https://your-project.supabase.co`)
   - **anon public** key

## ⚙️ Stap 5: Configureer je App

1. Maak een `.env` bestand in je project root:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **BELANGRIJK**: Voeg `.env` toe aan je `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🚀 Stap 6: Test je Setup

1. Start je development server: `npm start`
2. Open de feedback formulier (💬 knop)
3. Verstuur test feedback
4. Check je Supabase dashboard → Table Editor → feedback tabel

## 🔒 Stap 7: Security (Optioneel)

Voor productie, kun je Row Level Security (RLS) inschakelen:

1. Ga naar **Authentication** → **Policies**
2. Schakel RLS in voor de feedback tabel
3. Maak policies voor read/write toegang

## 📱 Stap 8: Deploy naar GitHub Pages

1. Voeg je environment variables toe aan je GitHub repository:
   - Ga naar je repo → Settings → Secrets and variables → Actions
   - Voeg `REACT_APP_SUPABASE_URL` en `REACT_APP_SUPABASE_ANON_KEY` toe

2. Update je GitHub Actions workflow om de environment variables te gebruiken

## 🎯 Voordelen van deze Setup:

- ✅ **Gratis tier**: 500MB database, 50MB bestanden
- ✅ **Real-time updates**: Feedback verschijnt direct
- ✅ **Cross-device sync**: Feedback zichtbaar op alle apparaten
- ✅ **Backup systeem**: Fallback naar localStorage
- ✅ **Schalbaar**: Makkelijk uit te breiden
- ✅ **Secure**: HTTPS en API key authenticatie

## 🔧 Troubleshooting

### "Supabase failed, using localStorage"

- Check je API keys in `.env`
- Controleer of je tabel correct is aangemaakt
- Check de browser console voor errors

### "Network error"

- Controleer je internet verbinding
- Check of Supabase beschikbaar is
- Probeer het later opnieuw

## 📞 Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

**🎉 Gefeliciteerd! Je hebt nu een professionele database setup voor je feedback systeem!**
