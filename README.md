# 💰 Salariscalculator

Een React web- en mobiele applicatie voor het berekenen van salaris met toeslagen en aftrekposten.

## 🚀 Functionaliteiten

### 🆕 Nieuw: Automatische Deployment

De app wordt automatisch gedeployed naar GitHub Pages bij elke push naar de master branch!

### 1. Configuratie Sectie

- **All-in Uurloon**: Voer je uurloon in euro's in (standaard: €19.18)
- **Toeslagpercentage**: Percentage voor toeslaguren (standaard: 50%)
- **Aantal weken**: Aantal weken in de salarisperiode (standaard: 4)
- **Pensioen/SPAWW percentage**: Percentage voor pensioen en SPAWW (standaard: 1.69%)
- **Loonheffing/WGA percentage**: Percentage voor loonheffing en WGA (standaard: 8.28%)

### 2. Urenregistratie Sectie

- Dynamische invoervelden op basis van het aantal weken
- Voor elke week:
  - **Reguliere Uren**: Voer uren in HH:MM formaat (bijv. 36:00)
  - **Toeslaguren 50**: Voer toeslaguren in HH:MM formaat (bijv. 4:30)

### 3. Resultaten Sectie

- **Totaal Reguliere Uren**: Som van alle reguliere uren in HH:MM formaat
- **Totaal Toeslaguren 50**: Som van alle toeslaguren in HH:MM formaat
- **Geschat Bruto Salaris**: Berekend bruto salaris in euro's
- **Geschatte Pensioen/SPAWW**: Geschatte aftrek voor pensioen en SPAWW
- **Geschatte Loonheffing/WGA**: Geschatte aftrek voor loonheffing en WGA
- **Geschat Netto Salaris**: Uiteindelijk geschat netto salaris

## 🧮 Berekeningslogica

1. **Uurloon Toeslaguren**: `All-in Uurloon × (1 + Toeslagpercentage / 100)`
2. **Inkomsten Reguliere Uren**: `Totaal Reguliere Uren (decimaal) × All-in Uurloon`
3. **Inkomsten Toeslaguren**: `Totaal Toeslaguren 50 (decimaal) × Uurloon Toeslaguren`
4. **Bruto Salaris**: `Inkomsten Reguliere Uren + Inkomsten Toeslaguren`
5. **Pensioen/SPAWW Aftrek**: `Bruto Salaris × (Percentage Pensioen/SPAWW / 100)`
6. **Loon voor Loonheffing**: `Bruto Salaris - Pensioen/SPAWW Aftrek`
7. **Loonheffing/WGA Aftrek**: `Loon voor Loonheffing × (Percentage Loonheffing/WGA / 100)`
8. **Netto Salaris**: `Bruto Salaris - Pensioen/SPAWW Aftrek - Loonheffing/WGA Aftrek`

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
- **Kleurenschema**: Modern en professioneel
- **UI**: Schone, intuïtieve interface met afgeronde hoeken

## 💡 Gebruik

1. **Configureer je instellingen** in de Configuratie sectie
2. **Voer je uren in** per week in de Urenregistratie sectie
3. **Bekijk de resultaten** in de Resultaten sectie
4. **Alle berekeningen worden automatisch bijgewerkt** wanneer je wijzigingen maakt

## ⚠️ Belangrijke Opmerkingen

- Alle berekeningen zijn **geschat** en kunnen afwijken van je daadwerkelijke salarisstrook
- Voer uren in het **HH:MM formaat** in (bijv. 8:30 voor 8 uur en 30 minuten)
- De applicatie valideert automatisch de tijdinvoer

## 🔧 Technische Details

- **React**: Functionele componenten met hooks
- **State Management**: React useState en useEffect
- **Styling**: Tailwind CSS
- **Responsiviteit**: CSS Grid en Flexbox
- **Validatie**: Regex voor tijdinvoer

## 📄 Licentie

Dit project is open source en vrij te gebruiken voor persoonlijke en commerciële doeleinden.
