# CoKomi

**CoKomi** ist eine Web-App, mit der sich Menschen aus verschiedenen Ländern unterhalten,
voneinander Sprachen lernen und fremde Kulturen kennenlernen können. Wer nur reden will,
kann sich auch einfach auf **Englisch** mit anderen austauschen.

> Status: **Klickbarer Prototyp**. Startseite, Anmeldung (Nickname + Einwilligungen,
> 18+) und das App-Innenleben (Start, Entdecken, Chats, Profil, Einstellungen) sind als
> Oberfläche fertig und nutzen Beispiel-Daten. Als Nächstes folgen echtes Backend,
> Registrierung/Login und die Chat-/Moderationslogik.

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
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) – Bereitstellung (Vercel)
- [`docs/LOKAL_AUSPROBIEREN.md`](docs/LOKAL_AUSPROBIEREN.md) – CoKomi lokal starten (Windows)

## Erste Schritte (lokale Entwicklung)

Voraussetzung: Node.js ≥ 20.

```bash
npm install          # Abhängigkeiten installieren (alle Workspaces)
npm run dev          # Backend + Frontend parallel starten
```

- Backend läuft auf `http://localhost:4000`
- Frontend läuft auf `http://localhost:5173`

## Roadmap (Vorschlag)

| Meilenstein | Inhalt | Status |
|---|---|---|
| M1 | Grundgerüst + Konzept | ✅ fertig |
| M2 | Logo, farbig-freundliches Design | ✅ fertig |
| M3 | Klickbarer Prototyp: Startseite, Anmeldung (Nickname, 18+), App-Innenleben | ✅ fertig |
| M4 | Echtes Backend + Datenbank (statt Beispiel-Daten) | offen |
| M5 | Registrierung & Login mit echter Altersprüfung | offen |
| M6 | Echtzeit-Chat & Sprachanrufe | offen |
| M7 | Melde- & Moderationssystem, Eskalation (Verwarnung → Sperre → Behörden) | offen |
