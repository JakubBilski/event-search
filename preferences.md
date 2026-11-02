# My preferences

Claude: read this before every search and use it to filter and rank. When the user states a new
like/dislike in conversation, update this file immediately. When they react to a report
("not into X", "more like Y"), record it under "Learned".

## Interests (want to see)
- Music, cinema, theatre, opera
- Lectures, meetings/talks with known people (authors, public figures)
- Academia (university events, seminars, conferences open to public)
- Ecology and leftist/social movements
- Taste is hard to define; user wants to refine it by reacting to concrete reports. Ask for quick feedback on each report.

## Venues the user went to and liked (use as taste anchors)
- Bardzo Bardzo (https://www.bardzobardzo.pl/)
- Bar Studio (https://barstudio.pl/)
- Kawiarnia Południk Zero (https://www.facebook.com/kawiarniaPoludnikZero/events) – Facebook only

## Learned
- 2026-11-02: parties and DJ nights are welcome (don't filter them out).
- 2026-11-02: skip theatre for now (paused, not disliked). Focus next on left/social-movement events.
- 2026-11-02: Facebook use: user asked about ban risk; no decision yet on enabling it.

- 2026-11-02: avoid political parties (e.g. Razem, Lewica, Zieloni); movements, collectives, social centres, talks are OK.
- 2026-11-02: Facebook: user OK'd Chrome access; keep interactions minimal; find Facebook page URLs via outside search, not Facebook search.

## Not interested
- Political parties and their events (hide)
- (not set yet)

## Constraints
- Location: Warsaw (and nearby only if exceptional)
- Budget: (not set)
- Days/times: (not set)
- Language: Polish or English events both OK (not confirmed)

## Venue decisions (2026-11-02)
- Excluded permanently: Odessa Club (disco latino), Pożyteczna. Skip: Progresja, Klub Politechnik (user is WUT lecturer), Syrena (theatre), Chmury (for now), Plakaton (shop), Jaś Kowalski (bar).
- Liked venues: Pardon, To Tu; Klub Spatif.

## Scoring: recommendation by judgement (2026-11-02)
Nothing is excluded from the website; events are ranked. Claude judges each NEW event 0–10 against the taste guide below (directions, not formulas), batched compactly, one judgement per distinct title+venue, stored in the ledger as `score` with `scoredBy: "vibes-<date>"`. Already-judged events are never re-judged. Keyword rules in `web/build.js` are only a fallback (`scoredBy: "heuristic"`) and must be replaced by a real judgement.

Taste guide (user's own numbers, approx):
- Leftist events (e.g. Festiwal Myśli Abstrakcyjnej): ~9. Lectures: 8 if leftist or artsy, otherwise lower.
- Jazz: high (7–9). Electronic: ok; techno ~6. Parties/DJ nights fine.
- Films: artsy/underground (even famous ones like Naza) high ~8; mainstream ~3. Old films ~1. Events for old people (not music/party-like): ~1. Silent films with live music in between.
- Ballet, philharmonic, recitals: 6, would be 8 with guaranteed tickets (booking matters). Opera similar.
- Planetarium events: 6, unless for children.
- Comedy nights: 4. Stand-ups: 1. Family/children's events: 1.
- Vernissages / exhibition openings: baseline ~4; bonus (+2 to +4) if leftist, social-critical, feminist, decolonial, ecological or otherwise politically engaged art. Museums added as sources: Muzeum Narodowe w Warszawie, Muzeum Sztuki Nowoczesnej (2026-11-02).
- Nowa Miodowa (added 2026-11-02): classical music, jazz and soul there = baseline 7; anything else there ~5. Booking still matters (+1 if tickets are guaranteed/available).
- Theatre: paused (low). Political parties: avoid. Excluded venues: Odessa, Pożyteczna.

## Report settings
- Collect (ledger): everything found, as far ahead as sources show. Backend keeps all of it.
- Show in reports: only events in the next 14 days.
- Exception (later, once preferences are learned): very interesting events further out that need booking/tickets in advance.
- Max events per report: 20, ranked by fit

## Learned
