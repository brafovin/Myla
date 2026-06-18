import { useEffect, useState } from "react";
import type { ConceptInfo } from "@myla/shared";

export function App() {
  const [concept, setConcept] = useState<ConceptInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/concept")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ConceptInfo) => setConcept(data))
      .catch(() => setError("Backend nicht erreichbar (läuft es auf Port 4000?)."));
  }, []);

  return (
    <main className="page">
      <header className="hero">
        <h1>{concept?.name ?? "Myla"}</h1>
        <p className="tagline">
          {concept?.tagline ??
            "Sprachen lernen, Kulturen verstehen – oder einfach auf Englisch reden."}
        </p>
        <span className="badge">Nur für Erwachsene ab {concept?.minAge ?? 18} Jahren</span>
      </header>

      {error && <p className="error">{error}</p>}

      <section className="modes">
        <h2>So kannst du Myla nutzen</h2>
        <div className="cards">
          {(concept?.modes ?? []).map((mode) => (
            <article key={mode.id} className="card">
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="safety">
        <h2>Sicher unterwegs</h2>
        <p>
          Myla ist ein Ort für Erwachsene. Konversationen werden bei Meldungen oder
          Auffälligkeiten von einem Team geprüft. Bei Verstößen gilt: Verwarnung, bei
          Wiederholung Sperre – und bei Verdacht auf Straftaten wird die Polizei informiert.
        </p>
      </section>

      <footer className="footer">
        <small>Myla · Grundgerüst (M1) · siehe /docs für Konzept & Architektur</small>
      </footer>
    </main>
  );
}
