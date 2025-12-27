# HealthTracker – Frontend

React + TypeScript (Vite) Frontend für die HealthTracker-App.

## Tech-Stack

- React
- TypeScript
- Vite
- Fetch API für HTTP-Requests

## Voraussetzungen

- Node.js (LTS)
- npm oder pnpm/yarn

## Installation

```bash
npm install
```
```bash
# Frontend starten
npm run dev
```

# Standard-URL

- Frontend: http://localhost:5173
- Erwartetes Backend: http://localhost:8080

# Aktuelle Features

- Health-Entries Liste anzeigen (GET /api/entries)
- Neuen Eintrag anlegen (Formular, POST /api/entries)
- Eintrag löschen (DELETE /api/entries/{id})
- Eintrag bearbeiten (Edit-Panel, PUT /api/entries/{id})
- Saubere Komponentenstruktur:
  - HealthEntryList
  - HealthEntryCreateForm
  - HealthEntryEditPanel