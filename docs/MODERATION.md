# Moderation & Eskalation

Myla setzt auf **menschliche Prüfung**: Auffällige oder gemeldete Konversationen werden
von geschulten Moderator:innen bewertet. Ziel ist Schutz der Nutzer:innen – besonders die
Verhinderung von Straftaten – bei gleichzeitig fairem, transparentem Verfahren.

## 1. Auslöser einer Prüfung

Eine Konversation gelangt in die **Prüf-Warteschlange (Review Queue)**, wenn:

1. ein:e Nutzer:in eine Nachricht oder Person **meldet** (Meldegrund auswählen), oder
2. einfache, transparente **Wortlisten-/Muster-Signale** anschlagen
   (z. B. Hinweise auf Gewalt, sexuellen Missbrauch, Menschenhandel, Drohungen).
   → Diese Signale **markieren** nur; die **Entscheidung trifft immer ein Mensch**.

> Hinweis: Eine automatische Inhalts-KI ist **nicht** Teil dieses Konzepts (Entscheidung:
> menschliche Prüfung). Muster-Signale dienen nur dazu, Prüffälle zu priorisieren.

## 2. Schweregrade

| Stufe | Beispiele | Reaktion |
|---|---|---|
| **Niedrig** | Unhöflichkeit, Spam, leichte Regelverstöße | Hinweis / Verwarnung |
| **Mittel** | Belästigung, Hassrede, wiederholtes Fehlverhalten | Verwarnung, ggf. temporäre Sperre |
| **Hoch (Straftat-Verdacht)** | Sexueller Missbrauch, Bedrohung, Entführungs-/Menschenhandel-Hinweise | Sperre **und** Information der Polizei |

## 3. Eskalationsstufen (Kernregel des Auftrags)

```
Verstoß festgestellt
        │
        ▼
   1. VERWARNUNG  ──────────────► Nutzer:in wird informiert, Vorfall dokumentiert
        │
        │  erneuter Verstoß
        ▼
   2. SPERRE (Account deaktiviert)
        │
        │  bei Verdacht auf Straftat
        ▼
   3. POLIZEI INFORMIEREN  (rechtssichere Datenübergabe, dokumentiert)
```

- **Erster Verstoß:** Verwarnung. Die Person wird über den Grund informiert.
- **Erneuter Verstoß:** Sperre des Kontos (Abmeldung von der App).
- **Bei Verdacht auf eine Straftat:** zusätzlich Meldung an die Polizei – siehe
  [`DATENSCHUTZ_UND_RECHT.md`](DATENSCHUTZ_UND_RECHT.md) für die rechtlichen Anforderungen.

> Wichtig: Bei schweren Straftaten (z. B. konkrete Gefahr für Leib/Leben, Hinweise auf
> Entführung/Menschenhandel) kann die **Polizei sofort** informiert werden – ohne die
> Verwarnungsstufe abzuwarten. Sicherheit hat Vorrang.

## 4. Moderations-Workflow

1. **Eingang** – Fall landet in der Review Queue mit Kontext (gemeldete Nachrichten,
   Verlauf-Ausschnitt, Meldegrund, bisherige Verstöße der Person).
2. **Sichtung** – Moderator:in prüft den Fall, sieht die nötigen (und nur die nötigen)
   Inhalte.
3. **Entscheidung** – eine von: *kein Verstoß*, *Verwarnung*, *Sperre*, *Sperre + Polizei*.
4. **Dokumentation** – Entscheidung, Begründung, Zeitpunkt und handelnde Person werden
   revisionssicher protokolliert (Audit-Log).
5. **Benachrichtigung** – Betroffene:r erhält eine verständliche Mitteilung (außer wenn
   eine Vorwarnung Ermittlungen gefährden würde – dann nach Behörden-Rücksprache).
6. **Einspruch** – Betroffene können einer Verwarnung/Sperre widersprechen; ein:e zweite:r
   Moderator:in/Admin prüft erneut.

## 5. Datenschutz beim Moderieren

- Moderator:innen sehen Inhalte **nur anlassbezogen** (nach Meldung/Signal), nicht
  flächendeckend in Echtzeit. Kein unbegründetes Mitlesen.
- **Datenminimierung:** nur der für die Entscheidung nötige Ausschnitt.
- Alle Moderationshandlungen sind **protokolliert** und nachvollziehbar.
- Nutzer:innen werden in den AGB/Datenschutzhinweisen **klar darüber informiert**, dass
  Konversationen anlassbezogen geprüft werden können.

## 6. Statusmodell eines Falls

```
OFFEN → IN_PRÜFUNG → ENTSCHIEDEN
                         ├─ KEIN_VERSTOSS
                         ├─ VERWARNUNG
                         ├─ GESPERRT
                         └─ GESPERRT_UND_POLIZEI
```
