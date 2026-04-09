let pokemonData = [];

const typeChart = {
  ノーマル: { いわ: 0.5, ゴースト: 0, はがね: 0.5 },
  ほのお: { くさ: 2, こおり: 2, むし: 2, はがね: 2, ほのお: 0.5, みず: 0.5, いわ: 0.5, ドラゴン: 0.5 },
  みず: { ほのお: 2, じめん: 2, いわ: 2, みず: 0.5, くさ: 0.5, ドラゴン: 0.5 },
  でんき: { みず: 2, ひこう: 2, でんき: 0.5, くさ: 0.5, ドラゴン: 0.5, じめん: 0 },
  くさ: { みず: 2, じめん: 2, いわ: 2, ほのお: 0.5, くさ: 0.5, どく: 0.5, ひこう: 0.5, むし: 0.5, ドラゴン: 0.5, はがね: 0.5 },
  こおり: { くさ: 2, じめん: 2, ひこう: 2, ドラゴン: 2, ほのお: 0.5, みず: 0.5, こおり: 0.5, はがね: 0.5 },
  かくとう: { ノーマル: 2, いわ: 2, はがね: 2, こおり: 2, あく: 2, どく: 0.5, ひこう: 0.5, エスパー: 0.5, むし: 0.5, フェアリー: 0.5, ゴースト: 0 },
  どく: { くさ: 2, フェアリー: 2, どく: 0.5, じめん: 0.5, いわ: 0.5, ゴースト: 0.5, はがね: 0 },
  じめん: { ほのお: 2, でんき: 2, どく: 2, いわ: 2, はがね: 2, くさ: 0.5, むし: 0.5, ひこう: 0 },
  ひこう: { くさ: 2, かくとう: 2, むし: 2, でんき: 0.5, いわ: 0.5, はがね: 0.5 },
  エスパー: { かくとう: 2, どく: 2, エスパー: 0.5, はがね: 0.5, あく: 0 },
  むし: { くさ: 2, エスパー: 2, あく: 2, ほのお: 0.5, かくとう: 0.5, どく: 0.5, ひこう: 0.5, ゴースト: 0.5, はがね: 0.5, フェアリー: 0.5 },
  いわ: { ほのお: 2, こおり: 2, ひこう: 2, むし: 2, かくとう: 0.5, じめん: 0.5, はがね: 0.5 },
  ゴースト: { エスパー: 2, ゴースト: 2, あく: 0.5, ノーマル: 0 },
  ドラゴン: { ドラゴン: 2, はがね: 0.5, フェアリー: 0 },
  あく: { エスパー: 2, ゴースト: 2, かくとう: 0.5, あく: 0.5, フェアリー: 0.5 },
  はがね: { こおり: 2, いわ: 2, フェアリー: 2, ほのお: 0.5, みず: 0.5, でんき: 0.5, はがね: 0.5 },
  フェアリー: { かくとう: 2, ドラゴン: 2, あく: 2, ほのお: 0.5, どく: 0.5, はがね: 0.5 }
};

const allTypes = Object.keys(typeChart);


// CSV読み込み
fetch("pokemon_data.csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);
    
    pokemonData = rows.map(row => {
      const cols = row.split(",");
      
      return {
        name: cols[0],
        form: cols[1],
        type1: cols[2],
        type2: cols[3],
        hp: cols[4],
        atk: cols[5],
        def: cols[6],
        spa: cols[7],
        spd: cols[8],
        spe: cols[9],
        ability1: cols[10],
        ability2: cols[11],
        hidden: cols[12]
      };
    });

    createList();
    createUI("left");
    createUI("right");
  });


// 候補リスト生成
function createList() {
  const list = document.getElementById("pokemonList");

  pokemonData.forEach(p => {
    const option = document.createElement("option");

    const label = p.form === "通常"
      ? p.name
      : `${p.name}(${p.form})`;

    option.value = label;
    list.appendChild(option);
  });
}


// UI生成（6枠）
function createUI(side) {
  const container = document.getElementById(side);

  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.className = "pokemon-block";

    const input = document.createElement("input");
    input.setAttribute("list", "pokemonList");
    input.placeholder = "ポケモン名";

    const dataDiv = document.createElement("div");
    dataDiv.className = "data";

    input.addEventListener("input", () => {
      showData(input.value, dataDiv);
    });

    div.appendChild(input);
    div.appendChild(dataDiv);
    container.appendChild(div);
  }
}


function createTypeLabel(type) {
  if (!type) return "";
  return `<span class="type type-${type}">${type}</span>`;
}


function renderTypes(types) {
  if (!types.length) return "-";
  return types.map(t => createTypeLabel(t)).join(" ");
}


function calcHP(base) {
  let value = base * 2;
  value = Math.floor(value + 31);
  value = Math.floor(value / 2);
  value = value + 60;
  return value;
}


function calcOther(base) {
  let value = base * 2;
  value = Math.floor(value + 31);
  value = Math.floor(value / 2);
  value = value + 5;
  return value;
}


function getWeakness(type1, type2) {
  const result = {
    x4: [],
    x2: [],
    x05: [],
    x025: [],
    x0: []
  };

  allTypes.forEach(attackType => {
    let multiplier = 1;

    [type1, type2].forEach(defType => {
      if (!defType) return;

      const chart = typeChart[attackType];
      if (chart && chart[defType] !== undefined) {
        multiplier *= chart[defType];
      }
    });

    if (multiplier === 0) result.x0.push(attackType);
    else if (multiplier === 4) result.x4.push(attackType);
    else if (multiplier === 2) result.x2.push(attackType);
    else if (multiplier === 0.5) result.x05.push(attackType);
    else if (multiplier === 0.25) result.x025.push(attackType);
  });

  return result;
}


// データ表示
function showData(value, target) {

  const pokemon = pokemonData.find(p => {
    const label = p.form === "通常"
      ? p.name
      : `${p.name}(${p.form})`;
    return label === value;
  });

  const weakness = getWeakness(pokemon.type1, pokemon.type2);

  if (!pokemon) {
    target.innerHTML = "";
    return;
  }

  target.innerHTML = `
    <b>タイプ:</b> 
    ${createTypeLabel(pokemon.type1)}
    ${createTypeLabel(pokemon.type2)}
    <br>
    
    <b>HP:</b> ${calcHP(Number(pokemon.hp))}<br>
    
    <div class="stat-row">
    <div class="stat-box"><b>攻撃:</b> ${calcOther(Number(pokemon.atk))}</div>
    <div class="stat-box"><b>特攻:</b> ${calcOther(Number(pokemon.spa))}</div>
    </div>
    
    <div class="stat-row">
    <div class="stat-box"><b>防御:</b> ${calcOther(Number(pokemon.def))}</div>
    <div class="stat-box"><b>特防:</b> ${calcOther(Number(pokemon.spd))}</div>
    </div>
    
    <b>素早さ:</b> ${calcOther(Number(pokemon.spe))}<br>
    
    <b>特性:</b>
    ${pokemon.ability1 || ""}
    ${pokemon.ability2 || ""}
    ${pokemon.hidden ? `(夢:${pokemon.hidden})` : ""}
    
    <b>弱点:</b><br>
    x4: ${renderTypes(weakness.x4)}<br>
    x2: ${renderTypes(weakness.x2)}<br>
    x0.5: ${renderTypes(weakness.x05)}<br>
    x0.25: ${renderTypes(weakness.x025)}<br>
    x0: ${renderTypes(weakness.x0)}<br>
  `;
}
