// Builds web/index.html from state/seen.json. Run: node web/build.js [YYYY-MM-DD start] [days=14]
// Also writes missing `score` / `description` fields back into the ledger (existing values are never overwritten).
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const ledgerPath = path.join(root, "state", "seen.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const start = process.argv[2] || ledger.lastRun;
const days = +(process.argv[3] || 14);
const end = new Date(new Date(start + "T12:00:00").getTime() + (days - 1) * 864e5).toISOString().slice(0, 10);


// --- sources for the footer: active/partial rows of sources.md (generated, so it stays in sync)
function activeSources() {
  const out = new Map();
  for (const line of fs.readFileSync(path.join(root, "sources.md"), "utf8").split("\n")) {
    if (!line.startsWith("|")) continue;
    const c = line.split("|").slice(1, -1).map(s => s.trim());
    if (c.length < 2 || /\|\s*never\s*\|/.test(line) || /^-+$/.test(c[0]) || /^(Source|Venue)$/.test(c[0])) continue;
    const ok = c.slice(1).some(x => /^(active|partial)\b/i.test(x)) || /\b(ACTIVE|PARTIAL)\b/.test(c[1] || "");
    if (!ok) continue;
    const m = c.slice(1).join(" ").match(/https?:\/\/[^\s|)–]+/);
    if (!m) continue;
    const url = m[0].replace(/[.,;]+$/, ""), key = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    if (!out.has(key)) out.set(key, { name: c[0].replace(/\s*\(.*$/, "") || key, url });
  }
  return [...out.values()];
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const sourcesHtml = activeSources().map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(" · ");

// --- fuzzy score: venue base + keyword bonuses/penalties. Replace with learned preferences later.
const base = {
  "Pardon, To Tu": 70, "Jassmine": 65, "BARdzo bardzo": 60, "Kino Iluzjon": 60, "Kino Muranów": 60,
  "CSW Zamek Ujazdowski": 60, "Dom Spotkań z Historią": 60, "IR2 / Faktyczny Dom Kultury": 58,
  "Uniwersytet Warszawski": 50, "Muzeum Warszawy": 50, "Teatr Wielki": 50, "MOXO / Fabryka Norblina": 50,
  "Południk Zero": 55, "Kino Kultura": 55, "Hybrydy": 45, "Jasna 1": 45, "Hydrozagadka": 40,
  "Klub Niebo": 35, "Teatr Studio": 40, "Stodoła": 25, "Komuna Warszawa": 35,
  "Palladium": 25, "Klub Proxima": 30, "Kino Elektronik": 50,
};
const bonus = [
  [/jazz|trio|quintet|quartet|solo|jam|fusion|funk/i, 8],
  [/intro|wstęp|spotkanie|rozmowa|dyskusj|wykład|seminarium|debata|prelekcj|oprowadzanie/i, 10],
  [/festiwal|festival|wernisaż/i, 5],
  [/dj|rave|night|party/i, 3],
  [/\(film\)|^(La perra|Zobaczysz wszystko|Klara i słońce|Everytime|Dziki Koń Dziewięć|Naza|Pieśni lasu|Nikt nie wie|Freak Show|Służący)/i, -12],
  [/dla dzieci|rodzinn|maluchów|dla młodych|Misiowe|Kopciuszek|Szkoła Metod/i, -25],
  [/zwiedzanie|warsztaty (w ogrodzie|linorytu)|Konkurs robotyczny|Posiedzenie|Pracownia Zapachów/i, -15],
  [/kult|cugowski|kabaret|klimakterium|mtv|słodkie lata|kings of d|rodowicz|dżem|piaseczny|lady pank/i, -20],
];
const manual = { // my picks from the 2-week report (exact titles)
  "Paolo Cherchi Usai w Iluzjonie (spotkanie, wstęp wolny)": 88, "Ghost Dog + wstęp Jacka Sobczyńskiego": 86,
  "Ziemia obiecana + audioserial i wstęp Krzysztofa Tubilewicza": 84, "Sounds of Silents – gala otwarcia: Mocny człowiek": 86,
  "Dziewczyna z hiacyntami + prelekcja Cherchi Usai": 80, "Gala finałowa: Czarny pirat (muzyka na żywo: Klawo)": 80,
  "Debata: Magazyn Pismo w Studio #44": 74, "Lata 80. patrzą na nas: aktywność kobiet (rozmowa)": 80,
  "Gdy ważyły się losy Europy: debata o wojnie 1918–1920": 68, "Warsztaty czytania faktów: wojna": 76,
  "Wykład: Stefan Drössler, Looking for the Golem (po angielsku)": 78, "Raskolnikow (kino nieme, muzyka na żywo)": 80,
  "Serata Futurista: niemy futuryzm z muzyką na żywo": 80, "Svmerki – Nina Garcia, Olga Anna Markowska (koncert)": 78,
  "Debata: Miasto Lalki, miasto dziś": 70, "Pieśń Jimmiego Blacksmitha + dyskusja (DKF)": 76,
  "Trzaska / Swell / Tokar / Kugel": 92, "Horse Lords": 88, "Paolo Cherchi Usai w Iluzjonie": 88,
  "Ghost Dog + intro Sobczyński": 86, "Ziemia obiecana + Tubilewicz": 84, "Sounds of Silents - gala otwarcia": 86,
  "Wojtek Mazolewski Solo (Oscar Jerome)": 85, "Wojtek Mazolewski Solo (Theon Cross)": 85,
  "Jazz Cats plays Brad Mehldau": 84, "Holy Fawn (USA)": 78, "Astronomy on Tap #7": 80,
  "Catherine Lacey rozmowa": 82, "Lata 80. patrzą na nas - wydarzenie towarzyszące": 80,
  "Oratorium na konstytucję Ziemi (wernisaż)": 78, "Warsztaty czytania faktów: wojna": 76,
  "Ambrose Akinmusire Quintet": 90, "Sam Gendel & Sam Wilkes": 90, "Houk + Waluśkraksakryzys": 62,
};
const desc = { // specific descriptions (what I know from the sources); others get a generic line
  "Trzaska / Swell / Tokar / Kugel": "Free-jazz quartet; the page says Joe McPhee can't travel but the others still play. Tue 20:30.",
  "Horse Lords": "Experimental rock band from the US. Thu 20:30.",
  "Paolo Cherchi Usai w Iluzjonie": "Meeting with a legendary film curator and theorist. Free. 19:00.",
  "Ghost Dog + intro Sobczyński": "Jarmusch's Ghost Dog with an introduction by Jacek Sobczyński (Timeless Autumn series). 20:30.",
  "Ziemia obiecana + Tubilewicz": "Wajda's film plus the audio series 'Pewnego razu w Łodzi' and an introduction by its author, Krzysztof Tubilewicz (Radio 357). 16:00.",
  "Sounds of Silents - gala otwarcia": "Silent-film festival with live music, 5–8 Nov; opening gala 18:00, free lectures through the festival.",
  "Wojtek Mazolewski Solo (Oscar Jerome)": "Mazolewski solo with guests Oscar Jerome and Marysia Osu. 19:00.",
  "Wojtek Mazolewski Solo (Theon Cross)": "Mazolewski solo with guest Theon Cross. 19:00.",
  "Jazz Cats plays Brad Mehldau": "Kuba Więcek's Jazz Cats play Brad Mehldau. 19:00.",
  "Holy Fawn (USA)": "American shoegaze / post-metal band. Time not on the listing.",
  "Astronomy on Tap #7": "Short astronomy talks plus a quiz in a bar. Free. 19:00.",
  "Catherine Lacey rozmowa": "Conversation around the author's 'Biografia X' and 'Odpowiedzi'. Free. 18:00.",
  "Lata 80. patrzą na nas - wydarzenie towarzyszące": "Event accompanying the 'Lata 80. patrzą na nas' programme at the Dom Spotkań z Historią.",
  "Oratorium na konstytucję Ziemi (wernisaż)": "Exhibition opening at CSW Zamek Ujazdowski.",
  "Warsztaty czytania faktów: wojna": "IR2 workshop on propaganda, trolls and war memes.",
  "Pięć Smaków - Festiwal Filmów Azjatyckich": "20th Five Flavours Asian Film Festival, 10–17 Nov.",
  "Niewinni Czarodzieje 2026": "Film festival at Kino Muranów, with a Dzień świra screening and a Marek Koterski meeting.",
  "Voice of Jazz - Jakub Gąsowski": "Jazz vocal night at BARdzo bardzo.",
  "Songbloom 2026": "Concerts by Anchey Nocon, Goofy Ginz and Kiwi Duo at BARdzo bardzo.",
  "Etno Rave autumn edition": "Folk-meets-electronic party at BARdzo bardzo.",
  "Seksmisja po śląsku": "Screening with live Silesian dubbing. 20:00.",
  "Mery Spolsky": "Indie-pop concert.",
  "Warsaw Jazz Tuesday (Budniak)": "Weekly jazz night by MOXO at Fabryka Norblina; tickets showed 'currently unavailable'.",
  "Jazztival MOXO vol. III": "Jazz festival day at MOXO.",
  "Ayanna Witter-Johnson": "Cellist and singer. 19:00.",
  "Aleksander Dębicz - 12 Dreams for Piano": "Piano recital at the Polish Radio Concert Studio. 19:00.",
};
const generic = {
  "Pardon, To Tu": "Jazz / experimental / talks club.", "Jassmine": "Concert at the Jassmine jazz club.",
  "BARdzo bardzo": "Event at BARdzo bardzo (listing has no description).", "Hydrozagadka": "Concert at Hydrozagadka (listing has only date and title).",
  "Klub Niebo": "Concert or party at Klub Niebo.", "Jasna 1": "Electronic club night at Jasna 1.",
  "Stodoła": "Large-club concert at Stodoła.", "Hybrydy": "Club concert at Hybrydy.",
  "Teatr Wielki": "Opera at Teatr Wielki.", "Teatr Studio": "Event at Teatr Studio.",
  "IR2 / Faktyczny Dom Kultury": "Talk or workshop at Faktyczny Dom Kultury (IR2 reportage institute).",
  "Dom Spotkań z Historią": "History talk / screening at the Dom Spotkań z Historią.",
  "CSW Zamek Ujazdowski": "Programme item at CSW Zamek Ujazdowski.", "Uniwersytet Warszawski": "University of Warsaw event; listing has no time or venue.",
  "Muzeum Warszawy": "Museum event.", "Kino Iluzjon": "Screening or talk at Kino Iluzjon.", "Kino Muranów": "Screening at Kino Muranów.",
};
// --- user adjustments, applied at build time on top of the stored score (may go negative). Never exclude, only re-score.
const adjust = []; // optional rule-based adjustments (unused now: scores are judged per event, see preferences.md)
const adjOf = e => adjust.filter(a => a.re.test(e.title) && !(a.not && a.not.test(e.title)));
let changed = 0;
const rows = [];
for (const [id, e] of Object.entries(ledger.events)) {
  if (e.score == null) {
    let s = manual[e.title] ?? (base[e.venue] ?? 40) + bonus.reduce((a, [re, b]) => a + (re.test(e.title) ? b : 0), 0);
    e.score = Math.round(Math.max(0, Math.min(100, s))) / 10; e.scoredBy = "heuristic"; changed++;
  }
  if (!e.description) { e.description = desc[e.title] || generic[e.venue] || "See event page."; changed++; }
  if (e.date >= start && e.date <= end) rows.push({ id, time: e.time || "", title: e.title, venue: e.venue, date: e.date, url: e.url, description: e.description + adjOf(e).map(a => ` [score ${a.pts > 0 ? "+" : ""}${a.pts}: ${a.why}]`).join(""), score: e.score + adjOf(e).reduce((t, a) => t + a.pts, 0) });
}
if (changed) fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 1));
rows.sort((a, b) => a.date.localeCompare(b.date) || b.score - a.score || a.time.localeCompare(b.time));

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Warsaw events</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@500;700&display=swap');
:root{--bg:#f6f5f2;--fg:#1c1c1a;--mut:#6b6a66;--line:#dcdad4;--acc:#1f5eff;--tabon:#e6e3da;--hi:#1e8a45;--mid:#b07a00}
@media(prefers-color-scheme:dark){:root{--bg:#161615;--fg:#ecebe6;--mut:#9a988f;--line:#33322e;--acc:#7aa2ff;--tabon:#2c2b27;--hi:#5fd88a;--mid:#e8c25a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 Lato,system-ui,sans-serif}
main{max-width:1040px;margin:0 auto;padding:20px 16px}
h1{font:700 1.3rem 'Playfair Display',serif;margin:0 0 16px}
.tabs{display:flex;gap:4px;align-items:center}
.strip{display:flex;gap:4px;overflow-x:auto;scroll-behavior:smooth;flex:1;scrollbar-width:none;-ms-overflow-style:none}
.strip::-webkit-scrollbar{display:none}
.tab{flex:0 0 auto;min-width:58px;border:0;background:transparent;color:var(--fg);border-radius:8px;padding:6px 10px;cursor:pointer;text-align:center;font:inherit;line-height:1.2}
.tab small{display:block;color:var(--mut);font-size:.72rem}
.tab[aria-selected=true]{background:var(--tabon)}
.arrow{flex:0 0 auto;border:0;background:transparent;color:var(--mut);opacity:.6;width:28px;height:36px;cursor:pointer;font:300 1.3rem Lato,sans-serif;padding:0}
.arrow:hover{opacity:1}
.list{margin-top:14px;border-top:1px solid var(--line)}
.ev{border-bottom:1px solid var(--line)}
.head{display:flex;gap:20px;align-items:center;width:100%;text-align:left;background:none;border:0;color:inherit;font:inherit;padding:16px 0;cursor:pointer}
.time{flex:0 0 auto;min-width:5.2rem;font:500 1.5rem/1.2 'Playfair Display',serif;font-variant-numeric:lining-nums tabular-nums}
.name{flex:1;min-width:0}
.title{display:block;font:700 1.5rem/1.2 'Playfair Display',serif;overflow-wrap:anywhere}
.venue{display:block;margin-top:5px;font:700 .75rem Lato,sans-serif;text-transform:uppercase;letter-spacing:.16em;color:var(--mut)}
.score{flex:0 0 auto;min-width:48px;text-align:right;font:700 1.3rem Lato,sans-serif;font-variant-numeric:tabular-nums}
.s-hi{color:var(--hi)}.s-mid{color:var(--mid)}.s-lo{color:var(--mut)}
.detail{display:none;padding:0 0 18px calc(5.2rem + 20px);color:var(--mut);font-family:Lato,sans-serif}.ev.open .detail{display:block}
.detail a{color:var(--acc);word-break:break-all}
footer{max-width:1000px;margin:40px auto 24px;padding:16px 20px 0;border-top:1px solid var(--line);color:var(--mut);font:.8rem/1.7 Lato,sans-serif}footer h2{font:700 .75rem Lato,sans-serif;text-transform:uppercase;letter-spacing:.16em;margin:0 0 6px}footer a{color:var(--mut)}
.empty{padding:20px 0;color:var(--mut)}
.note{color:var(--mut);font-size:.8rem;margin-top:14px}
@media(max-width:600px){.head{gap:12px}.time,.title{font-size:1.15rem}.time{min-width:3.6rem}.detail{padding-left:calc(3.6rem + 12px)}}
</style></head><body><main>
<h1>Warsaw events <span style="color:var(--mut);font-weight:400">· ${start} → ${end}</span></h1>
<div class="tabs"><button class="arrow" id="prev" aria-label="Earlier days">‹</button><div class="strip" id="strip" role="tablist"></div><button class="arrow" id="next" aria-label="Later days">›</button></div>
<div class="list" id="list"></div>
<p class="note">Score 0–10 is Claude's judgement of fit with your taste (see preferences.md). Events scored 'heuristic' in the ledger are not yet judged. Tiles sorted by score within each day; empty time = not on the listing.</p>
</main>
<footer><h2>Sources scraped</h2><p>${sourcesHtml}</p><p>Static snapshot of the event ledger, last run ${ledger.lastRun}.</p></footer>
<script>
const EVENTS=${JSON.stringify(rows).replace(/</g, "\\u003c")};
const days=[...new Set(EVENTS.map(e=>e.date))];
const dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],mn=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const strip=document.getElementById("strip"),list=document.getElementById("list");
let cur=null;
function sel(d){cur=d;[...strip.children].forEach(b=>b.setAttribute("aria-selected",b.dataset.d===d));
 list.textContent="";const evs=EVENTS.filter(e=>e.date===d);
 if(!evs.length){list.innerHTML='<div class="empty">No events.</div>';return}
 for(const e of evs){const div=document.createElement("div");div.className="ev";
  const cls=e.score>=7?"s-hi":e.score>=5?"s-mid":"s-lo";
  const h=document.createElement("button");h.className="head";h.setAttribute("aria-expanded","false");
  h.innerHTML='<span class="time"></span><span class="name"><span class="title"></span><span class="venue"></span></span><span class="score '+cls+'"></span>';
  h.querySelector(".venue").textContent=e.venue;h.querySelector(".title").textContent=e.title;h.querySelector(".time").textContent=e.time;h.querySelector(".score").textContent=e.score.toFixed(1);
  const det=document.createElement("div");det.className="detail";
  const p=document.createElement("div");p.textContent=e.description;det.appendChild(p);
  if(/^https?:/.test(e.url)){const a=document.createElement("a");a.href=e.url;a.target="_blank";a.rel="noopener";a.textContent=e.url;const w=document.createElement("div");w.style.marginTop="6px";w.appendChild(a);det.appendChild(w)}
  h.onclick=()=>{const o=div.classList.toggle("open");h.setAttribute("aria-expanded",o)};
  div.append(h,det);list.appendChild(div)}}
for(const d of days){const dt=new Date(d+"T12:00:00");const b=document.createElement("button");b.className="tab";b.dataset.d=d;b.setAttribute("role","tab");
 b.innerHTML=dt.getDate()+"<small>"+dn[dt.getDay()]+" · "+EVENTS.filter(e=>e.date===d).length+"</small>";b.onclick=()=>sel(d);strip.appendChild(b)}
document.getElementById("next").onclick=()=>strip.scrollBy({left:240});document.getElementById("prev").onclick=()=>strip.scrollBy({left:-240});
if(days.length)sel(days[0]);else list.innerHTML='<div class="empty">No events in range.</div>';
</script></body></html>`;
fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log(`web/index.html: ${rows.length} events, ${days === undefined ? 0 : new Set(rows.map(r => r.date)).size} days, ledger fields added: ${changed}`);
