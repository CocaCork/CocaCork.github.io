// ========================================
// データ
// ========================================

let bets = [];

const STORAGE_KEY = "keibaBetSavedRaces";


// ========================================
// DOM
// ========================================

const raceName = document.getElementById("raceName");
const raceDate = document.getElementById("raceDate");
const raceMemo = document.getElementById("raceMemo");

const betType = document.getElementById("betType");
const betNumbers = document.getElementById("betNumbers");
const betAmount = document.getElementById("betAmount");

const addBetButton = document.getElementById("addBetButton");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");

const betList = document.getElementById("betList");
const totalAmount = document.getElementById("totalAmount");
const savedRaceList = document.getElementById("savedRaceList");


// ========================================
// 買い目追加
// ========================================

addBetButton.addEventListener("click", () => {

    const type = betType.value;
    const numbers = betNumbers.value.trim();
    const amount = Number(betAmount.value);

    if (!numbers) {
        alert("買い目を入力してください。");
        return;
    }

    if (!amount || amount < 100) {
        alert("購入金額を100円以上で入力してください。");
        return;
    }

    if (amount % 100 !== 0) {
        alert("購入金額は100円単位で入力してください。");
        return;
    }

    bets.push({
        type: type,
        numbers: numbers,
        amount: amount
    });

    betNumbers.value = "";
    betAmount.value = "";

    renderBets();
});


// ========================================
// 買い目一覧表示
// ========================================

function renderBets() {

    betList.innerHTML = "";

    if (bets.length === 0) {

        betList.innerHTML =
            '<p class="empty-message">買い目がありません</p>';

        totalAmount.textContent = "0";

        return;
    }

    let total = 0;

    bets.forEach((bet, index) => {

        total += bet.amount;

        const item = document.createElement("div");

        item.className = "bet-item";

        item.innerHTML = `
            <div class="bet-type">
                ${escapeHtml(bet.type)}
            </div>

            <div class="bet-numbers">
                ${escapeHtml(bet.numbers)}
            </div>

            <div class="bet-amount">
                ${bet.amount.toLocaleString()}円
            </div>

            <button
                class="delete-bet"
                data-index="${index}">
                削除
            </button>
        `;

        betList.appendChild(item);
    });

    totalAmount.textContent = total.toLocaleString();

    // 削除ボタン
    document.querySelectorAll(".delete-bet").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            bets.splice(index, 1);

            renderBets();
        });

    });
}


// ========================================
// レース保存
// ========================================

saveButton.addEventListener("click", () => {

    const name = raceName.value.trim();

    if (!name) {
        alert("レース名を入力してください。");
        return;
    }

    if (bets.length === 0) {
        alert("買い目を1つ以上追加してください。");
        return;
    }

    const savedRaces = getSavedRaces();

    const raceData = {
        id: Date.now(),

        name: name,

        date: raceDate.value,

        memo: raceMemo.value,

        bets: structuredClone(bets),

        savedAt: new Date().toISOString()
    };

    savedRaces.push(raceData);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedRaces)
    );

    renderSavedRaces();

    alert("レースを保存しました。");
});


// ========================================
// 保存済みレース取得
// ========================================

function getSavedRaces() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {

        console.error(error);

        return [];
    }
}


// ========================================
// 保存済みレース表示
// ========================================

function renderSavedRaces() {

    const savedRaces = getSavedRaces();

    savedRaceList.innerHTML = "";

    if (savedRaces.length === 0) {

        savedRaceList.innerHTML =
            '<p class="empty-message">保存されているレースがありません</p>';

        return;
    }

    // 新しいものを上に
    savedRaces
        .slice()
        .reverse()
        .forEach(race => {

            const item = document.createElement("div");

            item.className = "saved-race";

            item.innerHTML = `

                <div>
                    <div class="saved-race-name">
                        ${escapeHtml(race.name)}
                    </div>

                    <div class="saved-race-date">
                        ${race.date || "日付なし"}
                    </div>
                </div>

                <button
                    class="load-button"
                    data-id="${race.id}">
                    呼び出す
                </button>

                <button
                    class="delete-race-button"
                    data-id="${race.id}">
                    削除
                </button>
            `;

            savedRaceList.appendChild(item);
        });


    // 呼び出し
    document.querySelectorAll(".load-button").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            loadRace(id);
        });

    });


    // 削除
    document.querySelectorAll(".delete-race-button").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            deleteRace(id);
        });

    });
}


// ========================================
// レース呼び出し
// ========================================

function loadRace(id) {

    const savedRaces = getSavedRaces();

    const race = savedRaces.find(
        item => item.id === id
    );

    if (!race) {
        return;
    }

    raceName.value = race.name;

    raceDate.value = race.date || "";

    raceMemo.value = race.memo || "";

    bets = structuredClone(race.bets || []);

    renderBets();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// レース削除
// ========================================

function deleteRace(id) {

    if (!confirm("このレースを削除しますか？")) {
        return;
    }

    let savedRaces = getSavedRaces();

    savedRaces = savedRaces.filter(
        race => race.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedRaces)
    );

    renderSavedRaces();
}


// ========================================
// 入力クリア
// ========================================

clearButton.addEventListener("click", () => {

    if (!confirm("現在の入力内容をすべてクリアしますか？")) {
        return;
    }

    raceName.value = "";
    raceDate.value = "";
    raceMemo.value = "";

    bets = [];

    renderBets();
});


// ========================================
// HTMLエスケープ
// ========================================

function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// ========================================
// 初期表示
// ========================================

renderBets();

renderSavedRaces();
