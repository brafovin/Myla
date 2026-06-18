# Datenschutz, Altersprüfung & Behörden

> **Hinweis:** Dieses Dokument fasst die rechtlich relevanten Anforderungen aus
> Produktsicht zusammen. Es ist **keine Rechtsberatung**. Vor dem Live-Gang muss eine
> qualifizierte juristische Prüfung (Datenschutz, Jugendschutz, Strafrecht) erfolgen.

## 1. Datenschutz (DSGVO)

CoKomi verarbeitet personenbezogene Daten und private Konversationen. Grundsätze:

- **Datenminimierung** – nur erheben/speichern, was nötig ist.
- **Zweckbindung** – Daten nur für angegebene Zwecke (Betrieb, Sicherheit, Moderation).
- **Transparenz** – verständliche Datenschutzhinweise; klar kommuniziert, dass
  Konversationen anlassbezogen geprüft werden können.
- **Speicherbegrenzung** – Lösch-/Aufbewahrungsfristen definieren (z. B. Inhalte nach X
  Tagen löschen, Moderations-Logs länger aufbewahren, soweit rechtlich zulässig/geboten).
- **Betroffenenrechte** – Auskunft, Berichtigung, Löschung, Datenexport ermöglichen.
- **Sicherheit** – Verschlüsselung in Transit (TLS) und at Rest; Zugriffskontrolle;
  Audit-Logs für Moderations-/Admin-Handlungen.
- **AVV/Auftragsverarbeitung** – Verträge mit Hosting-/Dienstleistern.

### Spannungsfeld Vertraulichkeit ↔ Moderation
Private Chats genießen Vertraulichkeit. Eine anlassbezogene Prüfung (nach Meldung oder
Signal) ist möglich, wenn sie **angekündigt, verhältnismäßig und dokumentiert** ist.
Flächendeckendes, anlassloses Mitlesen ist zu vermeiden.

## 2. Altersprüfung (18+)

Ziel: **Kein Zugang für unter 18-Jährige** – zum Schutz vor Missbrauch (z. B.
Anbahnung/Entführung). Optionen (von schwach zu stark):

1. **Selbstauskunft + Geburtsdatum** (schwach; leicht zu umgehen) – Minimum.
2. **Ausweis-/Dokumentenprüfung** über einen spezialisierten Verifizierungsdienst
   (stärker; datenschutzkonform mit Drittanbieter, der nur „18+: ja/nein" zurückgibt).
3. **Bank-/eID-basierte Verifizierung** (stark).

Empfehlung: Start mit Selbstauskunft, **vor produktivem Betrieb** auf eine echte
Verifizierung (Stufe 2/3) heben. Das Geburtsdatum wird geprüft, aber es wird nur das
Ergebnis („volljährig") dauerhaft benötigt – Datenminimierung beachten.

## 3. Meldung an die Polizei

Bei Verdacht auf eine **Straftat** wird die Polizei informiert (vgl.
[`MODERATION.md`](MODERATION.md)). Anforderungen:

- **Rechtsgrundlage** prüfen: Wann *darf*/*muss* gemeldet werden? (z. B. drohende
  schwere Straftaten). Juristische Klärung pro Rechtsraum nötig.
- **Beweissicherung** – relevante Inhalte revisionssicher und unverändert sichern
  (Zeitstempel, Beteiligte, Verlauf), bevor etwas gelöscht wird.
- **Definierter Prozess** – wer entscheidet, wer übergibt, an welche Stelle, wie
  dokumentiert. Vier-Augen-Prinzip empfohlen.
- **Datenübergabe minimal & sicher** – nur das für den Fall Erforderliche.
- **Dokumentation** – jede Behördenmeldung wird im Audit-Log festgehalten.

## 4. Weitere Pflichten (zu klären vor Launch)

- **Impressum & AGB**, **Datenschutzerklärung**.
- **Jugendschutz** (Altersfreigabe, Schutzkonzept).
- **Meldewege/Notice-and-Action** gemäß einschlägiger Plattformregeln (z. B. DSA in der EU).
- **Aufbewahrungs- und Löschkonzept**.

## 5. Umsetzung im Code (Bezug zum Datenmodell)

Das Datenmodell (siehe [`ARCHITEKTUR.md`](ARCHITEKTUR.md)) bildet diese Anforderungen ab:

- `User.isAdult` / Altersverifizierungs-Status,
- `Report`, `ModerationCase`, `Warning`, `Ban` für den Eskalationsprozess,
- `AuditLogEntry` für revisionssichere Protokollierung,
- `PoliceReport` als dokumentierte Behördenmeldung.
