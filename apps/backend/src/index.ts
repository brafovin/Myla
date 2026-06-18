import express from "express";
import cors from "cors";
import type { ConceptInfo } from "@myla/shared";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT ?? 4000);

/** Health-Check für Monitoring/Deployments. */
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "myla-backend", time: new Date().toISOString() });
});

/**
 * Eckdaten des Konzepts für die Startseite.
 * (Platzhalter – später aus DB/Konfiguration.)
 */
app.get("/api/concept", (_req, res) => {
  const concept: ConceptInfo = {
    name: "Myla",
    tagline:
      "Sprachen lernen, Kulturen verstehen – oder einfach auf Englisch reden. Nur für Erwachsene.",
    minAge: 18,
    modes: [
      {
        id: "learn",
        title: "Sprache lernen",
        description: "Übe mit Muttersprachler:innen aus anderen Ländern.",
      },
      {
        id: "culture",
        title: "Kultur entdecken",
        description: "Verstehe Alltag, Bräuche und Sichtweisen anderer Länder.",
      },
      {
        id: "english",
        title: "Einfach reden",
        description: "Keine Lust zu lernen? Unterhalte dich auf Englisch.",
      },
    ],
  };
  res.json(concept);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Myla-Backend läuft auf http://localhost:${PORT}`);
});
