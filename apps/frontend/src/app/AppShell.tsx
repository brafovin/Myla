import { useState } from "react";
import "./app.css";
import {
  StartScreen,
  DiscoverScreen,
  ChatsScreen,
  ProfileScreen,
  SettingsScreen,
  type Screen,
} from "./screens.js";
import { ME } from "./mock.js";

const NAV: { id: Screen; icon: string; label: string }[] = [
  { id: "start", icon: "🏠", label: "Start" },
  { id: "discover", icon: "🧭", label: "Entdecken" },
  { id: "chats", icon: "💬", label: "Chats" },
  { id: "profile", icon: "👤", label: "Profil" },
  { id: "settings", icon: "⚙️", label: "Einstellungen" },
];

export function AppShell({
  onOpenPermissions,
  onLogout,
}: {
  onOpenPermissions: () => void;
  onLogout: () => void;
}) {
  const [screen, setScreen] = useState<Screen>("start");

  return (
    <div className="myla-app">
      {/* Seitenleiste (Desktop/Laptop) */}
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <img src="/myla-logo.svg" alt="" className="brand__logo" />
          <span>Myla</span>
        </div>
        <nav className="app-sidebar__nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`navitem ${screen === item.id ? "navitem--active" : ""}`}
              onClick={() => setScreen(item.id)}
            >
              <span className="navitem__icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="app-sidebar__me" onClick={() => setScreen("profile")}>
          <span className="me-avatar">{ME.name.charAt(0)}</span>
          <span>{ME.name}</span>
        </button>
      </aside>

      {/* Inhaltsbereich */}
      <main className="app-main">
        {screen === "start" && <StartScreen go={setScreen} />}
        {screen === "discover" && <DiscoverScreen go={setScreen} />}
        {screen === "chats" && <ChatsScreen />}
        {screen === "profile" && <ProfileScreen />}
        {screen === "settings" && (
          <SettingsScreen onOpenPermissions={onOpenPermissions} onLogout={onLogout} />
        )}
      </main>

      {/* Untere Leiste (Handy) */}
      <nav className="app-bottomnav">
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`bottomitem ${screen === item.id ? "bottomitem--active" : ""}`}
            onClick={() => setScreen(item.id)}
          >
            <span className="bottomitem__icon">{item.icon}</span>
            <span className="bottomitem__label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
