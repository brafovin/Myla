import { useEffect, useState } from "react";

/** Geräte-Berechtigungen, die Myla nutzen kann. */
type PermKey = "microphone" | "camera" | "location";

/** Aktueller Status einer Berechtigung. */
type PermStatus = "unknown" | "granted" | "denied" | "unsupported";

interface PermConfig {
  key: PermKey;
  icon: string;
  title: string;
  /** Priming-Text: erklärt WARUM, bevor die Browser-Abfrage kommt. */
  why: string;
}

const PERMISSIONS: PermConfig[] = [
  {
    key: "microphone",
    icon: "🎙️",
    title: "Mikrofon",
    why: "Für Sprach-Chats und Sprachnachrichten mit deinen Gesprächspartner:innen.",
  },
  {
    key: "camera",
    icon: "📷",
    title: "Kamera",
    why: "Für Video-Chats, wenn ihr euch von Angesicht zu Angesicht unterhalten wollt.",
  },
  {
    key: "location",
    icon: "📍",
    title: "Standort",
    why: "Optional – um dir passende Gesprächspartner:innen aus deiner Region vorzuschlagen.",
  },
];

const STATUS_LABEL: Record<PermStatus, string> = {
  unknown: "Nicht angefragt",
  granted: "Erlaubt",
  denied: "Blockiert",
  unsupported: "Nicht unterstützt",
};

export function Permissions({
  minAge,
  onBack,
}: {
  minAge: number;
  onBack: () => void;
}) {
  const [statuses, setStatuses] = useState<Record<PermKey, PermStatus>>({
    microphone: "unknown",
    camera: "unknown",
    location: "unknown",
  });
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [done, setDone] = useState(false);

  const setStatus = (key: PermKey, status: PermStatus) =>
    setStatuses((prev) => ({ ...prev, [key]: status }));

  // Best-effort: aktuellen Status über die Permissions-API abfragen (falls vorhanden).
  useEffect(() => {
    const perms = navigator.permissions;
    if (!perms?.query) return;
    const map: Record<PermKey, PermissionName> = {
      microphone: "microphone" as PermissionName,
      camera: "camera" as PermissionName,
      location: "geolocation" as PermissionName,
    };
    (Object.keys(map) as PermKey[]).forEach((key) => {
      perms
        .query({ name: map[key] })
        .then((res) => {
          if (res.state === "granted") setStatus(key, "granted");
          else if (res.state === "denied") setStatus(key, "denied");
        })
        .catch(() => {
          /* Manche Browser kennen den Namen nicht – ignorieren. */
        });
    });
  }, []);

  async function request(key: PermKey) {
    try {
      if (key === "microphone" || key === "camera") {
        if (!navigator.mediaDevices?.getUserMedia) {
          setStatus(key, "unsupported");
          return;
        }
        const constraints =
          key === "microphone" ? { audio: true } : { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // Gerät sofort wieder freigeben – wir wollten nur die Erlaubnis.
        stream.getTracks().forEach((track) => track.stop());
        setStatus(key, "granted");
      } else {
        if (!navigator.geolocation) {
          setStatus(key, "unsupported");
          return;
        }
        navigator.geolocation.getCurrentPosition(
          () => setStatus(key, "granted"),
          () => setStatus(key, "denied"),
        );
      }
    } catch {
      setStatus(key, "denied");
    }
  }

  const canContinue = isAdult && acceptedTerms;

  if (done) {
    return (
      <section className="section perm">
        <div className="perm__success">
          <div className="perm__success-icon">🎉</div>
          <h2>Alles bereit!</h2>
          <p>
            Danke – deine Bestätigungen sind gespeichert. Sobald die Anmeldung fertig
            gebaut ist, geht es hier direkt weiter.
          </p>
          <button className="btn btn--primary" onClick={onBack}>
            Zur Startseite
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section perm">
      <button className="perm__back" onClick={onBack}>
        ← Zurück
      </button>

      <div className="section__head">
        <span className="eyebrow">Bevor du loslegst</span>
        <h2>Berechtigungen &amp; Einwilligungen</h2>
        <p>
          Damit Myla für alle ein sicherer Ort bleibt, brauchen wir kurz deine Bestätigung.
          Geräte-Zugriffe fragt anschließend dein Browser ab – du kannst sie jederzeit ändern.
        </p>
      </div>

      {/* Pflicht-Einwilligungen */}
      <div className="perm__consents">
        <label className="perm__check">
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(e) => setIsAdult(e.target.checked)}
          />
          <span>
            Ich bin mindestens <strong>{minAge} Jahre</strong> alt.
          </span>
        </label>
        <label className="perm__check">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span>
            Ich akzeptiere die <a href="#agb">Nutzungsbedingungen</a> und{" "}
            <a href="#datenschutz">Datenschutzerklärung</a> und nehme zur Kenntnis, dass
            Konversationen anlassbezogen geprüft und bei Straftat-Verdacht an Behörden
            gemeldet werden können.
          </span>
        </label>
      </div>

      {/* Geräte-Berechtigungen */}
      <h3 className="perm__subhead">Geräte-Zugriffe (optional)</h3>
      <div className="perm__grid">
        {PERMISSIONS.map((perm) => {
          const status = statuses[perm.key];
          return (
            <article key={perm.key} className="perm__card">
              <div className="perm__card-top">
                <span className="perm__icon">{perm.icon}</span>
                <span className={`perm__badge perm__badge--${status}`}>
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <h4>{perm.title}</h4>
              <p>{perm.why}</p>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => request(perm.key)}
                disabled={status === "granted" || status === "unsupported"}
              >
                {status === "granted" ? "Erlaubt ✓" : "Zugriff erlauben"}
              </button>
              {status === "denied" && (
                <p className="perm__hint">
                  Blockiert – du kannst es in den Browser-Einstellungen wieder erlauben.
                </p>
              )}
            </article>
          );
        })}
      </div>

      <div className="perm__actions">
        <button
          className="btn btn--primary btn--lg"
          disabled={!canContinue}
          onClick={() => setDone(true)}
        >
          Bestätigen &amp; loslegen
        </button>
        {!canContinue && (
          <p className="perm__hint">
            Bitte bestätige Alter und Bedingungen, um fortzufahren.
          </p>
        )}
      </div>
    </section>
  );
}
