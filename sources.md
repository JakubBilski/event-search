# Event sources (Warsaw)

Maintained by Claude. Each run: check every `active` source; update `Last checked` and `Status`.
If a source fails 3 runs in a row, set it to `broken` and mention it in the report.
Add new sources when a run discovers good ones (tell the user in the report). Never delete — mark `dropped` with a reason.

| Source | URL | Type | Status | Last checked | Notes |
|---|---|---|---|---|---|
| BARdzo bardzo | https://www.bardzobardzo.pl/upcoming-events/ | venue (music club) | active | 2026-11-06 | user's favourite; 21 events, no prices/descriptions on listing |
| Teatr Studio (repertuar) | https://teatrstudio.pl/repertuar | venue (theatre) | active | 2026-11-06 | Bar Studio is inside it; Dec view: /pl/repertuar/?month=12-2026; prices only on event pages |
| Bar Studio | https://barstudio.pl/ | venue (bar) | no-events | 2026-11-02 | no program on site; use Teatr Studio instead; Facebook: facebook.com/barstudio.warszawa |
| Teatr Wielki – Opera Narodowa | https://teatrwielki.pl/kalendarium/ | venue | active | 2026-11-06 | month view: /kalendarium/data/2026/12/ ; no prices on list |
| Nowa Miodowa (ZPSM Nr 1 concert hall, Rakowiecka 21) | https://nowamiodowa.pl/pl/kalendarz | venue (classical/organ/chamber) | active | 2026-11-06 | user-added; 16 events ledgered (Nov 2026–Mar 2027; Apr 2027 has 2 more unread); server-rendered, titles+dates+times only (19:00), no prices/genre on list, details on /pl/wydarzenie/<slug>; one month per view: /pl/kalendarz/2026?month=grudzien (slugs: styczen…grudzien); 7 events in Nov (Paderewski Festival, organ concerts, Eufonie series, Wieniawski laureate recital) |
| Smolna 38 (club, Smolna 38) | https://smolna38.org/events/upcoming | venue (club nights, techno/electronic) | active | 2026-11-06 | user-added 2026-11-06; 8 events 6–27 Nov, all 22:00, Basement/Patio/Jungle rooms; no prices on list; years inferred |
| Kultura Warszawa (city) | https://kultura.um.warszawa.pl/kalendarz | official | active | 2026-11-06 | 90 results all read via ?delta=75 (start=1,2); good cross-venue sweep incl. Nowy Teatr, Big Book Cafe, UCK Alternatywy, theatre premieres |
| Uniwersytet Warszawski calendar | https://www.uw.edu.pl/events/event/on/2026/11/ | academia | active | 2026-11-06 | no times/venues on list; home widget only; read monthly page next time |
| Jasna 10 / Krytyka Polityczna Warsaw | https://warszawa.krytykapolityczna.pl/kalendarz/ | left/culture | active | 2026-11-06 | 0 events in Nov 2026 |
| IR2 – Instytut Reportażu | https://ir2.info/events/ | talks/books | active | 2026-11-06 | user-suggested; calendar Sep 2026–Mar 2027; mostly at Faktyczny Dom Kultury, Gałczyńskiego 12; book launches, reportage workshops; no prices on list |
| CSW Zamek Ujazdowski | https://u-jazdowski.pl/wydarzenia | art/cinema/talks | active | 2026-11-06 | user-suggested; weekly calendar via ?ut=<unix ts> param; only weeks to 15 Nov read; film, concerts, discussions, exhibitions |
| Festiwal Myśli Abstrakcyjnej (FMA) | https://www.fma.waw.pl/ | festival (class/left theory) | watch | 2026-11-02 | user-suggested; 11th ed. was 21-25 Oct 2026 at Komuna; check yearly ~Oct + summer "kolonie" (/kolonie); Instagram: festiwalmysliabstrakcyjnej; organiser Dziki Bez (halo@dzikibez.pl) |
| Dom Spotkań z Historią (DSH) | https://dsh.waw.pl/pl/wydarzenia | history/talks/film | active | 2026-11-06 | best left-adjacent fetchable source; clean dated list; shows one month at a time (re-check early Dec) |
| Muzeum Warszawy (+ Muzeum Woli, Izba Pamięci) | https://muzeumwarszawy.pl/wydarzenia/ | museum | active | 2026-11-06 | one month at a time; "Debaty o współczesnym świecie" series |
| Fundacja Batorego | https://www.batory.org.pl/wydarzenia/ | NGO | low-value | 2026-11-06 | mostly online/non-Warsaw NGO training |
| Ośrodek KARTA | https://karta.org.pl/aktualnosci | history/NGO | active | 2026-11-06 | no Warsaw events in window |
| Krytyka Polityczna events | https://krytykapolityczna.pl/o-nas/spotkajmy-sie/ | left | active | 2026-11-06 | nationwide list, filter to Warsaw; loads dynamically; Prześniona café: krytykapolityczna.pl/przesniona/ |
| Razem | https://partiarazem.pl | left party | blocked | 2026-11-02 | no events list; weekly newsletter + social only |
| Rosa Luxemburg Foundation PL | https://www.rosalux.pl/ | left | low-value | 2026-11-02 | no Warsaw events lately |
| Left/eco movement groups (Zieloni, Czerwone Kropki, Obóz dla Puszczy, XR, Fed. Anarchistyczna, Wolna Biblioteka, Pożyteczna, Syrena, Cafe Kryzys) | – | movements | blocked | 2026-11-02 | Facebook/Instagram only or site fetch failed (pozyteczna.pl 403, zieloni.pl cert error) |
| Muzeum Narodowe w Warszawie | https://mnw.pl/wydarzenia | museum | active | 2026-11-06 | www.mnw.art.pl redirects to mnw.pl; list unsorted, ?page=N, only pp.1-8 read, Dec/Jan unverified; no prices (ticket status only); exhibitions /wystawy; mostly workshops/tours, few talks (Eksperckim okiem) |
| Muzeum Sztuki Nowoczesnej | https://artmuseum.pl/pl/program | museum (contemporary art) | active | 2026-11-06 | /pl/wydarzenia is cinema only; /pl/program shows rolling ~6 days (3-8 Nov seen), re-check weekly; /pl/wystawy-aktualne for exhibitions; banner said closed, verify; talks/debates fit well |
| Radykalny Relaks (Facebook) | https://www.facebook.com/profile.php?id=100078104326766&sk=events | venue (sauna/massage salon, Wawer) | active (Chrome) | 2026-11-02 | user-added; 1 upcoming event only; Rubinowa 5, Wawer; IG radykalny_relaks |
| Komuna Warszawa | https://komuna.warszawa.pl/ | venue (theatre/discussions) | to-add | 2026-11-06 | hosts FMA; user paused theatre but it hosts talks |
| Greenpeace Polska | https://www.greenpeace.org/poland/ | ecology | low-value | 2026-11-02 | no events section, news only |
| Kawiarnia Południk Zero (Facebook) | https://www.facebook.com/kawiarniaPoludnikZero/events | venue | active (Chrome) | 2026-11-02 | works via Claude in Chrome (get_page_text); user logged in; one page load, no checkpoint. Cards lack links/prices. Only read after user OKs each Facebook source |
| GoOut Warszawa | https://goout.net/pl/warszawa/ | aggregator | blocked | 2026-11-02 | JS-rendered; fetch returns shell only |
| POLIN | https://polin.pl/events/program | venue | blocked | 2026-11-02 | HTTP 403 for fetcher |
| Bilety24 | https://www.bilety24.pl/ | ticketing | partial | 2026-11-06 | homepage only; surfaced Eufonie concerts with prices; no jazz/talks category found |
| eBilet | https://www.ebilet.pl/ | ticketing | active | never | seed, unverified |
| Meetup Warsaw | https://www.meetup.com/find/?location=pl--Warsaw | community | low-value | 2026-11-06 | mostly language/networking meetups; venues not shown |
| Warszawa w Pigułce | https://warszawawpigulce.pl/ | news/events | low-value | 2026-11-06 | news feed only, no events list reachable |

## Run notes 2026-11-06
- Partial reads to finish next time: CSW (only weeks to 29 Nov, weekly pages give no per-day dates), MSN (6–12 Nov only), MNW (pages 1–2 of 742), Karta (page 1 of 82), Batory (page 1 of 23), Teatr Studio/Teatr Wielki/Nowa Miodowa/Komuna (Jan 2027 not fetched), Kino Elektronik (only 6–7 Nov), Kino Iluzjon regular screenings summarised not listed.
- Hybrydy page is a combined calendar for Hybrydy + Klub Proxima + Palladium (to Oct 2027).

## Venue sites tested 2026-11-02 (full pass)
| Venue | URL | Status | Notes |
|---|---|---|---|
| Pardon, To Tu | https://pardontotu.pl/program/ | active | BEST: server-rendered; jazz/experimental + free talks; FB facebook.com/pardontotu, IG pardontotu |
| Kino Iluzjon | https://www.iluzjon.fn.org.pl/repertuar.html | active | server-rendered; covers ~3 weeks; free lectures, club screenings with discussion; FB kinoiluzjon |
| Hybrydy | https://hybrydy.pl/category/events/ | active | server-rendered; mostly concerts (indie/alt); times look early, verify |
| Jassmine (jazz club, Wilcza 73) | https://jassmine.com/koncerty/ | active | BEST for jazz: server-rendered, 26 concerts, full list; event pages /concert/<slug>/ have prices; FB jassmine warsaw (facebook.com/jassminewarsaw); found via web search |
| Kino Muranów | https://kinomuranow.pl/repertuar | active | no www; server-rendered but page >39k chars so fetch ?day pages or /festiwale-i-przeglady; guests/intros marked in titles |
| Komuna Warszawa | https://komuna.warszawa.pl/ | active (mostly theatre) | server-rendered; /kalendarz/ not read; user paused theatre; FB komunawarszawa |
| Chmury | https://www.ebilet.pl/miejsce/chmury | eBilet only | Google Maps website = facebook.com; no own site |
| Akwarium Klub | – | dropped | Maps: temporarily closed, FB only |
| Niebo (Nowy Świat 21, ex Club Stereo?) | – | to-check | seen on Songkick |
| ADA Puławska | https://goout.net/pl/ada-pulawska/vzahoc/ | blocked | blog adapulawska.noblogs.org does not resolve; goout events JS-only; needs Facebook |
| Kino Elektronik | https://kinoelektronik.pl/ | partial | one day per page via ?b24_day=YYYY-MM-DD; need loop over days; FB kinoelektronik |
| Kulturalna (PKiN) | https://kulturalna.pl/ | broken | site under reconstruction; FB CafeKulturalna (not visited) |
| Hydrozagadka, Odessa Club | – | dropped | hydrozagadka.pl and odessa.com.pl are other cities; real Warsaw venues need other sites |
| Tygmont | – | broken | tygmont.pl domain for sale |
| Chmury, Jassmine, Klub Stereo, Komuna, Jazz Klub Drukarnia, ADA Puławska, Kino Muranów, Plakaton, Klub Politechnik | – | unknown | guessed domains failed; need web search to find real sites. Chmury via eBilet /miejsce/chmury works |
| eBilet slugs that work | /muzyka/jazz-blues/miasto/warszawa, /muzyka/rock/..., /muzyka/elektro-techno/..., /biznes/miasto/warszawa, /miejsce/bardzo-bardzo, /miejsce/chmury | active | no cinema category (404); most cards lack venue/time/price |

## User decisions on venues (2026-11-02)
| Venue | Decision |
|---|---|
| Odessa Club | EXCLUDED permanently (disco latino) |
| Pożyteczna | EXCLUDED permanently, from all lists |
| Plakaton | skip (just a shop) |
| Jaś Kowalski Klub | skip (just a bar) |
| Jazz Klub Drukarnia | skip (may no longer exist) |
| Klub Politechnik | skip (user lectures at WUT) |
| Progresja | skip |
| Syrena | skip (theatre, paused) |
| Chmury | skip for now (Facebook only, posters as shorts); eBilet page still works if wanted later |
| Niebo | https://klubniebo.pl/wydarzenia/ – ACTIVE, server-rendered, 40 events, times shown, no prices |
| Hydrozagadka | https://www.klubhydrozagadka.com/hydrozagadka-koncerty/ – ACTIVE, 47 events, dates+titles only, may be truncated; mostly metal/punk/pop |
| Klub Spatif | https://klubspatif.pl/wydarzenia/ – PARTIAL: embeds FB weekly posts (cached), no structured events; Wed JazzState jam |
| Stodoła | https://www.stodola.pl/koncerty – ACTIVE, 120 events incl. other cities (filter "Klub Stodoła, Warszawa"), mainstream |
| Jasna 1 | https://jasna1.com/ – ACTIVE, 12 events on home, /events/ full list; techno/club |
| Krytyka Polityczna Warszawa | https://warszawa.krytykapolityczna.pl/kalendarz/ – ACTIVE, server-rendered, 0 events Nov 2026; ?miesiac=N for other months |
| Pardon, To Tu | events also on main page https://pardontotu.pl/ (user likes) |

## Aggregators / directories (discovered 2026-11-02)
| Source | URL | Status | Notes |
|---|---|---|---|
| eBilet – Warsaw | https://www.ebilet.pl/miasto/warszawa | active | server-rendered; category pages `/{category}/miasto/warszawa` (muzyka, teatr, klasyka...); venue pages `/miejsce/{slug}` (e.g. /miejsce/chmury: 5 upcoming, prices); venue index `/miejsce` (not read yet). Ticketed events only |
| Bilety24 | https://www.bilety24.pl | active | server-rendered; city filter "Warszawa", categories, prices; venue index `/obiekty` (not read yet) |
| PIK Warszawa | https://pik.warszawa.pl | active | city-culture portal; day pages `/2026/11/02/`; categories `/muzyka/koncert/`, `/kino/`, `/art/wystawa/`; venue index `/miejsca/` (not read yet) |
| Warsaw Insider | https://warsawinsider.pl/events/ | low-value | editorial English articles, not a structured list |
| GoOut venue list | https://goout.net/pl/warszawa/miejsca/lvzclemkk/ | blocked | events JS-only; venue headers render only |
| Resident Advisor | https://ra.co/events/pl/warsaw | blocked | 403 |
| Music of Our Desire venues | https://events.musicofourdesire.com | blocked | 403 |
| Kupbilet | https://www.kupbilet.pl | dropped | no Warsaw listing |

## Venue candidates (from searches; not yet verified as sources)
Music/club: Chmury (Praga, 11 Listopada 22; club-café, near-daily underground concerts/DJ; eBilet page works), Pardon To Tu (Plac Grzybowski), Hydrozagadka (Praga), Jasna 1 (electronic), Stodoła, Progresja, Tygmont (jazz), Jaś Kowalski Klub, Jazz Klub Drukarnia, Plakaton (record shop with jazz), Odessa Club, Klub Stereo, Jassmine Club (jazz festival), MOXO (Norblin), Nowy Świat Muzyki.
Social/community: Kulturalna (PKiN, club-café/świetlica), ADA Puławska 37 (non-commercial social/cultural space; goout page), Chłodna 25 (lost licence, historic hub), Komuna Warszawa, Księgarnia Artystyczna (book club), KawiArka, LiteraCafe.
Context: "Kroniki Klubowe" archives independent club culture (Saturator, Powiększenie, Pogłos).

## To find
- Cinema (Kino Iluzjon, Kinoteka, Muranów, Elektronik, Wisła, Kino Rejs), Nowy Teatr, TR Warszawa, Komuna Warszawa, jazz clubs (Jazzarium, Pardon To Tu), Instytut Batorego, Muzeum Sztuki Nowoczesnej, ecology groups (Extinction Rebellion, Obóz dla Puszczy, Greenpeace local), left (Razem, Lewica, Czerwone Kropki), Krytyka Polityczna Jasna 10 elsewhere.
