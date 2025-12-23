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

function safeText(v){ return v && v.trim() !== "" ? v : "-"; }

function formatOdds(v){ return isNaN(v)||v===""?"-":Number(v).toFixed(1); }

function updateInputOddsColor(){
  const classes = [
    "bg-odds-very-low","bg-odds-low","bg-odds-mid-low",
    "bg-odds-mid-high","bg-odds-high","bg-odds-very-high"
  ];

  // 3連単
  [...triTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // 3連複
  [...triBoxTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // ワイド
  [...wideTable.rows].slice(1).forEach(r=>{
    const input = r.querySelector(".wOdds");
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // 馬単
  [...umatanTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // 馬連
  [...umarenTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // 単勝
  [...tanshoTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });

  // 複勝
  [...fukushoTable.rows].slice(1).forEach(r=>{
    const input = r.cells[2].children[0];
    const cls = oddsClass(input.value);
    input.classList.remove(...classes);
    if(input.value !== "" && cls){
      input.classList.add("bg-" + cls);
    }
  });
}

function oddsClass(v){
  v = Number(v);
  if (isNaN(v)) return "";
  if (v<=5) return "odds-very-low";
  if (v<=10) return "odds-low";
  if (v<=25) return "odds-mid-low";
  if (v<=50) return "odds-mid-high";
  if (v<=100) return "odds-high";
  return "odds-very-high";
}

function downloadCSV(data,name){
  if(!data.length) return;
  const csv=[Object.keys(data[0]).join(","),...data.map(o=>Object.values(o).join(","))].join("\n");
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  a.download=name+".csv";
  a.click();
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

[triTable, triBoxTable, wideTable, umatanTable, umarenTable, tanshoTable, fukushoTable].forEach(tbl=>{
  tbl.addEventListener("input",(e)=>{
    syncHorseInputs(e.currentTarget);
    updateTrifecta();
    updateTriBox();
    updateWide();
    updateUmatan();
    updateUmaren();
    updateTansho();
    updateFukusho();
    updateInputOddsColor();
  });
  tbl.addEventListener("change",(e)=>{
    syncHorseInputs(e.currentTarget);
    updateTrifecta();
    updateTriBox();
    updateWide();
    updateUmatan();
    updateUmaren();
    updateTansho();
    updateFukusho();
    updateInputOddsColor();
  });
});

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
      triBody.insertRow().innerHTML=`
      <tr>
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
      </tr>`;
    }
  })));
  triCount.textContent=`${cnt} 点`;
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

    triBoxBody.insertRow().innerHTML = `
    <tr>
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
    </tr>
    `;
  })));

  triBoxCount.textContent = `${cnt} 点`;
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
      wideBody.insertRow().innerHTML=`
      <tr>
      <td class="no-border-right">${h1.no}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${h2.no}</td>
      
      <td class="no-border-right">${h1.name}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left">${h2.name}</td>
      
      <td class="no-border-right ${oddsClass(h1.odds)}">${formatOdds(h1.odds)}</td>
      <td class="arrow-cell">→</td>
      <td class="no-border-left ${oddsClass(h2.odds)}">${formatOdds(h2.odds)}</td>
      </tr>`;
    }
  }));
  wideCount.textContent=`${cnt} 点`;
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

    umatanBody.insertRow().innerHTML = `
    <tr>
    <td class="no-border-right">${a.no}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left">${b.no}</td>
      
    <td class="no-border-right">${a.name}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left">${b.name}</td>
      
    <td class="no-border-right ${oddsClass(a.odds)}">${formatOdds(a.odds)}</td>
    <td class="arrow-cell">→</td>
    <td class="no-border-left ${oddsClass(b.odds)}">${formatOdds(b.odds)}</td>
    </tr>
    `;
  }));

  umatanCount.textContent = `${cnt} 点`;
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

    umarenBody.insertRow().innerHTML = `
    <tr>
    <td class="no-border-right">${h1.no}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${h2.no}</td>

    <td class="no-border-right">${h1.name}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left">${h2.name}</td>

    <td class="no-border-right ${oddsClass(h1.odds)}">${formatOdds(h1.odds)}</td>
    <td class="arrow-cell">-</td>
    <td class="no-border-left ${oddsClass(h2.odds)}">${formatOdds(h2.odds)}</td>
    </tr>`;
  }));

  umarenCount.textContent = `${cnt} 点`;
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

// ===== CSV読み込み機能 =====
function loadCSV(){
  const raceName = document.getElementById("raceName").value.trim();
  if(!raceName) return;

  fetch(`data/${raceName}.csv`)
    .then(res => {
      if(!res.ok) throw new Error("CSVファイルが見つかりません");
      return res.text();
    })
    .then(text=>{
      const lines = text.split("\n").map(l=>l.trim()).filter(l=>l);
      lines.forEach(line=>{
        const [no,name,odds] = line.split(",");
        const row = triTable.rows[Number(no)];
        if(row){
          row.cells[1].children[0].value = name;
          row.cells[2].children[0].value = odds;
        }
      });
      syncHorseInputs(triTable);
      updateTrifecta();
      updateTriBox();
      updateWide();
      updateUmatan();
      updateUmaren();
      updateTansho();
      updateFukusho();
      updateInputOddsColor();
    })
    .catch(err=>{ alert(err.message); });
}
