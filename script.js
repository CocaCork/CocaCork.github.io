const triTable = document.getElementById("triTable");
const triBody = document.getElementById("triResult");
const triCount = document.getElementById("triCount");

const triTable2 = document.getElementById("triTable2");
const triBody2 = document.getElementById("triResult2");
const triCount2 = document.getElementById("triCount2");

const triBoxTable = document.getElementById("triBoxTable");
const triBoxBody = document.getElementById("triBoxResult");
const triBoxCount = document.getElementById("triBoxCount");

const triBoxTable2 = document.getElementById("triBoxTable2");
const triBoxBody2 = document.getElementById("triBoxResult2");
const triBoxCount2 = document.getElementById("triBoxCount2");

const wideTable = document.getElementById("wideTable");
const wideBody = document.getElementById("wideResult");
const wideCount = document.getElementById("wideCount");

const wideTable2 = document.getElementById("wideTable2");
const wideBody2 = document.getElementById("wideResult2");
const wideCount2 = document.getElementById("wideCount2");

const umatanTable = document.getElementById("umatanTable");
const umatanBody = document.getElementById("umatanResult");
const umatanCount = document.getElementById("umatanCount");

const umatanTable2 = document.getElementById("umatanTable2");
const umatanBody2 = document.getElementById("umatanResult2");
const umatanCount2 = document.getElementById("umatanCount2");

const umarenTable = document.getElementById("umarenTable");
const umarenBody = document.getElementById("umarenResult");
const umarenCount = document.getElementById("umarenCount");

const umarenTable2 = document.getElementById("umarenTable2");
const umarenBody2 = document.getElementById("umarenResult2");
const umarenCount2 = document.getElementById("umarenCount2");

const tanshoTable = document.getElementById("tanshoTable");
const tanshoBody = document.getElementById("tanshoResult");
const tanshoCount = document.getElementById("tanshoCount");

const tanshoTable2 = document.getElementById("tanshoTable2");
const tanshoBody2 = document.getElementById("tanshoResult2");
const tanshoCount2 = document.getElementById("tanshoCount2");

const fukushoTable = document.getElementById("fukushoTable");
const fukushoBody = document.getElementById("fukushoResult");
const fukushoCount = document.getElementById("fukushoCount");

const fukushoTable2 = document.getElementById("fukushoTable2");
const fukushoBody2 = document.getElementById("fukushoResult2");
const fukushoCount2 = document.getElementById("fukushoCount2");

const syncTables = [
  {
    table: triTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: triTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: triBoxTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: triBoxTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: wideTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: wideTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: umatanTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: umatanTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: umarenTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: umarenTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: tanshoTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: tanshoTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: fukushoTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: fukushoTable2,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  }
];

function safeText(v){ return v && v.trim() !== "" ? v : "-"; }

function formatOdds(v){ return isNaN(v)||v===""?"-":Number(v).toFixed(1); }

function applyOddsColor(table, selector){
  const classes = [
    "bg-odds-very-low","bg-odds-low","bg-odds-mid-low",
    "bg-odds-mid-high","bg-odds-high","bg-odds-very-high"
  ];

  [...table.rows].slice(1).forEach(r=>{
    const input = r.querySelector(selector);
    if(!input) return;

    input.classList.remove(...classes);
    const cls = oddsClass(input.value);
    if(cls) input.classList.add("bg-" + cls);
  });
}

function updateInputOddsColor(){
  syncTables.forEach(cfg=>{
    applyOddsColor(cfg.table, cfg.oddsSelector);
  });
}

function oddsClass(v){
  v = Number(v);
  if (isNaN(v) || v < 1) return "";
  if (v<=5) return "odds-very-low";
  if (v<=10) return "odds-low";
  if (v<=25) return "odds-mid-low";
  if (v<=50) return "odds-mid-high";
  if (v<=100) return "odds-high";
  return "odds-very-high";
}

for(let i=1;i<=18;i++){
  triTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="p1"></td>
  <td><input type="checkbox" class="p2"></td>
  <td><input type="checkbox" class="p3"></td>`;

  triTable2.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="pp1"></td>
  <td><input type="checkbox" class="pp2"></td>
  <td><input type="checkbox" class="pp3"></td>`;
  
  triBoxTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text" style="width:120px;"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="b1"></td>
  <td><input type="checkbox" class="b2"></td>
  <td><input type="checkbox" class="b3"></td>`;

  triBoxTable2.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text" style="width:120px;"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="bb1"></td>
  <td><input type="checkbox" class="bb2"></td>
  <td><input type="checkbox" class="bb3"></td>`;
    
  wideTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text" style="width:120px;"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="w1"></td>
  <td><input type="checkbox" class="w2"></td>`;

  wideTable2.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text" style="width:120px;"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="ww1"></td>
  <td><input type="checkbox" class="ww2"></td>`;

  umatanTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="u1"></td>
  <td><input type="checkbox" class="u2"></td>`;

  umatanTable2.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="uu1"></td>
  <td><input type="checkbox" class="uu2"></td>`;

  umarenTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="r1"></td>
  <td><input type="checkbox" class="r2"></td>`;

  umarenTable2.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="rr1"></td>
  <td><input type="checkbox" class="rr2"></td>`;

  tanshoTable.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="t1"></td>`;

  tanshoTable2.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="tt1"></td>`;

  fukushoTable.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="f1"></td>`;

  fukushoTable2.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1" class="odds-input"></td>
  <td><input type="checkbox" class="ff1"></td>`;
}

function syncHorseInputs(sourceTable){
  const data = [];

  // 入力元テーブルの設定を取得
  const srcCfg = syncTables.find(c => c.table === sourceTable);
  if(!srcCfg) return;

  // 1. 入力元テーブルのみ収集
  [...srcCfg.table.rows].slice(1).forEach((row, i) => {
    data[i] = {
      name: row.querySelector(srcCfg.nameSelector)?.value ?? "",
      odds: row.querySelector(srcCfg.oddsSelector)?.value ?? ""
    };
  });

  // 2. 他テーブルへ反映
  syncTables.forEach(cfg => {
    if(cfg.table === sourceTable) return;

    [...cfg.table.rows].slice(1).forEach((row, i) => {
      const nameInput = row.querySelector(cfg.nameSelector);
      const oddsInput = row.querySelector(cfg.oddsSelector);

      if(nameInput) nameInput.value = data[i]?.name ?? "";
      if(oddsInput) oddsInput.value = data[i]?.odds ?? "";
    });
  });
}

[
  triTable, triTable2,
  triBoxTable, triBoxTable2,
  wideTable, wideTable2,
  umatanTable, umatanTable2,
  umarenTable, umarenTable2,
  tanshoTable, tanshoTable2,
  fukushoTable, fukushoTable2
].forEach(tbl => {
  // 馬名・オッズ入力 → 全券種更新
  tbl.addEventListener("input", e => {
    if (e.target.type === "text" || e.target.type === "number") {
      syncHorseInputs(tbl);
      updateTrifecta(triTable, triBody, triCount, ".p1", ".p2", ".p3");
      updateTrifecta(triTable2, triBody2, triCount2, ".pp1", ".pp2", ".pp3");
      updateTriBox(triBoxTable, triBoxBody, triBoxCount, ".b1", ".b2", ".b3");
      updateTriBox(triBoxTable2, triBoxBody2, triBoxCount2, ".bb1", ".bb2", ".bb3");
      updateWide(wideTable, wideBody, wideCount, ".w1", ".w2");
      updateWide(wideTable2, wideBody2, wideCount2, ".ww1", ".ww2");
      updateUmatan(umatanTable, umatanBody, umatanCount, ".u1", ".u2");
      updateUmatan(umatanTable2, umatanBody2, umatanCount2, ".uu1", ".uu2");
      updateUmaren(umarenTable, umarenBody, umarenCount, ".r1", ".r2");
      updateUmaren(umarenTable2, umarenBody2, umarenCount2, ".rr1", ".rr2");
      updateTansho(tanshoTable, tanshoBody, tanshoCount, ".t1");
      updateTansho(tanshoTable2, tanshoBody2, tanshoCount2, ".tt1");
      updateFukusho(fukushoTable, fukushoBody, fukushoCount, ".f1");
      updateFukusho(fukushoTable2, fukushoBody2, fukushoCount2, ".ff1");
      updateInputOddsColor();
    }
  });

  // チェックボックス → 該当券種だけ更新
  tbl.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
      updateTrifecta(triTable, triBody, triCount, ".p1", ".p2", ".p3");
      updateTrifecta(triTable2, triBody2, triCount2, ".pp1", ".pp2", ".pp3");
      updateTriBox(triBoxTable, triBoxBody, triBoxCount, ".b1", ".b2", ".b3");
      updateTriBox(triBoxTable2, triBoxBody2, triBoxCount2, ".bb1", ".bb2", ".bb3");
      updateWide(wideTable, wideBody, wideCount, ".w1", ".w2");
      updateWide(wideTable2, wideBody2, wideCount2, ".ww1", ".ww2");
      updateUmatan(umatanTable, umatanBody, umatanCount, ".u1", ".u2");
      updateUmatan(umatanTable2, umatanBody2, umatanCount2, ".uu1", ".uu2");
      updateUmaren(umarenTable, umarenBody, umarenCount, ".r1", ".r2");
      updateUmaren(umarenTable2, umarenBody2, umarenCount2, ".rr1", ".rr2");
      updateTansho(tanshoTable, tanshoBody, tanshoCount, ".t1");
      updateTansho(tanshoTable2, tanshoBody2, tanshoCount2, ".tt1");
      updateFukusho(fukushoTable, fukushoBody, fukushoCount, ".f1");
      updateFukusho(fukushoTable2, fukushoBody2, fukushoCount2, ".ff1");
    }
  });
});

function updateTrifecta(table, body, count, cls1, cls2, cls3){
  body.innerHTML="";
  const rows=[...table.rows].slice(1);
  const A=[],B=[],C=[];
  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };
    if(r.querySelector(cls1).checked)A.push(h);
    if(r.querySelector(cls2).checked)B.push(h);
    if(r.querySelector(cls3).checked)C.push(h);
  });

  A.forEach(a=>B.forEach(b=>C.forEach(c=>{
    if(a.no!==b.no&&a.no!==c.no&&b.no!==c.no){
      
      const tr = body.insertRow();
      tr.innerHTML = `      
      <td class="no-border-right">${a.no}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left no-border-right">${b.no}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${c.no}</td>
      
      <td class="no-border-right">${a.name}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left no-border-right">${b.name}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${c.name}</td>
      
      <td class="no-border-right ${oddsClass(a.odds)}">${formatOdds(a.odds)}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left no-border-right ${oddsClass(b.odds)}">${formatOdds(b.odds)}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left ${oddsClass(c.odds)}">${formatOdds(c.odds)}</td>
      `;
    }
  })));
  
  count.textContent = `${body.rows.length} 点`;
}

function updateTriBox(table, body, count, cls1, cls2, cls3){
  body.innerHTML = "";

  const rows = [...table.rows].slice(1);
  const A = [], B = [], C = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };
    if(r.querySelector(cls1).checked) A.push(h);
    if(r.querySelector(cls2).checked) B.push(h);
    if(r.querySelector(cls3).checked) C.push(h);
  });

  const used = new Set();

  A.forEach(a=>B.forEach(b=>C.forEach(c=>{
    if(a.no===b.no || a.no===c.no || b.no===c.no) return;

    // 重複除外用キー（順不同）
    const key = [a.no,b.no,c.no].sort((x,y)=>x-y).join("-");
    if(used.has(key)) return;
    used.add(key);
    
    const tr = body.insertRow();
    tr.innerHTML = `    
    <td class="no-border-right">${a.no}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left no-border-right">${b.no}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${c.no}</td>
    
    <td class="no-border-right">${a.name}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left no-border-right">${b.name}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${c.name}</td>
    
    <td class="no-border-right ${oddsClass(a.odds)}">${formatOdds(a.odds)}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left no-border-right ${oddsClass(b.odds)}">${formatOdds(b.odds)}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left ${oddsClass(c.odds)}">${formatOdds(c.odds)}</td>
    `;
  })));

  count.textContent = `${body.rows.length} 点`;
}

function updateWide(table, body, count, cls1, cls2){
  body.innerHTML="";
  
  const rows=[...table.rows].slice(1);
  const A=[],B=[];
  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };
    if(r.querySelector(cls1).checked)A.push(h);
    if(r.querySelector(cls2).checked)B.push(h);
  });

  A.forEach(a=>B.forEach(b=>{
    if(a.no!==b.no){
      const [h1,h2]=Number(a.no)<Number(b.no)?[a,b]:[b,a];

      const tr = body.insertRow();
      tr.innerHTML = `      
      <td class="no-border-right">${h1.no}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${h2.no}</td>
      
      <td class="no-border-right">${h1.name}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${h2.name}</td>
      
      <td class="no-border-right ${oddsClass(h1.odds)}">${formatOdds(h1.odds)}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left ${oddsClass(h2.odds)}">${formatOdds(h2.odds)}</td>
      `;
    }
  }));
  
  count.textContent = `${body.rows.length} 点`;
}

function updateUmatan(table, body, count, cls1, cls2){
  body.innerHTML = "";

  const rows = [...table.rows].slice(1);
  const A = [], B = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };
    if(r.querySelector(cls1).checked) A.push(h);
    if(r.querySelector(cls2).checked) B.push(h);
  });

  A.forEach(a=>B.forEach(b=>{
    if(a.no === b.no) return;

    const tr = body.insertRow();
    tr.innerHTML = `    
    <td class="no-border-right">${a.no}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left">${b.no}</td>
      
    <td class="no-border-right">${a.name}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left">${b.name}</td>
      
    <td class="no-border-right ${oddsClass(a.odds)}">${formatOdds(a.odds)}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left ${oddsClass(b.odds)}">${formatOdds(b.odds)}</td>
    `;
  }));

  count.textContent = `${body.rows.length} 点`;
}

function updateUmaren(table, body, count, cls1, cls2){
  body.innerHTML = "";

  const rows = [...table.rows].slice(1);
  const A = [], B = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };
    if(r.querySelector(cls1).checked) A.push(h);
    if(r.querySelector(cls2).checked) B.push(h);
  });

  const used = new Set();

  A.forEach(a=>B.forEach(b=>{
    if(a.no === b.no) return;

    // ★ 順不同キー
    const [h1,h2] = Number(a.no)<Number(b.no) ? [a,b] : [b,a];
    const key = `${h1.no}-${h2.no}`;
    if(used.has(key)) return;
    used.add(key);

    const tr = body.insertRow();
    tr.innerHTML = `    
    <td class="no-border-right">${h1.no}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${h2.no}</td>

    <td class="no-border-right">${h1.name}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${h2.name}</td>

    <td class="no-border-right ${oddsClass(h1.odds)}">${formatOdds(h1.odds)}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left ${oddsClass(h2.odds)}">${formatOdds(h2.odds)}</td>
    `;
  }));

  count.textContent = `${body.rows.length} 点`;
}

function updateTansho(table, body, count, cls){
  body.innerHTML = "";

  const rows = [...table.rows].slice(1);

  rows.forEach(r=>{
    if(!r.querySelector(cls).checked) return;
    
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };

    body.insertRow().innerHTML = `
    <tr>
    <td>${h.no}</td>
    <td>${h.name}</td>
    <td class="${oddsClass(h.odds)}">${formatOdds(h.odds)}</td>
    </tr>`;
  });

  count.textContent = `${body.rows.length} 点`;
}

function updateFukusho(table, body, count, cls){
  body.innerHTML = "";

  const rows = [...table.rows].slice(1);

  rows.forEach(r=>{
    if(!r.querySelector(cls).checked) return;
    
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.querySelector("td:nth-child(2) input").value),
      odds: r.querySelector("td:nth-child(3) input").value
    };

    body.insertRow().innerHTML = `
    <tr>
    <td>${h.no}</td>
    <td>${h.name}</td>
    <td class="${oddsClass(h.odds)}">${formatOdds(h.odds)}</td>
    </tr>`;
  });

  count.textContent = `${body.rows.length} 点`;
}

function buildStateObject(){
  const horses = [];

  for(let i=1;i<=18;i++){
    const row = triTable.rows[i];
    horses.push({
      name: row.cells[1].children[0].value,
      odds: row.cells[2].children[0].value,

      p1: row.querySelector(".p1")?.checked || false,
      p2: row.querySelector(".p2")?.checked || false,
      p3: row.querySelector(".p3")?.checked || false,

      pp1: triTable2.rows[i].querySelector(".pp1")?.checked || false,
      pp2: triTable2.rows[i].querySelector(".pp2")?.checked || false,
      pp3: triTable2.rows[i].querySelector(".pp3")?.checked || false,

      b1: triBoxTable.rows[i].querySelector(".b1")?.checked || false,
      b2: triBoxTable.rows[i].querySelector(".b2")?.checked || false,
      b3: triBoxTable.rows[i].querySelector(".b3")?.checked || false,

      bb1: triBoxTable2.rows[i].querySelector(".bb1")?.checked || false,
      bb2: triBoxTable2.rows[i].querySelector(".bb2")?.checked || false,
      bb3: triBoxTable2.rows[i].querySelector(".bb3")?.checked || false,

      w1: wideTable.rows[i].querySelector(".w1")?.checked || false,
      w2: wideTable.rows[i].querySelector(".w2")?.checked || false,

      ww1: wideTable2.rows[i].querySelector(".ww1")?.checked || false,
      ww2: wideTable2.rows[i].querySelector(".ww2")?.checked || false,

      u1: umatanTable.rows[i].querySelector(".u1")?.checked || false,
      u2: umatanTable.rows[i].querySelector(".u2")?.checked || false,

      uu1: umatanTable2.rows[i].querySelector(".uu1")?.checked || false,
      uu2: umatanTable2.rows[i].querySelector(".uu2")?.checked || false,

      r1: umarenTable.rows[i].querySelector(".r1")?.checked || false,
      r2: umarenTable.rows[i].querySelector(".r2")?.checked || false,

      rr1: umarenTable2.rows[i].querySelector(".rr1")?.checked || false,
      rr2: umarenTable2.rows[i].querySelector(".rr2")?.checked || false,

      t1: tanshoTable.rows[i].querySelector(".t1")?.checked || false,
      tt1: tanshoTable2.rows[i].querySelector(".tt1")?.checked || false,
      
      f1: fukushoTable.rows[i].querySelector(".f1")?.checked || false,
      ff1: fukushoTable2.rows[i].querySelector(".ff1")?.checked || false
    });
  }

  return {
    horses,
    memo: document.getElementById("raceMemo").value
  };
}

function formatDateTime(ts){
  const d = new Date(Number(ts));
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// 保存済みレース一覧を更新
function refreshRaceList(){
  const sel = document.getElementById("raceSelect");
  sel.innerHTML = `<option value="">保存済みレース</option>`;

  Object.keys(localStorage)
    .filter(k => k.startsWith("betState_"))
    .forEach(k=>{
      const race = k.replace("betState_","");
      const data = JSON.parse(localStorage.getItem(k));

      const opt = document.createElement("option");
      opt.value = race;
      opt.textContent = race;
      opt.dataset.savedAt = String(data.savedAt);
      sel.appendChild(opt);
    });

  document.getElementById("savedAtInfo").textContent = "";
}

// 状態保存
function saveStateByRace(){
  const race = document.getElementById("saveRaceName").value.trim();
  if(!race){
    alert("レース名を入力してください");
    return;
  }

  const savedAt = Date.now();

  const data = {
    savedAt,
    state: buildStateObject()
  };

  localStorage.setItem(
    `betState_${race}`,
    JSON.stringify(data)
  );

  refreshRaceList();

  const sel = document.getElementById("raceSelect");
  sel.value = race;
  
  document.getElementById("savedAtInfo").textContent =
    `最終保存：${formatDateTime(savedAt)}`;

  alert("保存しました");
}

// 状態読み込み
function loadStateByRace(){
  const race = document.getElementById("raceSelect").value;
  if(!race){
    alert("レースを選択してください");
    return;
  }

  const json = localStorage.getItem(`betState_${race}`);
  if(!json){
    alert("データが見つかりません");
    refreshRaceList();
    return;
  }

  const obj = JSON.parse(json);
  restoreFromStateObject(obj.state);

  document.getElementById("savedAtInfo").textContent =
    `最終保存：${formatDateTime(obj.savedAt)}`;
}

// 状態を画面に反映する関数
function restoreFromStateObject(state){
  state.horses.forEach((h,i)=>{
    const r = triTable.rows[i+1];

    r.cells[1].children[0].value = h.name;
    r.cells[2].children[0].value = h.odds;

    r.querySelector(".p1").checked = h.p1;
    r.querySelector(".p2").checked = h.p2;
    r.querySelector(".p3").checked = h.p3;

    triTable2.rows[i+1].querySelector(".pp1").checked = h.pp1;
    triTable2.rows[i+1].querySelector(".pp2").checked = h.pp2;
    triTable2.rows[i+1].querySelector(".pp3").checked = h.pp3;

    triBoxTable.rows[i+1].querySelector(".b1").checked = h.b1;
    triBoxTable.rows[i+1].querySelector(".b2").checked = h.b2;
    triBoxTable.rows[i+1].querySelector(".b3").checked = h.b3;

    triBoxTable2.rows[i+1].querySelector(".bb1").checked = h.bb1;
    triBoxTable2.rows[i+1].querySelector(".bb2").checked = h.bb2;
    triBoxTable2.rows[i+1].querySelector(".bb3").checked = h.bb3;

    wideTable.rows[i+1].querySelector(".w1").checked = h.w1;
    wideTable.rows[i+1].querySelector(".w2").checked = h.w2;

    wideTable2.rows[i+1].querySelector(".ww1").checked = h.ww1;
    wideTable2.rows[i+1].querySelector(".ww2").checked = h.ww2;

    umatanTable.rows[i+1].querySelector(".u1").checked = h.u1;
    umatanTable.rows[i+1].querySelector(".u2").checked = h.u2;

    umatanTable2.rows[i+1].querySelector(".uu1").checked = h.uu1;
    umatanTable2.rows[i+1].querySelector(".uu2").checked = h.uu2;

    umarenTable.rows[i+1].querySelector(".r1").checked = h.r1;
    umarenTable.rows[i+1].querySelector(".r2").checked = h.r2;

    umarenTable2.rows[i+1].querySelector(".rr1").checked = h.rr1;
    umarenTable2.rows[i+1].querySelector(".rr2").checked = h.rr2;

    tanshoTable.rows[i+1].querySelector(".t1").checked = h.t1;
    tanshoTable2.rows[i+1].querySelector(".tt1").checked = h.tt1;
    
    fukushoTable.rows[i+1].querySelector(".f1").checked = h.f1;
    fukushoTable2.rows[i+1].querySelector(".ff1").checked = h.ff1;
  });

  syncHorseInputs(triTable);

  // 再計算
  updateTrifecta(triTable, triBody, triCount, ".p1", ".p2", ".p3");
  updateTrifecta(triTable2, triBody2, triCount2, ".pp1", ".pp2", ".pp3");
  updateTriBox(triBoxTable, triBoxBody, triBoxCount, ".b1", ".b2", ".b3");
  updateTriBox(triBoxTable2, triBoxBody2, triBoxCount2, ".bb1", ".bb2", ".bb3");
  updateWide(wideTable, wideBody, wideCount, ".w1", ".w2");
  updateWide(wideTable2, wideBody2, wideCount2, ".ww1", ".ww2");
  updateUmatan(umatanTable, umatanBody, umatanCount, ".u1", ".u2");
  updateUmatan(umatanTable2, umatanBody2, umatanCount2, ".uu1", ".uu2");
  updateUmaren(umarenTable, umarenBody, umarenCount, ".r1", ".r2");
  updateUmaren(umarenTable2, umarenBody2, umarenCount2, ".rr1", ".rr2");
  updateTansho(tanshoTable, tanshoBody, tanshoCount, ".t1");
  updateTansho(tanshoTable2, tanshoBody2, tanshoCount2, ".tt1");
  updateFukusho(fukushoTable, fukushoBody, fukushoCount, ".f1");
  updateFukusho(fukushoTable2, fukushoBody2, fukushoCount2, ".ff1");
  updateInputOddsColor();
  
  document.getElementById("raceMemo").value = state.memo || "";
}

// 初期化処理（ページ起動時）
window.addEventListener("load", ()=>{
  refreshRaceList();
});

// 保存済みレース選択 → レース名＆保存日時を表示
document.getElementById("raceSelect").addEventListener("change", e => {
  const sel = e.target;
  const opt = sel.selectedOptions[0];

  if (!opt || !opt.dataset.savedAt) {
    document.getElementById("savedAtInfo").textContent = "";
    return;
  }

  // レース名を入力欄に反映
  document.getElementById("saveRaceName").value = opt.value;

  // 保存日時を表示
  document.getElementById("savedAtInfo").textContent =
    `最終保存：${formatDateTime(opt.dataset.savedAt)}`;
});

document.getElementById("clearStorageBtn").addEventListener("click", clearAllSavedData);

// 全削除処理
function clearAllSavedData(){
  if(!confirm("保存している全レースデータを削除します。\nこの操作は元に戻せません。よろしいですか？")){
    return;
  }

  const keysToDelete = [];

  for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    if(key && key.startsWith("betState_")){
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(k => localStorage.removeItem(k));
  
  alert("保存データをすべて削除しました。");
}
