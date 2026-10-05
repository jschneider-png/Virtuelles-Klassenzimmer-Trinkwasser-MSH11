const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");
const drawerContent = document.getElementById("drawerContent");
const storageKey = "wasserImageHomepageProgress";
let progress = JSON.parse(localStorage.getItem(storageKey) || "{}");

const modules = {
  1:{
    title:"Grundlagen Wasser",
    color:"#1976d2",
    intro:"Wasser ist die Grundlage allen Lebens. Hier lernst du seine wichtigsten Eigenschaften und seine Bedeutung kennen.",
    info:["Wasser kommt als Flüssigkeit, Eis und Wasserdampf vor.","Es ist ein sehr gutes Lösungsmittel.","Es spielt eine zentrale Rolle für Mensch, Umwelt und Technik."],
    note:"Wasser ist die Grundlage allen Lebens.",
    task:"Überlege: Wo begegnet dir Wasser heute bereits vor dem Frühstück?"
  },
  2:{
    title:"Trinkwasser",
    color:"#29995a",
    intro:"Woher kommt Trinkwasser – und wie wird aus Rohwasser hochwertiges Trinkwasser?",
    info:["Rohwasser kann z. B. aus Grundwasser, Quellen oder Oberflächenwasser stammen.","Je nach Ausgangsqualität wird es aufbereitet.","Vor der Verteilung wird die Qualität kontrolliert."],
    note:"Trinkwasser ist aufbereitetes und kontrolliertes Wasser für den menschlichen Gebrauch.",
    task:"Bringe gedanklich in Reihenfolge: Rohwasser → Aufbereitung → Kontrolle → Verteilung."
  },
  3:{
    title:"Wasserhärte",
    color:"#ef8a28",
    intro:"Wasserhärte beschreibt vor allem den Gehalt an gelösten Calcium- und Magnesiumionen.",
    info:["Mehr Calcium und Magnesium bedeuten meist härteres Wasser.","Hartes Wasser kann sichtbare Kalkablagerungen verursachen.","Wasserhärte ist eine Eigenschaft und kein einfacher Gut-Schlecht-Wert."],
    note:"Je mehr Calcium und Magnesium im Wasser gelöst sind, desto härter ist das Wasser.",
    task:"Starte anschließend die Drag-&-Drop-Aufgabe."
  },
  4:{
    title:"pH-Wert",
    color:"#7a3ec7",
    intro:"Der pH-Wert zeigt, ob eine wässrige Lösung sauer, neutral oder basisch ist.",
    info:["pH unter 7: sauer","pH 7: neutral","pH über 7: basisch"],
    note:"Ein pH-Wert von 7 ist neutral.",
    task:"Prüfe dein Wissen anschließend im Mini-Quiz."
  },
  5:{
    title:"TOC-Wert",
    color:"#118fa4",
    intro:"TOC steht für Total Organic Carbon und dient als Summenparameter für organisch gebundenen Kohlenstoff.",
    info:["Organische Stoffe können natürliche oder technische Ursachen haben.","Der TOC-Wert ist ein wichtiger Qualitätsparameter.","Er hilft bei der Überwachung der Wasserqualität."],
    note:"Der TOC-Wert gibt Hinweise auf organische Bestandteile im Wasser.",
    task:"Nutze die Wissenskarten, um den Begriff zu festigen."
  },
  6:{
    title:"Übungen & Wissenstest",
    color:"#d84747",
    intro:"Zum Abschluss wiederholst du die wichtigsten Inhalte und überprüfst, was bereits sicher sitzt.",
    info:["Begriffe wiederholen","Zusammenhänge erklären","Messwerte einordnen","Wissen anwenden"],
    note:"Aktives Abrufen macht Wissen stabiler.",
    task:"Starte den Wissenstest und überprüfe deinen Lernstand."
  }
};

function openDrawer(html){
  drawerContent.innerHTML = html;
  drawer.classList.add("open");
  backdrop.classList.add("show");
  drawer.setAttribute("aria-hidden","false");
}
function closeDrawer(){
  drawer.classList.remove("open");
  backdrop.classList.remove("show");
  drawer.setAttribute("aria-hidden","true");
}
document.getElementById("closeDrawer").onclick = closeDrawer;
backdrop.onclick = closeDrawer;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer()});

function save(){localStorage.setItem(storageKey,JSON.stringify(progress));updateStatus()}
function updateStatus(){
  const done = Object.values(progress).filter(v=>v>=100).length;
  document.getElementById("status").textContent=`${done} / 6 Module abgeschlossen`;
}
function moduleHtml(id){
  const m=modules[id];
  return `<span class="eyebrow">Lernmodul ${id}</span>
    <h2 style="color:${m.color}">${m.title}</h2>
    <p>${m.intro}</p>
    <div class="info"><h3>Infoteil</h3><ul>${m.info.map(x=>`<li>${x}</li>`).join("")}</ul></div>
    <div class="merksatz">💡 Merksatz: ${m.note}</div>
    <div class="info"><h3>Praxisimpuls</h3><p>${m.task}</p></div>
    <div class="actions">
      <button class="btn" id="markDone">Als abgeschlossen markieren</button>
      <button class="btn secondary" id="nextModule">Nächstes Modul</button>
    </div>`;
}
function openModule(id){
  progress[id]=Math.max(progress[id]||0,25);save();
  openDrawer(moduleHtml(id));
  document.getElementById("markDone").onclick=()=>{progress[id]=100;save();document.getElementById("markDone").textContent="Abgeschlossen ✓"};
  document.getElementById("nextModule").onclick=()=>openModule(id<6?id+1:1);
}
document.querySelectorAll("[data-module]").forEach(b=>b.onclick=()=>openModule(Number(b.dataset.module)));

const weekHtml = `<span class="eyebrow">Blockwoche 1</span><h2>Wochenplan</h2>
  <div class="info"><h3>Tag 1</h3><p>Grundlagen Wasser & Trinkwasser</p></div>
  <div class="info"><h3>Tag 2</h3><p>Wasserhärte: Calcium, Magnesium und Kalk</p></div>
  <div class="info"><h3>Tag 3</h3><p>pH-Wert: sauer, neutral, basisch</p></div>
  <div class="info"><h3>Tag 4</h3><p>TOC-Wert und organische Stoffe</p></div>
  <div class="info"><h3>Tag 5</h3><p>Wiederholung, Übungen und Wissenstest</p></div>`;

function materialsHtml(){
  return `<span class="eyebrow">Materialien</span><h2>PDFs & Downloads</h2>
  <p>Lege deine PDFs im GitHub-Repository in den Ordner <code>pdf/</code>. Die Links unten funktionieren dann direkt.</p>
  <div class="pdf-list">
    <a href="pdf/arbeitsblatt-blockwoche1.pdf" target="_blank">📄 Arbeitsblatt <span>Öffnen ↗</span></a>
    <a href="pdf/glossar-trinkwasser.pdf" target="_blank">📘 Glossar <span>Öffnen ↗</span></a>
    <a href="pdf/experiment-wasserhaerte.pdf" target="_blank">🧪 Experiment <span>Öffnen ↗</span></a>
    <a href="pdf/merkkarte.pdf" target="_blank">🗂️ Merkkarte <span>Öffnen ↗</span></a>
  </div>
  <div class="info"><h3>So lädst du PDFs in GitHub hoch</h3>
    <ol><li>Im Repository den Ordner <code>pdf</code> öffnen.</li><li><strong>Add file → Upload files</strong>.</li><li>PDF hineinziehen.</li><li><strong>Commit changes</strong>.</li></ol>
  </div>`;
}

function progressHtml(){
  let rows="";
  Object.keys(modules).forEach(id=>{
    const v=progress[id]||0;
    rows+=`<div class="progress-row"><div class="progress-head"><span>${id}. ${modules[id].title}</span><span>${v}%</span></div><div class="bar"><div class="fill" style="width:${v}%"></div></div></div>`;
  });
  return `<span class="eyebrow">Lernstand</span><h2>Dein Fortschritt</h2>${rows}`;
}

document.querySelectorAll("[data-action]").forEach(btn=>btn.onclick=()=>{
  const a=btn.dataset.action;
  if(a==="start") openDrawer(`<span class="eyebrow">Start</span><h2>Willkommen im Wasser-Lernportal</h2><p>Die Abbildung ist deine komplette Lernoberfläche. Klicke auf die Themenkarten, Übungen, Materialien oder die Navigation direkt im Bild.</p><div class="merksatz">👉 Alles, was im Bild wie ein Button oder eine Karte aussieht, ist hier tatsächlich klickbar.</div>`);
  if(a==="wochenplan") openDrawer(weekHtml);
  if(a==="lernmodule") openDrawer(`<span class="eyebrow">Lernmodule</span><h2>Wähle ein Modul</h2>${Object.keys(modules).map(id=>`<button class="choice module-choice" data-id="${id}">${id}. ${modules[id].title}</button>`).join("")}`);
  if(a==="materialien") openDrawer(materialsHtml());
  if(a==="interaktionen") openDrawer(`<span class="eyebrow">Interaktive Übungen</span><h2>Aktiv lernen</h2><p>Klicke im großen Bild direkt auf eine der fünf farbigen Übungskarten.</p><div class="info"><strong>Enthalten:</strong> Zuordnung, Wissenskarten, Mini-Quiz, Selbstcheck und Bild-Hotspots.</div>`);
  if(a==="quiz") renderFinalQuiz();
  if(a==="fortschritt") openDrawer(progressHtml());
  setTimeout(()=>document.querySelectorAll(".module-choice").forEach(x=>x.onclick=()=>openModule(Number(x.dataset.id))),0);
});

document.querySelectorAll("[data-pdf]").forEach(btn=>btn.onclick=()=>{
  const path=btn.dataset.pdf;
  openDrawer(`<span class="eyebrow">Material</span><h2>${btn.getAttribute("aria-label")}</h2><p>Diese Datei wird aus dem GitHub-Ordner <code>pdf/</code> geladen.</p><div class="actions"><a class="btn" style="text-decoration:none" href="${path}" target="_blank">PDF öffnen ↗</a><button class="btn secondary" id="pdfHelp">Upload-Anleitung</button></div>`);
  setTimeout(()=>document.getElementById("pdfHelp").onclick=()=>openDrawer(materialsHtml()),0);
});

document.querySelectorAll("[data-activity]").forEach(btn=>btn.onclick=()=>renderActivity(btn.dataset.activity));

function renderActivity(type){
  if(type==="quiz-mini"){
    openDrawer(`<span class="eyebrow">Mini-Quiz</span><h2>pH-Wert</h2><p>Was bedeutet ein pH-Wert von 7?</p>
      <button class="choice" data-a="0">sauer</button><button class="choice" data-a="1">neutral</button><button class="choice" data-a="0">basisch</button>
      <div class="actions"><button class="btn" id="checkMini">Antwort prüfen</button></div><div class="feedback" id="fb"></div>`);
    let selected=null;
    document.querySelectorAll(".choice[data-a]").forEach(c=>c.onclick=()=>{document.querySelectorAll(".choice[data-a]").forEach(x=>x.classList.remove("selected"));c.classList.add("selected");selected=c.dataset.a});
    document.getElementById("checkMini").onclick=()=>{const f=document.getElementById("fb");if(selected==="1"){f.textContent="✅ Richtig – pH 7 ist neutral.";f.style.color="#238451";progress[4]=Math.max(progress[4]||0,75);save()}else{f.textContent=selected===null?"Bitte zuerst auswählen.":"❌ Noch nicht. Versuche es erneut.";f.style.color="#bd3f3f"}};
  }
  if(type==="drag"){
    openDrawer(`<span class="eyebrow">Zuordnungsaufgabe</span><h2>Wasserhärte</h2><p>Ziehe die Begriffe in die passende Kategorie.</p>
      <div class="drag-layout"><div class="drag-pool"><strong>Begriffe</strong><br><span class="drag-item" draggable="true" data-t="hard">viel Calcium</span><span class="drag-item" draggable="true" data-t="hard">viel Magnesium</span><span class="drag-item" draggable="true" data-t="soft">wenig Mineralien</span></div><div><div class="drop-zone" data-zone="hard"><strong>Hartes Wasser</strong></div><div class="drop-zone" data-zone="soft" style="margin-top:10px"><strong>Weiches Wasser</strong></div></div></div><div class="feedback" id="dragFb"></div>`);
    let dragged=null;
    document.querySelectorAll(".drag-item").forEach(i=>i.ondragstart=()=>dragged=i);
    document.querySelectorAll(".drop-zone").forEach(z=>{z.ondragover=e=>{e.preventDefault();z.classList.add("over")};z.ondragleave=()=>z.classList.remove("over");z.ondrop=e=>{e.preventDefault();z.classList.remove("over");const f=document.getElementById("dragFb");if(dragged&&dragged.dataset.t===z.dataset.zone){z.appendChild(dragged);f.textContent="✅ Richtig zugeordnet.";f.style.color="#238451";progress[3]=Math.max(progress[3]||0,75);save()}else{f.textContent="↩️ Noch nicht passend.";f.style.color="#bd3f3f"}dragged=null}});
  }
  if(type==="cards"){
    openDrawer(`<span class="eyebrow">Wissenskarten</span><h2>Klicken & umdrehen</h2>
      <div class="flip"><div class="question"><strong>Was bedeutet TOC?</strong><p>Klicke auf die Karte.</p></div><div class="answer"><strong>Total Organic Carbon.</strong><p>Ein Summenparameter für organisch gebundenen Kohlenstoff.</p></div></div>
      <div class="flip"><div class="question"><strong>Was macht Wasser hart?</strong><p>Klicke auf die Karte.</p></div><div class="answer"><strong>Vor allem Calcium und Magnesium.</strong></div></div>`);
    document.querySelectorAll(".flip").forEach(c=>c.onclick=()=>{c.classList.toggle("revealed");progress[5]=Math.max(progress[5]||0,75);save()});
  }
  if(type==="check"){
    openDrawer(`<span class="eyebrow">Selbstcheck</span><h2>Was kannst du schon?</h2>
      <div class="info"><label><input type="checkbox"> Ich kann die Trinkwasseraufbereitung beschreiben.</label></div>
      <div class="info"><label><input type="checkbox"> Ich kann Wasserhärte erklären.</label></div>
      <div class="info"><label><input type="checkbox"> Ich kann pH 7 einordnen.</label></div>
      <div class="info"><label><input type="checkbox"> Ich kann TOC erklären.</label></div>
      <button class="btn" id="evalCheck">Auswerten</button><div class="feedback" id="checkFb"></div>`);
    document.getElementById("evalCheck").onclick=()=>{const n=drawerContent.querySelectorAll('input:checked').length;document.getElementById("checkFb").textContent=`Du hast ${n} von 4 Punkten abgehakt.`};
  }
  if(type==="hotspot"){
    openDrawer(`<span class="eyebrow">Bild-Hotspots</span><h2>Trinkwasseraufbereitung entdecken</h2><p>Klicke auf die drei Punkte.</p>
      <div class="hot-demo"><button class="dot d1" data-info="Rohwasser: Ausgangswasser aus Grundwasser, Quellen oder Oberflächenwasser.">1</button><button class="dot d2" data-info="Aufbereitung: Je nach Rohwasserqualität kommen verschiedene Verfahren zum Einsatz.">2</button><button class="dot d3" data-info="Verteilung: Nach der Kontrolle gelangt das Wasser ins Leitungsnetz.">3</button></div><div class="hot-info" id="hotInfo">Wähle einen Punkt.</div>`);
    document.querySelectorAll(".dot").forEach(d=>d.onclick=()=>{document.getElementById("hotInfo").textContent=d.dataset.info;progress[2]=Math.max(progress[2]||0,75);save()});
  }
}

function renderFinalQuiz(){
  openDrawer(`<span class="eyebrow">Wissenstest</span><h2>Blockwoche 1</h2>
    <div class="info"><strong>1. Was macht Wasser hauptsächlich hart?</strong><label><input type="radio" name="q1" value="1"> Calcium und Magnesium</label><br><label><input type="radio" name="q1" value="0"> Sauerstoff und Stickstoff</label></div>
    <div class="info"><strong>2. pH 7 ist …</strong><label><input type="radio" name="q2" value="1"> neutral</label><br><label><input type="radio" name="q2" value="0"> stark sauer</label></div>
    <div class="info"><strong>3. TOC bedeutet …</strong><label><input type="radio" name="q3" value="1"> Total Organic Carbon</label><br><label><input type="radio" name="q3" value="0"> Total Oxygen Control</label></div>
    <button class="btn" id="evalQuiz">Auswerten</button><div class="feedback" id="quizFb"></div>`);
  document.getElementById("evalQuiz").onclick=()=>{let score=0,answered=0;["q1","q2","q3"].forEach(q=>{const c=drawerContent.querySelector(`input[name="${q}"]:checked`);if(c){answered++;score+=Number(c.value)}});const f=document.getElementById("quizFb");if(answered<3){f.textContent="Bitte beantworte alle Fragen.";f.style.color="#a86b00";return}f.textContent=`Du hast ${score} von 3 Punkten erreicht.`;f.style.color=score>=2?"#238451":"#bd3f3f";progress[6]=score===3?100:75;save()};
}
updateStatus();