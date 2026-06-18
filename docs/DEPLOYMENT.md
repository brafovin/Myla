# Deployment (Vercel)

## Das Wichtigste zuerst

CoKomi besteht aus **zwei Teilen**:

- **Frontend** – die sichtbare Webseite (React). **Das willst du deployen, damit Leute
  die Seite sehen.**
- **Backend** – der API-Server. Liefert nur `/api/...`-Daten, **keine** Webseite. Wenn man
  ihn im Browser öffnet, sieht man deshalb nur einen Hinweis (früher: „Cannot GET /").

Die Startseite funktioniert **eigenständig** – sie braucht das Backend (noch) nicht, um
schön auszusehen.

## Frontend auf Vercel deployen (empfohlen)

Im Projekt liegt eine `vercel.json`, die Vercel sagt, wie das Frontend gebaut wird.

### Wenn du das bestehende Projekt „myla-backend" benutzt
Es ist vermutlich auf das Backend eingestellt. So stellst du es aufs Frontend um:

1. Öffne das Projekt im **Vercel-Dashboard** → **Settings** → **Build & Deployment**.
2. Setze **Root Directory** auf das Repo-Stammverzeichnis (also leer lassen bzw. `./`),
   **nicht** `apps/backend`.
3. Vercel nutzt dann automatisch die `vercel.json`:
   - Build Command: `npm run build --workspace=@myla/frontend`
   - Output Directory: `apps/frontend/dist`
4. **Redeploy** auslösen (Deployments → … → Redeploy).

Danach zeigt die URL die richtige Webseite. Tipp: Du kannst das Projekt unter
**Settings → General** auch in „myla" umbenennen.

### Oder: ein neues Projekt anlegen
1. Vercel → **Add New… → Project** → dieses GitHub-Repo importieren.
2. **Root Directory** = Stammverzeichnis (leer lassen).
3. Deploy. Fertig – die `vercel.json` erledigt den Rest.

## Backend später deployen (optional, erst ab Meilenstein 2 nötig)

Das Backend wird erst gebraucht, wenn es echte Funktionen gibt (Login, Chat …). Ein
klassischer Express-Server passt besser zu einem Dienst wie **Render**, **Railway** oder
**Fly.io** (dauerhaft laufender Node-Server). Auf Vercel müsste man ihn als Serverless-
Funktion umbauen – das machen wir, sobald es so weit ist.

## Lokal testen

```bash
npm install
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:4000
```
