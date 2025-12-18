const table = document.getElementById("chkTable");
const output = document.getElementById("comboOutput");

// すべてのチェックボックスに change イベントを設定
table.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", updateCombinations);
});

// 初期表示
updateCombinations();

function getCheckedNumbers(colIndex) {
  const rows = table.rows;
  let result = [];
  
  for (let r = 1; r < rows.length; r++) {
    const cb = rows[r].cells[colIndex].querySelector("input");
    if (cb.checked) {
      result.push(rows[r].cells[0].innerText);
    }
  }
  return result;
}

function updateCombinations() {
  const first  = getCheckedNumbers(1); // 1着
  const second = getCheckedNumbers(2); // 2着
  const third  = getCheckedNumbers(3); // 3着
  
  let lines = [];
  
  first.forEach(f => {
    second.forEach(s => {
      third.forEach(t => {
        // ★ 同一馬の重複を除外
        if (f !== s && f !== t && s !== t) {
          lines.push(`${f}-${s}-${t}`);
        }
      });
    });
  });
  
  output.value = lines.join("\n");
}
