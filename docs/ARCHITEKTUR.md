# Architektur

## 1. Überblick

CoKomi ist eine Web-App mit klassischer Client–Server-Trennung in einem **Monorepo**
(npm-Workspaces):

```
┌─────────────────┐        HTTPS / REST        ┌──────────────────┐
│  Frontend       │  ───────────────────────►  │  Backend (API)   │
│  React + Vite   │  ◄───────────────────────  │  Node + Express  │
│  TypeScript     │        (später: WS)        │  TypeScript      │
└─────────────────┘                            └────────┬─────────┘
        ▲                                                │
        │ gemeinsame Typen                               │
        └──────────────  packages/shared  ──────────────┘
                                                         │
                                                ┌────────▼─────────┐
                                                │  Datenbank        │
                                                │ (später, z. B.    │
                                                │  PostgreSQL)      │
                                                └──────────────────┘
```

- **Frontend** (`apps/frontend`): React + Vite + TypeScript.
- **Backend** (`apps/backend`): Node + Express + TypeScript, REST-API.
- **Shared** (`packages/shared`): gemeinsame TypeScript-Typen/Domänenmodelle, damit
  Frontend und Backend dieselben Strukturen verwenden.
- **Echtzeit-Chat** (späterer Meilenstein): WebSockets (z. B. `ws`/Socket.IO).
- **Persistenz** (späterer Meilenstein): aktuell In-Memory-Platzhalter; vorgesehen ist
  eine relationale DB (z. B. PostgreSQL via Prisma).

## 2. Technologie-Wahl (Begründung)

| Bereich | Wahl | Warum |
|---|---|---|
| Sprache | TypeScript (Front + Back) | Ein Sprachstack, geteilte Typen, weniger Fehler |
| Frontend | React + Vite | Verbreitet, schnelle Dev-Experience |
| Backend | Express | Einfach, gut dokumentiert, leicht erweiterbar |
| Monorepo | npm-Workspaces | Eingebaut, kein Extra-Tool nötig |

## 3. Domänenmodell (Kern-Entitäten)

Definiert in `packages/shared/src/types.ts`.

- **User** – Mitglied; enthält Altersstatus (`isAdult`), Sprachen (gesprochen/lernend),
  Land, Rolle, Konto-Status (aktiv/verwarnt/gesperrt).
- **LanguageSkill** – Sprache + Niveau (A1–C2 / Muttersprache).
- **Conversation** – 1:1-Unterhaltung mit **Modus** (`learn` | `culture` | `english`).
- **Message** – einzelne Nachricht in einer Conversation.
- **Report** – Meldung einer Nachricht/Person durch eine:n Nutzer:in.
- **ModerationCase** – Prüffall in der Review Queue (Status, Schweregrad, Entscheidung).
- **Warning** – ausgesprochene Verwarnung.
- **Ban** – Kontosperre.
- **PoliceReport** – dokumentierte Meldung an die Polizei.
- **AuditLogEntry** – revisionssichere Protokollierung sicherheitsrelevanter Aktionen.

### Eskalations-Logik (Bezug zum Auftrag)
`User.violationCount` zählt bestätigte Verstöße:
- 1. Verstoß → `Warning` (Status `WARNED`).
- weiterer Verstoß → `Ban` (Status `BANNED`).
- bei Straftat-Verdacht → zusätzlich `PoliceReport`.

Siehe [`MODERATION.md`](MODERATION.md) für den vollständigen Prozess.

## 4. API-Skizze (erste Endpunkte)

| Methode | Pfad | Zweck |
|---|---|---|
| `GET` | `/api/health` | Health-Check |
| `GET` | `/api/concept` | Konzept-Eckdaten (für Startseite) |
| *(später)* `POST` | `/api/auth/register` | Registrierung inkl. Altersprüfung |
| *(später)* `POST` | `/api/auth/login` | Anmeldung |
| *(später)* `GET` | `/api/match` | Gesprächspartner-Vorschläge |
| *(später)* `POST` | `/api/reports` | Meldung einreichen |
| *(später)* `GET` | `/api/moderation/queue` | Review Queue (nur Moderation) |

## 5. Sicherheit (technisch)

- TLS überall, sichere Cookies/Tokens für Auth (später).
- Eingaben validieren, Rate-Limiting, Schutz vor Missbrauch.
- Zugriff auf Moderations-/Admin-Funktionen rollenbasiert.
- Audit-Logging aller sicherheitsrelevanten Aktionen.
- Datenschutz: siehe [`DATENSCHUTZ_UND_RECHT.md`](DATENSCHUTZ_UND_RECHT.md).

## 6. Nächste technische Schritte

1. Datenbank + ORM (Prisma/PostgreSQL) anbinden, In-Memory ersetzen.
2. Auth + Altersprüfung (M2).
3. Profile, Präferenzen, Matching (M3).
4. Echtzeit-Chat via WebSockets (M4).
5. Melde-/Moderationssystem + Review-Queue-UI (M5).
6. Eskalations-/Behörden-Workflow (M6).
