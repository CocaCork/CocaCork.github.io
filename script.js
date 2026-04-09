let pokemonData = [];


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


// データ表示
function showData(value, target) {

  const pokemon = pokemonData.find(p => {
    const label = p.form === "通常"
      ? p.name
      : `${p.name}(${p.form})`;
    return label === value;
  });

  if (!pokemon) {
    target.innerHTML = "";
    return;
  }

  target.innerHTML = `
    <b>タイプ:</b> 
    ${createTypeLabel(pokemon.type1)}
    ${createTypeLabel(pokemon.type2)}
    <br>
    
    <b>HP:</b> ${pokemon.hp}<br>
    
    <div class="stat-row">
    <div class="stat-box"><b>攻撃:</b> ${pokemon.atk}</div>
    <div class="stat-box"><b>特攻:</b> ${pokemon.spa}</div>
    </div>
    
    <div class="stat-row">
    <div class="stat-box"><b>防御:</b> ${pokemon.def}</div>
    <div class="stat-box"><b>特防:</b> ${pokemon.spd}</div>
    </div>
    
    <b>素早さ:</b> ${pokemon.spe}<br>
    
    <b>特性:</b> 
      ${pokemon.ability1 || ""}
      ${pokemon.ability2 || ""}
      ${pokemon.hidden ? `(夢:${pokemon.hidden})` : ""}
  `;
}
