# 💰 Loon Calculator

Een React web- en mobiele applicatie voor het berekenen van salaris met toeslagen en aftrekposten, specifiek ontwikkeld voor Albert Heijn medewerkers.

## 🚀 Functionaliteiten

### 🆕 Nieuw: Automatische Deployment

De app wordt automatisch gedeployed naar GitHub Pages bij elke push naar de master branch!

### 1. Configuratie Sectie

#### Uurloon Berekening

- **Functie-gebaseerd Uurloon**: Automatische berekening op basis van leeftijd, functie en dienstjaren
  - **Leeftijdsgroepen**: 13-15, 16, 17, 18, 19, 20, 21+ jaar
  - **Functies**: Vakkenvuller, Kassa, Shiftleader
  - **Dienstjaren**: 0, 1, 2, 3, 4, 5+ jaar
- **Handmatig Uurloon**: Voer je eigen all-in uurloon in euro's in

#### Algemene Instellingen

- **Aantal weken**: Aantal weken in de salarisperiode (standaard: 4)
- **Pensioen premie percentage**: Percentage voor pensioenpremie (standaard: 1.69%)
- **SPAWW.nl percentage**: Percentage voor SPAWW (standaard: 0.5%)
- **Premie WGA werknemer percentage**: Percentage voor WGA premie (standaard: 0.5%)
- **Loonheffing percentage**: Optioneel percentage voor loonheffing (standaard: 0%)

### 2. Urenregistratie Sectie

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

1. **Uurloon Berekening**:

   - Reguliere uren: `All-in Uurloon`
   - Betaalde pauzes: `All-in Uurloon`
   - 25% Toeslag: `All-in Uurloon × 1.25`
   - 50% Toeslag: `All-in Uurloon × 1.50`
   - 100% Toeslag: `All-in Uurloon × 2.00`

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

1. **Configureer je instellingen** in de Configuratie sectie
   - Kies tussen functie-gebaseerd of handmatig uurloon
   - Stel percentages in voor aftrekposten
2. **Voer je uren in** per week in de Urenregistratie sectie
   - Voeg reguliere uren en betaalde pauzes toe
   - Voeg toeslaguren toe met verschillende percentages
3. **Bekijk het resultaat** in de Resultaten sectie
4. **Alle berekeningen worden automatisch bijgewerkt** wanneer je wijzigingen maakt

## ⚠️ Belangrijke Opmerkingen

- Alle berekeningen zijn **geschat** en kunnen afwijken van je daadwerkelijke salarisstrook
- Voer uren in het **HH:MM formaat** in (bijv. 8:30 voor 8 uur en 30 minuten)
- De applicatie valideert automatisch de tijdinvoer
- Loonheffing is optioneel en standaard uitgeschakeld
- De app is specifiek ontwikkeld voor Albert Heijn medewerkers

## 🔧 Technische Details

- **React**: Functionele componenten met hooks
- **State Management**: React useState en useEffect
- **Styling**: Tailwind CSS
- **Responsiviteit**: CSS Grid en Flexbox
- **Validatie**: Regex voor tijdinvoer
- **PWA**: Service Worker voor offline functionaliteit
- **TypeScript**: Volledig getypeerde code
- **Local Storage**: Automatische opslag van instellingen

## 📄 Licentie

Dit project is open source en vrij te gebruiken voor persoonlijke en commerciële doeleinden.
