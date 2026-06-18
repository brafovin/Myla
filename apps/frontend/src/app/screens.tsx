import { useState } from "react";
import type { ConversationMode } from "@myla/shared";
import {
  ME,
  MODE_LABEL,
  PARTNERS,
  INITIAL_CHATS,
  partnerById,
  type Partner,
  type ChatMessage,
  type ChatPreview,
} from "./mock.js";

export type Screen = "start" | "discover" | "chats" | "profile" | "settings";

/** Avatar aus dem ersten Buchstaben + farbigem Hintergrund. */
function Avatar({ name, flag, online }: { name: string; flag?: string; online?: boolean }) {
  return (
    <div className="avatar">
      <span>{name.charAt(0)}</span>
      {flag && <span className="avatar__flag">{flag}</span>}
      {online && <span className="avatar__online" title="online" />}
    </div>
  );
}

function ModeTags({ modes }: { modes: ConversationMode[] }) {
  return (
    <div className="tags">
      {modes.map((m) => (
        <span key={m} className={`tag tag--${m}`}>
          {MODE_LABEL[m]}
        </span>
      ))}
    </div>
  );
}

function PartnerCard({ partner, onChat }: { partner: Partner; onChat: () => void }) {
  return (
    <article className="pcard">
      <div className="pcard__head">
        <Avatar name={partner.name} flag={partner.flag} online={partner.online} />
        <div>
          <h3>
            {partner.name} <span className="pcard__country">{partner.country}</span>
          </h3>
          <p className="pcard__lang">
            spricht {partner.speaks} · lernt {partner.learning}
          </p>
        </div>
      </div>
      <p className="pcard__bio">{partner.bio}</p>
      <ModeTags modes={partner.modes} />
      <div className="pcard__actions">
        <button className="btn btn--primary btn--sm" onClick={onChat}>
          💬 Chatten
        </button>
        <button className="btn btn--ghost btn--sm" title="Sprachanruf">
          📞 Anrufen
        </button>
      </div>
    </article>
  );
}

/* --- Start --------------------------------------------------------------- */
export function StartScreen({ go }: { go: (s: Screen) => void }) {
  const suggestions = PARTNERS.slice(0, 3);
  return (
    <div className="screen">
      <header className="screen__head">
        <h1>Hallo, {ME.name} 👋</h1>
        <p>Bereit für ein neues Gespräch?</p>
      </header>

      <section>
        <div className="rowhead">
          <h2>Für dich vorgeschlagen</h2>
          <button className="link" onClick={() => go("discover")}>
            Alle ansehen →
          </button>
        </div>
        <div className="grid">
          {suggestions.map((p) => (
            <PartnerCard key={p.id} partner={p} onChat={() => go("chats")} />
          ))}
        </div>
      </section>

      <section>
        <h2>Weiter chatten</h2>
        <div className="chatlist">
          {INITIAL_CHATS.map((c) => {
            const p = partnerById(c.partnerId)!;
            const last = c.messages[c.messages.length - 1];
            return (
              <button key={c.id} className="chatrow" onClick={() => go("chats")}>
                <Avatar name={p.name} flag={p.flag} online={p.online} />
                <div className="chatrow__body">
                  <strong>{p.name}</strong>
                  <span>{last.text}</span>
                </div>
                <span className="chatrow__time">{last.time}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* --- Entdecken / Matching ------------------------------------------------ */
export function DiscoverScreen({ go }: { go: (s: Screen) => void }) {
  const [mode, setMode] = useState<ConversationMode | "all">("all");
  const filtered = PARTNERS.filter((p) => mode === "all" || p.modes.includes(mode));

  return (
    <div className="screen">
      <header className="screen__head">
        <h1>Entdecken</h1>
        <p>Finde Gesprächspartner:innen aus aller Welt.</p>
      </header>

      <div className="filters">
        {(["all", "learn", "culture", "english"] as const).map((m) => (
          <button
            key={m}
            className={`chip ${mode === m ? "chip--active" : ""}`}
            onClick={() => setMode(m)}
          >
            {m === "all" ? "Alle" : MODE_LABEL[m]}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <PartnerCard key={p.id} partner={p} onChat={() => go("chats")} />
        ))}
      </div>
    </div>
  );
}

/* --- Chats --------------------------------------------------------------- */
export function ChatsScreen() {
  const [chats, setChats] = useState<ChatPreview[]>(INITIAL_CHATS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const active = chats.find((c) => c.id === activeId) ?? null;
  const partner = active ? partnerById(active.partnerId) : null;

  function send() {
    if (!draft.trim() || !active) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      fromMe: true,
      text: draft.trim(),
      time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
    };
    setChats((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg] } : c)),
    );
    setDraft("");
  }

  // Detail-Ansicht eines Chats
  if (active && partner) {
    return (
      <div className="screen chatview">
        <header className="chatview__head">
          <button className="iconbtn" onClick={() => setActiveId(null)} aria-label="Zurück">
            ←
          </button>
          <Avatar name={partner.name} flag={partner.flag} online={partner.online} />
          <div className="chatview__who">
            <strong>{partner.name}</strong>
            <span>{partner.online ? "online" : "offline"}</span>
          </div>
          <button className="iconbtn" title="Sprachanruf">📞</button>
          <button className="iconbtn" title="Melden">⚑</button>
        </header>

        <div className="chatview__msgs">
          {active.messages.map((m) => (
            <div key={m.id} className={`bubble ${m.fromMe ? "bubble--me" : "bubble--them"}`}>
              {m.text}
              <span className="bubble__time">{m.time}</span>
            </div>
          ))}
        </div>

        <div className="chatview__input">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Nachricht schreiben…"
          />
          <button className="btn btn--primary btn--sm" onClick={send}>
            Senden
          </button>
        </div>
      </div>
    );
  }

  // Liste aller Chats
  return (
    <div className="screen">
      <header className="screen__head">
        <h1>Chats</h1>
        <p>Deine Unterhaltungen.</p>
      </header>
      <div className="chatlist">
        {chats.map((c) => {
          const p = partnerById(c.partnerId)!;
          const last = c.messages[c.messages.length - 1];
          return (
            <button key={c.id} className="chatrow" onClick={() => setActiveId(c.id)}>
              <Avatar name={p.name} flag={p.flag} online={p.online} />
              <div className="chatrow__body">
                <strong>{p.name}</strong>
                <span>{last.text}</span>
              </div>
              <span className="chatrow__time">{last.time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --- Profil -------------------------------------------------------------- */
export function ProfileScreen() {
  return (
    <div className="screen">
      <header className="screen__head">
        <h1>Profil</h1>
      </header>

      <div className="profile">
        <div className="profile__top">
          <Avatar name={ME.name} flag={ME.flag} />
          <div>
            <h2>
              {ME.name} {ME.flag}
            </h2>
            <p className="muted">{ME.country}</p>
          </div>
          <button className="btn btn--ghost btn--sm">Bearbeiten</button>
        </div>

        <section className="profile__block">
          <h3>Ich spreche</h3>
          <div className="tags">
            {ME.speaks.map((s) => (
              <span key={s.label} className="tag tag--learn">
                {s.label} · {s.level}
              </span>
            ))}
          </div>
        </section>

        <section className="profile__block">
          <h3>Ich lerne</h3>
          <div className="tags">
            {ME.learning.map((s) => (
              <span key={s.label} className="tag tag--culture">
                {s.label} · {s.level}
              </span>
            ))}
          </div>
        </section>

        <section className="profile__block">
          <h3>Interessen</h3>
          <div className="tags">
            {ME.interests.map((i) => (
              <span key={i} className="tag">
                {i}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* --- Einstellungen ------------------------------------------------------- */
function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button className={`toggle ${on ? "toggle--on" : ""}`} onClick={() => setOn(!on)}>
      <span className="toggle__label">{label}</span>
      <span className="toggle__track">
        <span className="toggle__knob" />
      </span>
    </button>
  );
}

export function SettingsScreen({
  onOpenPermissions,
  onLogout,
}: {
  onOpenPermissions: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="screen">
      <header className="screen__head">
        <h1>Einstellungen</h1>
      </header>

      <section className="settings__group">
        <h3>Konto</h3>
        <div className="settings__row">E-Mail-Adresse ändern</div>
        <div className="settings__row">Passwort ändern</div>
      </section>

      <section className="settings__group">
        <h3>Benachrichtigungen</h3>
        <Toggle label="Neue Nachrichten" defaultOn />
        <Toggle label="Gesprächs-Vorschläge" defaultOn />
        <Toggle label="E-Mail-News (freiwillig)" />
      </section>

      <section className="settings__group">
        <h3>Berechtigungen & Datenschutz</h3>
        <button className="settings__row settings__row--btn" onClick={onOpenPermissions}>
          Geräte-Berechtigungen verwalten →
        </button>
        <div className="settings__row">Datenschutzerklärung</div>
        <div className="settings__row">Konto löschen</div>
      </section>

      <section className="settings__group">
        <h3>Sicherheit</h3>
        <p className="muted settings__note">
          Konversationen werden anlassbezogen geprüft. Bei Verstößen: Verwarnung, bei
          Wiederholung Sperre – bei Straftat-Verdacht informieren wir die Behörden.
        </p>
      </section>

      <button className="btn btn--ghost logout" onClick={onLogout}>
        Abmelden
      </button>
    </div>
  );
}
