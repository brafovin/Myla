# CoKomi

**CoKomi** ist eine Web-App, mit der sich Menschen aus verschiedenen Ländern unterhalten,
voneinander Sprachen lernen und fremde Kulturen kennenlernen können. Wer nur reden will,
kann sich auch einfach auf **Englisch** mit anderen austauschen.

> Status: **Grundgerüst & Konzept** (erster Meilenstein). Die hier eingerichtete Struktur
> ist die Basis, auf der die einzelnen Funktionen (Registrierung, Chat, Moderation …)
> nach und nach aufgebaut werden.

## Die Idee in Kürze

- **Sprachen lernen** – mit Muttersprachler:innen aus anderen Ländern üben.
- **Kultur verstehen** – mehr als nur Vokabeln: Alltag, Bräuche, Sichtweisen.
- **Einfach reden** – wer nicht lernen will, unterhält sich auf Englisch.
- **Nur für Erwachsene (18+)** – Schutz vor Missbrauch, insbesondere vor Gefahren
  für Minderjährige.
- **Geprüfte Konversationen** – ein Moderationsteam prüft gemeldete/auffällige Inhalte.
  Bei Straftaten: **Verwarnung → bei Wiederholung Sperre + Information der Polizei**.

## Leitprinzipien

1. **Sicherheit zuerst.** Die App existiert für Begegnung, nicht für Missbrauch.
2. **Klarheit & Transparenz.** Nutzer:innen wissen, dass und wie moderiert wird.
3. **Datenschutz nach Recht (DSGVO).** So wenig Daten wie möglich, so viel wie nötig.

## Projektstruktur

```
CoKomi/
├── apps/
│   ├── backend/      # API-Server (Node + Express + TypeScript)
│   └── frontend/     # Web-Oberfläche (React + Vite + TypeScript)
├── packages/
│   └── shared/       # Gemeinsame Typen/Domänenmodelle
├── docs/             # Konzept, Architektur, Moderation, Datenschutz
└── package.json      # npm-Workspaces (Monorepo)
```

## Dokumentation

- [`docs/KONZEPT.md`](docs/KONZEPT.md) – Produktvision, Funktionen, Nutzerrollen
- [`docs/ARCHITEKTUR.md`](docs/ARCHITEKTUR.md) – technische Architektur & Datenmodell
- [`docs/MODERATION.md`](docs/MODERATION.md) – Moderations- & Eskalationsprozess
- [`docs/DATENSCHUTZ_UND_RECHT.md`](docs/DATENSCHUTZ_UND_RECHT.md) – DSGVO, Altersprüfung, Polizei

## Erste Schritte (lokale Entwicklung)

Voraussetzung: Node.js ≥ 20.

```bash
npm install          # Abhängigkeiten installieren (alle Workspaces)
npm run dev          # Backend + Frontend parallel starten
```

- Backend läuft auf `http://localhost:4000`
- Frontend läuft auf `http://localhost:5173`

## Roadmap (Vorschlag)

| Meilenstein | Inhalt |
|---|---|
| **M1 (jetzt)** | Grundgerüst + Konzept |
| M2 | Registrierung & Altersprüfung (18+) |
| M3 | Profile, Sprach-/Kultur-Präferenzen, Matching |
| M4 | Echtzeit-Chat (Text), Übersetzungs-/Lernhilfen |
| M5 | Melde- & Moderationssystem (menschliche Prüfung) |
| M6 | Eskalation: Verwarnung → Sperre → Behörden-Schnittstelle |
