# Salary Calculator for Albert Heijn

A comprehensive salary calculator for Albert Heijn employees, built with React and TypeScript.

## Features

- **Shift-based registration**: Register individual shifts with start/end times
- **Automatic break calculation**: Break time is automatically calculated based on shift duration and employee age
- **Age-based break profiles**: Different break rules for employees under 18 vs 18 and older
- **Automatic allowance detection**: Night shifts, Sunday work, and holiday work are automatically detected
- **Sunday and Holiday allowances**: Manual checkboxes for Sunday and holiday shifts with 100% allowance
- **Real-time calculations**: Instant salary calculations as you input data
- **Responsive design**: Works on desktop and mobile devices
- **Local storage**: All data is saved locally in your browser

## Age-Based Break Profiles

The application implements different break profiles based on Dutch labor law (CAO):

### Employees under 18 years old:

- 0-4 hours: 15 minutes break
- 4-5.5 hours: 30 minutes break
- 5.5+ hours: 45 minutes break

### Employees 18 years and older:

- 0-4.5 hours: 15 minutes break
- 4.5-6 hours: 30 minutes break
- 6+ hours: 45 minutes break

The break profile is automatically selected based on the age group configured in the settings.

## Allowances

- **Night shift allowance (50%)**: Automatically applied for shifts between 22:00-06:00
- **Sunday allowance (100%)**: Applied when Sunday checkbox is selected
- **Holiday allowance (100%)**: Applied when Holiday checkbox is selected

Note: Sunday and Holiday allowances take precedence over night shift allowance.

## 🚀 Functionaliteiten

### 🆕 Nieuw: Shiftregistratie (CAO 2025)

De app ondersteunt nu **twee invoermethoden**:

1. **🆕 Shiftregistratie** (aanbevolen): Voer je shiften in met starttijd en eindtijd
2. **Urenregistratie** (legacy): Handmatige invoer van uren per categorie

#### Shiftregistratie Voordelen:

- ✅ **Automatische toeslagberekening** volgens CAO 2025
- ✅ **Nachtwerk herkenning** (50% toeslag, 22:00-06:00)
- ✅ **Automatische pauzeberekening** volgens CAO regels
- ✅ **Intuïtieve interface** met alleen tijd selectie
- ✅ **Geen handmatige invoer** van pauzes of toeslagen nodig
- ✅ **Ultra-eenvoudig**: Alleen starttijd en eindtijd invoeren

### Automatische Deployment

De app wordt automatisch gedeployed naar GitHub Pages bij elke push naar de master branch!

### 1. Configuratie Sectie

#### Uurloon Berekening

- **Functie-gebaseerd Uurloon**: Automatische berekening op basis van leeftijd, functie en dienstjaren
  - **Leeftijdsgroepen**: 13-15, 16, 17, 18, 19, 20, 21+ jaar
  - **Functies**: Vakkenvuller, Shiftleader
  - **Dienstjaren**: 0, 1, 2, 3, 4, 5+ jaar
  - **Standaard**: 15-jarige vakkenvuller (€6.15/uur)
- **Handmatig Uurloon**: Voer je eigen all-in uurloon in euro's in

#### Algemene Instellingen

- **Aantal weken**: Aantal weken in de salarisperiode (standaard: 4)
- **Pensioen premie percentage**: Percentage voor pensioenpremie (standaard: 1.69%)
- **SPAWW.nl percentage**: Percentage voor SPAWW (standaard: 0.5%)
- **Premie WGA werknemer percentage**: Percentage voor WGA premie (standaard: 0.5%)
- **Loonheffing percentage**: Optioneel percentage voor loonheffing (standaard: 0%)

### 2. Registratie Sectie

#### 🆕 Shiftregistratie (Aanbevolen)

Voer je shiften in per week:

- **Starttijd**: Begin van je shift (HH:MM)
- **Eindtijd**: Einde van je shift (HH:MM)

**Automatische Berekeningen:**

**Pauze (volgens CAO regels):**

- 0-4.5 uur: 15 minuten pauze
- 4.5-6 uur: 30 minuten pauze
- 6+ uur: 45 minuten pauze

**Automatische Toeslagberekening:**

- 🌙 **Nachtwerk** (22:00-06:00): 50% toeslag

#### Urenregistratie (Legacy)

- Dynamische invoervelden op basis van het aantal weken
- Voor elke week:
  - **Reguliere Uren**: Voer uren in HH:MM formaat (bijv. 36:00)
  - **Betaalde Pauzes**: Voer betaalde pauze uren in HH:MM formaat
  - **Toeslagen**: Voeg toeslaguren toe met verschillende percentages:
    - **25% Toeslag**: 25% extra bovenop uurloon
    - **50% Toeslag**: 50% extra bovenop uurloon
    - **100% Toeslag**: 100% extra bovenop uurloon

### 3. Resultaten Sectie

- **Geschat Netto Salaris**: Uiteindelijk geschat netto salaris (enige zichtbare resultaat)
- **Disclaimer**: Belangrijke opmerking over geschatte berekeningen

## 🧮 Berekeningslogica (2025)

### Shiftregistratie Berekening

1. **Automatische Pauze**: Berekend op basis van shiftduur volgens CAO regels
2. **Shift Duur**: `Eindtijd - Starttijd - Automatische Pauze`
3. **Toeslag Berekening**:
   - **Nachtwerk**: 50% toeslag op nachturen (22:00-06:00)
4. **Uurloon Berekening**:
   - Reguliere uren: `All-in Uurloon`
   - 50% Toeslag: `All-in Uurloon × 1.50`

### Urenregistratie Berekening

1. **Uurloon Berekening**:
   - Reguliere uren: `All-in Uurloon`
   - Betaalde pauzes: `All-in Uurloon`
   - 25% Toeslag: `All-in Uurloon × 1.25`
   - 50% Toeslag: `All-in Uurloon × 1.50`
   - 100% Toeslag: `All-in Uurloon × 2.00`

### Algemene Aftrekposten

2. **Bruto Salaris**: Som van alle inkomsten per categorie

3. **Aftrekposten**:
   - **Pensioen premie**: `Bruto Salaris × Percentage Pensioen premie`
   - **SPAWW.nl**: `Bruto Salaris × Percentage SPAWW`
   - **Loon voor Loonheffing**: `Bruto Salaris - Pensioen premie - SPAWW`
   - **Premie WGA werknemer**: `Loon voor Loonheffing × Percentage WGA`
   - **Loonheffing** (optioneel): `Loon voor Loonheffing × Percentage Loonheffing`

4. **Netto Salaris**: `Bruto Salaris - Alle aftrekposten`

## 🛠️ Installatie

1. **Clone of download** dit project naar je lokale machine

2. **Installeer dependencies**:

   ```bash
   npm install
   ```

3. **Start de ontwikkelingsserver**:

   ```bash
   npm start
   ```

4. **Open je browser** en ga naar `http://localhost:3000`

## 📱 Responsiviteit

De applicatie is volledig responsief en werkt optimaal op:

- Desktop computers
- Tablets
- Mobiele telefoons

## 🎨 Design

- **Framework**: Tailwind CSS
- **Font**: Inter font family
- **Kleurenschema**: Modern en professioneel blauw thema
- **UI**: Schone, intuïtieve interface met afgeronde hoeken
- **PWA**: Progressive Web App met offline functionaliteit

## 💡 Gebruik

### 🆕 Shiftregistratie (Aanbevolen)

1. **Configureer je instellingen** in de Configuratie sectie
2. **Schakel naar Shiftregistratie** via de toggle bovenaan
3. **Voer je shiften in** per week:
   - Klik "Shift Toevoegen" voor elke week
   - Vul alleen starttijd en eindtijd in
   - Pauzes en toeslagen worden automatisch berekend
4. **Bekijk het resultaat** in de Resultaten sectie

### Urenregistratie (Legacy)

1. **Configureer je instellingen** in de Configuratie sectie
2. **Schakel naar Urenregistratie** via de toggle bovenaan
3. **Voer je uren in** per week in de Urenregistratie sectie
   - Voeg reguliere uren en betaalde pauzes toe
   - Voeg toeslaguren toe met verschillende percentages
4. **Bekijk het resultaat** in de Resultaten sectie

**Alle berekeningen worden automatisch bijgewerkt** wanneer je wijzigingen maakt

## ⚠️ Belangrijke Opmerkingen

- Alle berekeningen zijn **geschat** en kunnen afwijken van je daadwerkelijke salarisstrook
- **Shiftregistratie** is gebaseerd op de CAO Supermarkten VGL 2024-2026
- **Nachtwerk** wordt automatisch gedetecteerd tussen 22:00 en 06:00
- **Pauzes** worden automatisch berekend volgens CAO regels (geen handmatige invoer nodig)
- **Ultra-eenvoudig**: Alleen starttijd en eindtijd invoeren, de rest wordt automatisch berekend
- De applicatie valideert automatisch de tijdinvoer
- Loonheffing is optioneel en standaard uitgeschakeld
- De app is specifiek ontwikkeld voor Albert Heijn medewerkers

## 🔒 Privacy & Data Storage

De app werkt volledig lokaal zonder externe database:

- **💾 Local Storage**: Alle data (instellingen, shiften, uren, feedback) wordt opgeslagen in je browser
- **🔒 Privacy**: Geen data wordt naar externe servers verzonden
- **📱 Offline**: De app werkt volledig offline
- **🧹 Clean**: Geen database setup of configuratie nodig

**Voordelen:**

- ✅ **Privacy**: Alle data blijft op je apparaat
- ✅ **Offline**: Werkt zonder internetverbinding
- ✅ **Simpel**: Geen database setup nodig
- ✅ **Snel**: Geen netwerk calls voor data opslag

## 🚀 Deployment & GitHub Pages

### Automatische Deployment

De app wordt automatisch gedeployed naar GitHub Pages via GitHub Actions:

1. **GitHub Secrets configureren**:
   - Ga naar repository Settings → Secrets and variables → Actions
   - Voeg `REACT_APP_SUPABASE_URL` en `REACT_APP_SUPABASE_ANON_KEY` toe

2. **GitHub Pages instellingen**:
   - Ga naar repository Settings → Pages
   - Source: "GitHub Actions"
   - De workflow gebruikt officiële GitHub Pages deployment

3. **Automatische deployment**:
   - Elke push naar `master` branch triggert automatische deployment
   - GitHub Actions buildt de app met environment variables
   - Gebruikt officiële GitHub Pages deployment service

4. **Live URL**: https://voxxai.github.io/salaryCalculator/

**⚠️ Belangrijk**: De standaard GitHub Pages workflow is uitgeschakeld in favor van onze custom workflow voor betere controle.

### Lokale Development

```bash
# Start development server (gebruikt .env bestand)
npm start

# Build voor lokale testing
npm run build
```

**Zie de officiële React deployment documentatie voor instructies.**

## 🔧 Technische Details

- **React**: Functionele componenten met hooks
- **State Management**: React useState en useEffect
- **Styling**: Tailwind CSS
- **Responsiviteit**: CSS Grid en Flexbox
- **Validatie**: Regex voor tijdinvoer
- **PWA**: Service Worker voor offline functionaliteit
- **TypeScript**: Volledig getypeerde code
- **Local Storage**: Automatische opslag van instellingen
- **Local Storage**: Browser-based data storage
- **Error Handling**: Error boundaries en fallback systemen

## 📄 Licentie

Dit project is open source en vrij te gebruiken voor persoonlijke en commerciële doeleinden.
