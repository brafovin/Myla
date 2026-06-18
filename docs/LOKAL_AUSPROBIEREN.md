# CoKomi lokal ausprobieren (Windows)

So startest du CoKomi auf deinem eigenen Computer. Du brauchst es nur einmal
einzurichten – danach reicht ein Befehl.

## 1. Node.js installieren (einmalig)

1. Gehe auf **https://nodejs.org**
2. Lade die **LTS-Version** herunter (großer grüner Button) und installiere sie
   (einfach durchklicken, alle Standard-Einstellungen lassen).
3. Zum Prüfen: Drücke `Windows-Taste`, tippe **PowerShell**, öffne es und gib ein:
   ```powershell
   node -v
   ```
   Es sollte eine Versionsnummer wie `v20.x.x` erscheinen.

## 2. Den Code auf den Computer holen (einmalig)

**Einfachster Weg (ohne Git):**
1. Öffne im Browser: `https://github.com/brafovin/Myla`
2. Wechsle oben links auf den Branch **`claude/focused-allen-eqia9z`**
   (dort ist der aktuelle Stand).
3. Klicke auf den grünen Button **Code** → **Download ZIP**.
4. Entpacke die ZIP-Datei z. B. nach `Dokumente\CoKomi`.

## 3. App starten

1. Öffne den Ordner, in den du entpackt hast (z. B. `Dokumente\CoKomi`).
2. Klicke oben in die **Adressleiste** des Explorers, tippe `powershell` und drücke Enter
   – so öffnet sich PowerShell direkt in diesem Ordner.
3. Gib nacheinander ein (jeweils mit Enter):
   ```powershell
   npm install
   ```
   (lädt einmalig die Bausteine – kann 1–2 Minuten dauern)
   ```powershell
   npm run dev
   ```
4. Öffne deinen Browser und gehe auf:
   **http://localhost:5173**

🎉 Jetzt siehst du CoKomi! Du kannst dich „anmelden" (Nickname wählen, Häkchen setzen)
und durch die ganze App klicken.

## Beenden
In PowerShell **`Strg` + `C`** drücken. Beim nächsten Mal reicht Schritt 3 ab `npm run dev`.

---

### Nur die App-Oberfläche (noch einfacher)
Die Oberfläche funktioniert auch komplett ohne den Server. Wenn du möchtest, kannst du
statt `npm run dev` auch nur das Frontend starten:
```powershell
npm run dev --workspace=@myla/frontend
```
Dann ebenfalls **http://localhost:5173** öffnen.

### Hinweis
Diese lokale Version ist nur auf deinem Computer sichtbar (nicht im Internet) und nutzt
Beispiel-Daten. Zum Teilen mit anderen brauchst du ein Hosting wie Vercel – siehe
[`DEPLOYMENT.md`](DEPLOYMENT.md).
