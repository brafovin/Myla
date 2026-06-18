/**
 * Gemeinsame Domänen-Typen für Myla.
 *
 * Diese Typen werden von Backend und Frontend geteilt, damit beide Seiten
 * dasselbe Datenmodell verwenden. Sie spiegeln das Konzept aus docs/ wider:
 * Sprach-/Kulturaustausch, Volljährigkeit (18+) und der Moderations-Eskalations-
 * prozess (Verwarnung → Sperre → Polizei).
 */

// ---------------------------------------------------------------------------
// Sprache & Kultur
// ---------------------------------------------------------------------------

/** Gemäßigtes Niveau nach GER (Gemeinsamer Europäischer Referenzrahmen). */
export type LanguageLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";

/** ISO-639-1-Sprachcode, z. B. "de", "en", "es". */
export type LanguageCode = string;

/** ISO-3166-1-alpha-2-Ländercode, z. B. "DE", "US", "ES". */
export type CountryCode = string;

export interface LanguageSkill {
  language: LanguageCode;
  level: LanguageLevel;
}

/** Modus einer Unterhaltung – siehe docs/KONZEPT.md §3.1. */
export type ConversationMode =
  | "learn" // Sprache lernen (Tandem)
  | "culture" // Kultur entdecken
  | "english"; // einfach reden auf Englisch

// ---------------------------------------------------------------------------
// Nutzer & Rollen
// ---------------------------------------------------------------------------

export type UserRole = "member" | "moderator" | "admin";

/** Kontostatus im Rahmen des Eskalationsprozesses. */
export type AccountStatus =
  | "active" // normal nutzbar
  | "warned" // verwarnt (1. Verstoß), weiterhin nutzbar
  | "banned"; // gesperrt (Wiederholung) – abgemeldet

/** Status der Altersprüfung (18+). Siehe docs/DATENSCHUTZ_UND_RECHT.md §2. */
export type AgeVerificationStatus =
  | "unverified"
  | "self_declared"
  | "verified";

export interface User {
  id: string;
  displayName: string;
  email: string;
  country?: CountryCode;
  /** Sprachen, die die Person spricht. */
  speaks: LanguageSkill[];
  /** Sprachen, die die Person lernen möchte. */
  learning: LanguageSkill[];
  interests: string[];
  role: UserRole;
  /** Ergebnis der Altersprüfung – nur Volljährige (true) dürfen teilnehmen. */
  isAdult: boolean;
  ageVerification: AgeVerificationStatus;
  accountStatus: AccountStatus;
  /** Zahl der bestätigten Verstöße – steuert die Eskalation. */
  violationCount: number;
  createdAt: string; // ISO-8601
}

// ---------------------------------------------------------------------------
// Konversationen & Nachrichten
// ---------------------------------------------------------------------------

export interface Conversation {
  id: string;
  participantIds: [string, string]; // 1:1
  mode: ConversationMode;
  /** Sprache, in der primär kommuniziert wird (z. B. Lernsprache oder "en"). */
  primaryLanguage: LanguageCode;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  /** Wurde diese Nachricht gemeldet? */
  reported: boolean;
}

// ---------------------------------------------------------------------------
// Moderation & Eskalation – siehe docs/MODERATION.md
// ---------------------------------------------------------------------------

export type ReportReason =
  | "harassment"
  | "hate_speech"
  | "spam"
  | "sexual_content"
  | "threat"
  | "criminal_suspicion" // Verdacht auf Straftat
  | "other";

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  conversationId: string;
  messageId?: string;
  reason: ReportReason;
  details?: string;
  createdAt: string;
}

export type ModerationSeverity = "low" | "medium" | "high";

export type ModerationCaseStatus =
  | "open"
  | "in_review"
  | "resolved";

/** Mögliche Entscheidung einer menschlichen Prüfung. */
export type ModerationDecision =
  | "no_violation"
  | "warning"
  | "ban"
  | "ban_and_police";

export interface ModerationCase {
  id: string;
  reportId?: string;
  subjectUserId: string;
  conversationId: string;
  severity: ModerationSeverity;
  status: ModerationCaseStatus;
  decision?: ModerationDecision;
  /** Begründung der Entscheidung (Pflicht bei Entscheidung). */
  rationale?: string;
  /** Welche:r Moderator:in den Fall entschieden hat. */
  decidedBy?: string;
  createdAt: string;
  decidedAt?: string;
}

export interface Warning {
  id: string;
  userId: string;
  caseId: string;
  reason: string;
  createdAt: string;
}

export interface Ban {
  id: string;
  userId: string;
  caseId: string;
  reason: string;
  /** undefined = unbefristet. */
  until?: string;
  createdAt: string;
}

/** Dokumentierte Meldung an die Polizei. Siehe docs/DATENSCHUTZ_UND_RECHT.md §3. */
export interface PoliceReport {
  id: string;
  caseId: string;
  subjectUserId: string;
  summary: string;
  /** Referenzen auf gesicherte Beweis-Nachrichten. */
  evidenceMessageIds: string[];
  createdAt: string;
  filedBy: string;
}

/** Revisionssichere Protokollierung sicherheitsrelevanter Aktionen. */
export interface AuditLogEntry {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  meta?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// API-Hilfstypen
// ---------------------------------------------------------------------------

export interface ConceptInfo {
  name: string;
  tagline: string;
  modes: { id: ConversationMode; title: string; description: string }[];
  minAge: number;
}
