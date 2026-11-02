# Warsaw event search

Personal assistant project: find events in Warsaw, report only new ones since the last run.

## Files
- `sources.md` – websites to check (you maintain it)
- `preferences.md` – what the user likes (you maintain it)
- `state/seen.json` – ledger of every event already reported. Keys are event ids, values `{title, date, venue, url, firstSeen, reported}`
- `reports/YYYY-MM-DD.md` – one report per run

## Daily run procedure (`/search-events`)
1. Read `preferences.md`, `sources.md`, `state/seen.json`.
2. For each active source, fetch it (WebFetch / web-fetch agent; WebSearch for gaps) and extract events in the look-ahead window. Run sources in parallel where possible.
3. Normalize each event: title, date+time, venue, price, url, one-line description.
4. Event id = `slugified-title|YYYY-MM-DD|slugified-venue`. Treat the same event listed on several sources as one (merge urls).
5. New = id not in `seen.json`. Drop ones that clash with "Not interested"/constraints (still record them in the ledger with `reported: false`).
5b. Ledger keeps everything found (any date ahead). Reports show only events within the next 14 days (see preferences.md) plus rare booking-required exceptions; events beyond 14 days stay `reported: false` and surface when they enter the window.
6. Rank new ones by fit with preferences. Write `reports/YYYY-MM-DD.md` (top N per preferences, grouped by date, with link and why it fits).
7. Add ALL new events to `seen.json` and set `lastRun`. Prune events whose date is >14 days past.
8. Update `sources.md` (last checked, status, newly discovered sources).
8b. Run `node web/build.js` to regenerate `web/index.html` (day tabs, score-sorted tiles; fills missing `score`/`description` in the ledger; edit those fields in `seen.json` or the tables in `web/build.js` to improve them).
9. Reply with the report summary. If nothing is new, say so in one line.

## Rules
- Never invent events or dates; if a date is unclear, say so and link the source.
- Don't re-report events already in the ledger, unless date/venue changed or it's cancelled (flag as "UPDATED").
- Facebook and login-walled pages can't be fetched; don't list them as active.
- Keep reports short and scannable.
