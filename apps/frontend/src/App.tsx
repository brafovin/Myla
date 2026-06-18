import { useEffect, useState } from "react";
import type { ConceptInfo, ConversationMode } from "@myla/shared";
import { Permissions } from "./Permissions.js";
import { AppShell } from "./app/AppShell.js";

/** Passende Emojis/Icons je Konversations-Modus. */
const MODE_ICON: Record<ConversationMode, string> = {
  learn: "🗣️",
  culture: "🌍",
  english: "💬",
};

/**
 * Standard-Inhalte, damit die Startseite auch ohne erreichbares Backend
 * vollständig aussieht (z. B. bei einem statischen Deployment). Ist das
 * Backend erreichbar, werden diese Werte aktualisiert.
 */
const DEFAULT_CONCEPT: ConceptInfo = {
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

const STEPS = [
  {
    icon: "✅",
    title: "Verifizieren",
    text: "Mit der Altersprüfung bestätigst du, dass du mindestens 18 Jahre alt bist.",
  },
  {
    icon: "🧭",
    title: "Profil & Ziele",
    text: "Wähle, welche Sprachen du sprichst, welche du lernen willst und was dich interessiert.",
  },
  {
    icon: "🤝",
    title: "Matchen",
    text: "Wir schlagen dir passende Gesprächspartner:innen aus anderen Ländern vor.",
  },
  {
    icon: "✨",
    title: "Loslegen",
    text: "Unterhalte dich, lerne dazu und entdecke neue Kulturen – ganz in deinem Tempo.",
  },
];

export function App() {
  const [concept, setConcept] = useState<ConceptInfo>(DEFAULT_CONCEPT);
  const [view, setView] = useState<"home" | "permissions" | "app">("home");

  useEffect(() => {
    // Optional: Inhalte vom Backend laden, wenn erreichbar. Schlägt der
    // Aufruf fehl, bleiben die Standard-Inhalte erhalten (kein Fehler sichtbar).
    fetch("/api/concept")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ConceptInfo) => setConcept(data))
      .catch(() => {
        /* Standard-Inhalte beibehalten */
      });
  }, []);

  const minAge = concept.minAge;

  // Innenleben der App (nach dem Login) – Vollbild ohne Landing-Navigation.
  if (view === "app") {
    return (
      <AppShell
        onLogout={() => setView("home")}
        onOpenPermissions={() => setView("permissions")}
      />
    );
  }

  return (
    <div className="app">
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      <nav className="nav">
        <button className="brand brand--btn" onClick={() => setView("home")}>
          <img className="brand__logo" src="/myla-logo.svg" alt="" />
          {concept.name}
        </button>
        <div className="nav__links">
          {view === "home" && (
            <>
              <a href="#modes">Modi</a>
              <a href="#how">So geht's</a>
              <a href="#safety">Sicherheit</a>
            </>
          )}
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => setView("permissions")}
          >
            Anmelden
          </button>
        </div>
      </nav>

      {view === "permissions" ? (
        <Permissions
          minAge={minAge}
          onBack={() => setView("home")}
          onEnter={() => setView("app")}
        />
      ) : (
        <>
      <header className="hero" id="top">
        <span className="pill">🔒 Nur für Erwachsene ab {minAge} Jahren</span>
        <h1 className="hero__title">
          Sprich mit der Welt.<br />
          <span className="grad">Lerne ihre Sprachen.</span>
        </h1>
        <p className="hero__sub">{concept.tagline}</p>
        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => setView("permissions")}>
            Jetzt kostenlos starten
          </button>
          <a className="btn btn--ghost" href="#how">
            So funktioniert's
          </a>
        </div>

        <div className="stats">
          <div className="stat">
            <strong>3</strong>
            <span>Gesprächs-Modi</span>
          </div>
          <div className="stat">
            <strong>100+</strong>
            <span>Sprachen geplant</span>
          </div>
          <div className="stat">
            <strong>18+</strong>
            <span>geprüfte Community</span>
          </div>
        </div>
      </header>

      <section className="section" id="modes">
        <div className="section__head">
          <span className="eyebrow">Drei Wege, dich zu verbinden</span>
          <h2>So kannst du Myla nutzen</h2>
          <p>Wähle vor jedem Gespräch, worum es dir geht – ganz ohne Druck.</p>
        </div>
        <div className="cards">
          {concept.modes.map((mode) => (
            <article key={mode.id} className="card">
              <div className="card__icon">{MODE_ICON[mode.id] ?? "💬"}</div>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--alt" id="how">
        <div className="section__head">
          <span className="eyebrow">In vier Schritten</span>
          <h2>So funktioniert's</h2>
        </div>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div key={step.title} className="step">
              <div className="step__num">{i + 1}</div>
              <div className="step__icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="safety">
        <div className="safety">
          <div className="safety__badge">🛡️</div>
          <div>
            <span className="eyebrow">Deine Sicherheit</span>
            <h2>Ein Ort, an dem du dich wohlfühlst</h2>
            <p>
              Myla ist ausschließlich für Erwachsene. Bei Meldungen oder Auffälligkeiten
              prüft ein Team die Konversation. Bei Verstößen gilt: erst eine Verwarnung,
              bei Wiederholung die Sperre – und bei Verdacht auf Straftaten informieren
              wir die Polizei.
            </p>
            <ul className="safety__list">
              <li>Geprüfte Community ab {minAge} Jahren</li>
              <li>Melde-Funktion in jedem Chat</li>
              <li>Faires Verfahren: Verwarnung → Sperre → Behörden</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta" id="join">
        <h2>Bereit, die Welt kennenzulernen?</h2>
        <p>Werde Teil einer neugierigen, weltoffenen Community.</p>
        <button className="btn btn--primary btn--lg" onClick={() => setView("permissions")}>
          Kostenlos beitreten
        </button>
      </section>
        </>
      )}

      <footer className="footer">
        <span className="brand">
          <img className="brand__logo" src="/myla-logo.svg" alt="" />
          {concept.name}
        </span>
        <small>Sprachen lernen · Kulturen verstehen · sicher verbunden</small>
        <small className="footer__meta">Grundgerüst (M1) · siehe /docs für Konzept &amp; Architektur</small>
      </footer>
    </div>
  );
}
