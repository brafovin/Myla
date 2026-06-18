/**
 * Beispiel-Daten (Mock) für den klickbaren App-Prototyp.
 * Später werden diese durch echte Daten aus dem Backend ersetzt.
 */

import type { ConversationMode } from "@myla/shared";

export interface Partner {
  id: string;
  name: string;
  flag: string;
  country: string;
  speaks: string;
  learning: string;
  modes: ConversationMode[];
  bio: string;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
}

export interface ChatPreview {
  id: string;
  partnerId: string;
  messages: ChatMessage[];
}

export const ME = {
  name: "Alex",
  flag: "🇩🇪",
  country: "Deutschland",
  speaks: [
    { label: "Deutsch", level: "Muttersprache" },
    { label: "Englisch", level: "B2" },
  ],
  learning: [
    { label: "Spanisch", level: "A2" },
    { label: "Japanisch", level: "A1" },
  ],
  interests: ["Reisen", "Musik", "Kochen", "Filme", "Fußball"],
};

export const MODE_LABEL: Record<ConversationMode, string> = {
  learn: "Sprache lernen",
  culture: "Kultur",
  english: "Englisch",
};

export const PARTNERS: Partner[] = [
  {
    id: "p1",
    name: "Sofía",
    flag: "🇪🇸",
    country: "Spanien",
    speaks: "Spanisch (Muttersprache)",
    learning: "Deutsch (B1)",
    modes: ["learn", "culture"],
    bio: "Liebe es, über Reisen und Essen zu reden. Helfe dir gern mit Spanisch!",
    online: true,
  },
  {
    id: "p2",
    name: "Yuki",
    flag: "🇯🇵",
    country: "Japan",
    speaks: "Japanisch (Muttersprache)",
    learning: "Englisch (B1)",
    modes: ["culture", "english"],
    bio: "Erzähle dir gern über das Leben in Tokio. Let's talk!",
    online: true,
  },
  {
    id: "p3",
    name: "Lucas",
    flag: "🇧🇷",
    country: "Brasilien",
    speaks: "Portugiesisch (Muttersprache)",
    learning: "Deutsch (A2)",
    modes: ["learn", "english"],
    bio: "Musikfan und Hobbykoch. Üben wir zusammen Sprachen?",
    online: false,
  },
  {
    id: "p4",
    name: "Amélie",
    flag: "🇫🇷",
    country: "Frankreich",
    speaks: "Französisch (Muttersprache)",
    learning: "Spanisch (B1)",
    modes: ["learn", "culture"],
    bio: "Aus Lyon. Ich liebe Kunst und gute Gespräche.",
    online: true,
  },
  {
    id: "p5",
    name: "Min-jun",
    flag: "🇰🇷",
    country: "Südkorea",
    speaks: "Koreanisch (Muttersprache)",
    learning: "Englisch (B2)",
    modes: ["english", "culture"],
    bio: "Gamer und Filmfan. Happy to chat in English.",
    online: false,
  },
  {
    id: "p6",
    name: "Giulia",
    flag: "🇮🇹",
    country: "Italien",
    speaks: "Italienisch (Muttersprache)",
    learning: "Deutsch (B1)",
    modes: ["learn", "culture"],
    bio: "Aus Rom. Frag mich alles über Italien und die Küche!",
    online: true,
  },
];

export function partnerById(id: string): Partner | undefined {
  return PARTNERS.find((p) => p.id === id);
}

export const INITIAL_CHATS: ChatPreview[] = [
  {
    id: "c1",
    partnerId: "p1",
    messages: [
      { id: "m1", fromMe: false, text: "¡Hola Alex! Wie geht's dir heute?", time: "09:12" },
      { id: "m2", fromMe: true, text: "Hola Sofía! Mir geht's gut, danke 😊", time: "09:14" },
      { id: "m3", fromMe: false, text: "Super! Sollen wir heute auf Spanisch üben?", time: "09:15" },
    ],
  },
  {
    id: "c2",
    partnerId: "p2",
    messages: [
      { id: "m1", fromMe: false, text: "Hi! I saw you want to learn about Japan 🇯🇵", time: "Gestern" },
    ],
  },
  {
    id: "c3",
    partnerId: "p4",
    messages: [
      { id: "m1", fromMe: true, text: "Bonjour Amélie! Comment ça va?", time: "Mo" },
      { id: "m2", fromMe: false, text: "Ça va très bien, merci ! Et toi ?", time: "Mo" },
    ],
  },
];
