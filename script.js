const triResults = [];
const triBoxResults = [];
const wideResults = [];
const umatanResults = [];
const umarenResults = [];
const tanshoResults = [];
const fukushoResults = [];

const triTable = document.getElementById("triTable");
const triBody  = document.getElementById("triResult");
const triCount = document.getElementById("triCount");

const triBoxTable = document.getElementById("triBoxTable");
const triBoxBody  = document.getElementById("triBoxResult");
const triBoxCount = document.getElementById("triBoxCount");

const wideTable = document.getElementById("wideTable");
const wideBody  = document.getElementById("wideResult");
const wideCount = document.getElementById("wideCount");

const umatanTable = document.getElementById("umatanTable");
const umatanBody  = document.getElementById("umatanResult");
const umatanCount = document.getElementById("umatanCount");

const umarenTable = document.getElementById("umarenTable");
const umarenBody  = document.getElementById("umarenResult");
const umarenCount = document.getElementById("umarenCount");

const tanshoTable = document.getElementById("tanshoTable");
const tanshoBody  = document.getElementById("tanshoResult");
const tanshoCount = document.getElementById("tanshoCount");

const fukushoTable = document.getElementById("fukushoTable");
const fukushoBody  = document.getElementById("fukushoResult");
const fukushoCount = document.getElementById("fukushoCount");

// テーブルと更新関数の対応表
const tableUpdateMap = new Map([
  [triTable,     updateTrifecta],
  [triBoxTable,  updateTriBox],
  [wideTable,    updateWide],
  [umatanTable,  updateUmatan],
  [umarenTable,  updateUmaren],
  [tanshoTable,  updateTansho],
  [fukushoTable, updateFukusho],
]);

const syncTables = [
  {
    table: triTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: triBoxTable,
    nameSelector: "td:nth-child(2) input",
    oddsSelector: "td:nth-child(3) input"
  },
  {
    table: wideTable,
    nameSelector: ".wName",
    oddsSelector: ".wOdds"
  },
  {
  table: umatanTable,
  nameSelector: "td:nth-child(2) input",
  oddsSelector: "td:nth-child(3) input"
  },
  {
  table: umarenTable,
  nameSelector: "td:nth-child(2) input",
  oddsSelector: "td:nth-child(3) input"
  },
  {
  table: tanshoTable,
  nameSelector: "td:nth-child(2) input",
  oddsSelector: "td:nth-child(3) input"
  },
  {
  table: fukushoTable,
  nameSelector: "td:nth-child(2) input",
  oddsSelector: "td:nth-child(3) input"
  }
];

function attachDisableHandler(tr, checkbox, updateCountFn){
  checkbox.addEventListener("change", ()=>{
    tr.classList.toggle("result-disabled", checkbox.checked);
    updateCountFn();
  });
}

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
  <td><input type="number" step="0.1"></td>
  <td><input type="checkbox" class="p1"></td>
  <td><input type="checkbox" class="p2"></td>
  <td><input type="checkbox" class="p3"></td>`;
  
  triBoxTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text" style="width:120px;"></td>
  <td><input type="number" step="0.1" style="width:60px;"></td>
  <td><input type="checkbox" class="b1"></td>
  <td><input type="checkbox" class="b2"></td>
  <td><input type="checkbox" class="b3"></td>`;
    
  wideTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input class="wName" style="width:120px;"></td>
  <td><input class="wOdds" style="width:60px;"></td>
  <td><input type="checkbox" class="w1"></td>
  <td><input type="checkbox" class="w2"></td>`;

  umatanTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1"></td>
  <td><input type="checkbox" class="u1"></td>
  <td><input type="checkbox" class="u2"></td>`;

  umarenTable.insertRow().innerHTML=`
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1"></td>
  <td><input type="checkbox" class="r1"></td>
  <td><input type="checkbox" class="r2"></td>`;

  tanshoTable.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1"></td>
  <td><input type="checkbox" class="t1"></td>`;

  fukushoTable.insertRow().innerHTML = `
  <th>${i}</th>
  <td><input type="text"></td>
  <td><input type="number" step="0.1"></td>
  <td><input type="checkbox" class="f1"></td>`;
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

[ triTable, triBoxTable, wideTable, umatanTable, umarenTable, tanshoTable, fukushoTable].forEach(tbl => {
  // 馬名・オッズ入力 → 全券種更新
  tbl.addEventListener("input", e => {
    if (e.target.type === "text" || e.target.type === "number") {
      syncHorseInputs(tbl);
      updateTrifecta();
      updateTriBox();
      updateWide();
      updateUmatan();
      updateUmaren();
      updateTansho();
      updateFukusho();
      updateInputOddsColor();
    }
  });

  // チェックボックス → 該当券種だけ更新
  tbl.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
      const updateFn = tableUpdateMap.get(tbl);
      if (updateFn) updateFn();
    }
  });
});

function updateTrifectaCount(){
  const rows = [...triBody.rows];
  const enabled = rows.filter(r => !r.querySelector(".disable-row")?.checked);
  triCount.textContent = `${enabled.length} 点`;
}

function updateTriBoxCount(){
  const rows = [...triBoxBody.rows];
  const enabled = rows.filter(r => !r.querySelector(".disable-row")?.checked);
  triBoxCount.textContent = `${enabled.length} 点`;
}

function updateWideCount(){
  const rows = [...wideBody.rows];
  const enabled = rows.filter(r => !r.querySelector(".disable-row")?.checked);
  wideCount.textContent = `${enabled.length} 点`;
}

function updateUmatanCount(){
  const rows = [...umatanBody.rows];
  const enabled = rows.filter(r => !r.querySelector(".disable-row")?.checked);
  umatanCount.textContent = `${enabled.length} 点`;
}

function updateUmarenCount(){
  const rows = [...umarenBody.rows];
  const enabled = rows.filter(r => !r.querySelector(".disable-row")?.checked);
  umarenCount.textContent = `${enabled.length} 点`;
}

function updateTrifecta(){
  triBody.innerHTML="";
  triResults.length = 0;
  const rows=[...triTable.rows].slice(1);
  const A=[],B=[],C=[];
  rows.forEach(r=>{
    const h={no:r.cells[0].textContent,name:safeText(r.cells[1].children[0].value),odds:r.cells[2].children[0].value};
    if(r.querySelector(".p1").checked)A.push(h);
    if(r.querySelector(".p2").checked)B.push(h);
    if(r.querySelector(".p3").checked)C.push(h);
  });

  let cnt=0;
  A.forEach(a=>B.forEach(b=>C.forEach(c=>{
    if(a.no!==b.no&&a.no!==c.no&&b.no!==c.no){
      cnt++;
      triResults.push({
        no1: a.no, no2: b.no, no3: c.no,
        name1: a.name, name2: b.name, name3: c.name,
        odds1: formatOdds(a.odds), odds2: formatOdds(b.odds), odds3: formatOdds(c.odds)
      });
      
      const tr = triBody.insertRow();
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

      <td><input type="checkbox" class="disable-row"></td>
      `;

      const chk = tr.querySelector(".disable-row");
      attachDisableHandler(tr, chk, updateTrifectaCount);
    }
  })));
  updateTrifectaCount();
}

function updateTriBox(){
  triBoxBody.innerHTML = "";
  triBoxResults.length = 0;

  const rows = [...triBoxTable.rows].slice(1);
  const A = [], B = [], C = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.cells[1].children[0].value),
      odds: r.cells[2].children[0].value
    };
    if(r.querySelector(".b1").checked) A.push(h);
    if(r.querySelector(".b2").checked) B.push(h);
    if(r.querySelector(".b3").checked) C.push(h);
  });

  const used = new Set();
  let cnt = 0;

  A.forEach(a=>B.forEach(b=>C.forEach(c=>{
    if(a.no===b.no || a.no===c.no || b.no===c.no) return;

    // 重複除外用キー（順不同）
    const key = [a.no,b.no,c.no].sort((x,y)=>x-y).join("-");
    if(used.has(key)) return;
    used.add(key);

    cnt++;

    triBoxResults.push({
      no1:a.no, no2:b.no, no3:c.no,
      name1:a.name, name2:b.name, name3:c.name,
      odds1:formatOdds(a.odds),
      odds2:formatOdds(b.odds),
      odds3:formatOdds(c.odds)
    });
    
    const tr = triBoxBody.insertRow();
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

    <td><input type="checkbox" class="disable-row"></td>
    `;

    const chk = tr.querySelector(".disable-row");
    attachDisableHandler(tr, chk, updateTriBoxCount);
  })));

  updateTriBoxCount();
}

function updateWide(){
  wideBody.innerHTML="";
  wideResults.length = 0;
  const rows=[...wideTable.rows].slice(1);
  const A=[],B=[];
  rows.forEach(r=>{
    const h={no:r.cells[0].textContent,name:safeText(r.querySelector(".wName").value),odds:r.querySelector(".wOdds").value};
    if(r.querySelector(".w1").checked)A.push(h);
    if(r.querySelector(".w2").checked)B.push(h);
  });

  let cnt=0;
  A.forEach(a=>B.forEach(b=>{
    if(a.no!==b.no){
      const [h1,h2]=Number(a.no)<Number(b.no)?[a,b]:[b,a];
      cnt++;
      wideResults.push({
        no1: h1.no, no2: h2.no,
        name1: h1.name, name2: h2.name,
        odds1: formatOdds(h1.odds), odds2: formatOdds(h2.odds)
      });

      const tr = wideBody.insertRow();
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

      <td><input type="checkbox" class="disable-row"></td>
      `;

      const chk = tr.querySelector(".disable-row");
      attachDisableHandler(tr, chk, updateWideCount);
    }
  }));
  updateWideCount();
}

function updateUmatan(){
  umatanBody.innerHTML = "";
  umatanResults.length = 0;

  const rows = [...umatanTable.rows].slice(1);
  const A = [], B = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.cells[1].children[0].value),
      odds: r.cells[2].children[0].value
    };
    if(r.querySelector(".u1").checked) A.push(h);
    if(r.querySelector(".u2").checked) B.push(h);
  });

  let cnt = 0;
  A.forEach(a=>B.forEach(b=>{
    if(a.no === b.no) return;

    cnt++;
    umatanResults.push({
      no1:a.no, no2:b.no,
      name1:a.name, name2:b.name,
      odds1:formatOdds(a.odds),
      odds2:formatOdds(b.odds)
    });

    const tr = umatanBody.insertRow();
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

    <td><input type="checkbox" class="disable-row"></td>
    `;

    const chk = tr.querySelector(".disable-row");
    attachDisableHandler(tr, chk, updateUmatanCount);
  }));

  updateUmatanCount();
}

function updateUmaren(){
  umarenBody.innerHTML = "";
  umarenResults.length = 0;

  const rows = [...umarenTable.rows].slice(1);
  const A = [], B = [];

  rows.forEach(r=>{
    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.cells[1].children[0].value),
      odds: r.cells[2].children[0].value
    };
    if(r.querySelector(".r1").checked) A.push(h);
    if(r.querySelector(".r2").checked) B.push(h);
  });

  const used = new Set();
  let cnt = 0;

  A.forEach(a=>B.forEach(b=>{
    if(a.no === b.no) return;

    // ★ 順不同キー
    const [h1,h2] = Number(a.no)<Number(b.no) ? [a,b] : [b,a];
    const key = `${h1.no}-${h2.no}`;
    if(used.has(key)) return;
    used.add(key);

    cnt++;
    umarenResults.push({
      no1:h1.no, no2:h2.no,
      name1:h1.name, name2:h2.name,
      odds1:formatOdds(h1.odds),
      odds2:formatOdds(h2.odds)
    });

    const tr = umarenBody.insertRow();
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

    <td><input type="checkbox" class="disable-row"></td>
    `;

    const chk = tr.querySelector(".disable-row");
    attachDisableHandler(tr, chk, updateUmarenCount);
  }));

  updateUmarenCount();
}

function updateTansho(){
  tanshoBody.innerHTML = "";
  tanshoResults.length = 0;

  const rows = [...tanshoTable.rows].slice(1);
  let cnt = 0;

  rows.forEach(r=>{
    if(!r.querySelector(".t1").checked) return;

    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.cells[1].children[0].value),
      odds: r.cells[2].children[0].value
    };

    cnt++;
    tanshoResults.push({
      no: h.no,
      name: h.name,
      odds: formatOdds(h.odds)
    });

    tanshoBody.insertRow().innerHTML = `
    <tr>
    <td>${h.no}</td>
    <td>${h.name}</td>
    <td class="${oddsClass(h.odds)}">${formatOdds(h.odds)}</td>
    </tr>`;
  });

  tanshoCount.textContent = `${cnt} 点`;
}

function updateFukusho(){
  fukushoBody.innerHTML = "";
  fukushoResults.length = 0;

  const rows = [...fukushoTable.rows].slice(1);
  let cnt = 0;

  rows.forEach(r=>{
    if(!r.querySelector(".f1").checked) return;

    const h = {
      no: r.cells[0].textContent,
      name: safeText(r.cells[1].children[0].value),
      odds: r.cells[2].children[0].value
    };

    cnt++;
    fukushoResults.push({
      no: h.no,
      name: h.name,
      odds: formatOdds(h.odds)
    });

    fukushoBody.insertRow().innerHTML = `
    <tr>
    <td>${h.no}</td>
    <td>${h.name}</td>
    <td class="${oddsClass(h.odds)}">${formatOdds(h.odds)}</td>
    </tr>`;
  });

  fukushoCount.textContent = `${cnt} 点`;
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

      b1: triBoxTable.rows[i].querySelector(".b1")?.checked || false,
      b2: triBoxTable.rows[i].querySelector(".b2")?.checked || false,
      b3: triBoxTable.rows[i].querySelector(".b3")?.checked || false,

      w1: wideTable.rows[i].querySelector(".w1")?.checked || false,
      w2: wideTable.rows[i].querySelector(".w2")?.checked || false,

      u1: umatanTable.rows[i].querySelector(".u1")?.checked || false,
      u2: umatanTable.rows[i].querySelector(".u2")?.checked || false,

      r1: umarenTable.rows[i].querySelector(".r1")?.checked || false,
      r2: umarenTable.rows[i].querySelector(".r2")?.checked || false,

      t1: tanshoTable.rows[i].querySelector(".t1")?.checked || false,
      f1: fukushoTable.rows[i].querySelector(".f1")?.checked || false
    });
  }

  const resultDisabled = {
    trifecta: [...triBody.rows].map(r => r.querySelector(".disable-row")?.checked || false),
    trio:     [...triBoxBody.rows].map(r => r.querySelector(".disable-row")?.checked || false),
    wide:     [...wideBody.rows].map(r => r.querySelector(".disable-row")?.checked || false),
    umatan:   [...umatanBody.rows].map(r => r.querySelector(".disable-row")?.checked || false),
    umaren:   [...umarenBody.rows].map(r => r.querySelector(".disable-row")?.checked || false)
  };

  return { horses, resultDisabled };
}

// 保存済みレース一覧を更新
function refreshRaceList(){
  const sel = document.getElementById("raceSelect");
  sel.innerHTML = `<option value="">保存済みレース</option>`;

  Object.keys(localStorage)
    .filter(k => k.startsWith("betState_"))
    .forEach(k=>{
      const race = k.replace("betState_","");
      const opt = document.createElement("option");
      opt.value = race;
      opt.textContent = race;
      sel.appendChild(opt);
    });
}

// 状態保存
function saveStateByRace(){
  const race = document.getElementById("saveRaceName").value.trim();
  if(!race){
    alert("レース名を入力してください");
    return;
  }

  const data = {
    savedAt: Date.now(),
    state: buildStateObject()
  };

  localStorage.setItem(
    `betState_${race}`,
    JSON.stringify(data)
  );

  refreshRaceList();
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

    triBoxTable.rows[i+1].querySelector(".b1").checked = h.b1;
    triBoxTable.rows[i+1].querySelector(".b2").checked = h.b2;
    triBoxTable.rows[i+1].querySelector(".b3").checked = h.b3;

    wideTable.rows[i+1].querySelector(".w1").checked = h.w1;
    wideTable.rows[i+1].querySelector(".w2").checked = h.w2;

    umatanTable.rows[i+1].querySelector(".u1").checked = h.u1;
    umatanTable.rows[i+1].querySelector(".u2").checked = h.u2;

    umarenTable.rows[i+1].querySelector(".r1").checked = h.r1;
    umarenTable.rows[i+1].querySelector(".r2").checked = h.r2;

    tanshoTable.rows[i+1].querySelector(".t1").checked = h.t1;
    fukushoTable.rows[i+1].querySelector(".f1").checked = h.f1;
  });

  // 再計算
  updateTrifecta();
  updateTriBox();
  updateWide();
  updateUmatan();
  updateUmaren();
  updateTansho();
  updateFukusho();

  // 除外状態
  Object.entries(state.resultDisabled).forEach(([key,arr])=>{
    const body = {
      trifecta: triBody,
      trio: triBoxBody,
      wide: wideBody,
      umatan: umatanBody,
      umaren: umarenBody
    }[key];

    arr.forEach((v,i)=>{
      const chk = body.rows[i]?.querySelector(".disable-row");
      if(chk) chk.checked = v;
    });
  });
}

// 初期化処理（ページ起動時）
window.addEventListener("load", ()=>{
  refreshRaceList();
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

  // 保存一覧管理キーも削除（使っている場合）
  localStorage.removeItem("betState_list");

  alert("保存データをすべて削除しました。");

  // 保存一覧UIを更新している場合
  if(typeof updateSavedRaceList === "function"){
    updateSavedRaceList();
  }
}
