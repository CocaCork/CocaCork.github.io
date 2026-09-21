// ========================================
// 定数
// ========================================

const STORAGE_KEY = "keibaBetSavedRaces";

const MAX_HORSES = 18;


// ========================================
// データ
// ========================================

let formations = [];

let bets = [];


// ========================================
// DOM
// ========================================

const raceName =
    document.getElementById("raceName");

const raceDate =
    document.getElementById("raceDate");

const raceMemo =
    document.getElementById("raceMemo");

const betType =
    document.getElementById("betType");

const betAmount =
    document.getElementById("betAmount");

const formationArea =
    document.getElementById("formationArea");

const formationDescription =
    document.getElementById("formationDescription");

const formationCount =
    document.getElementById("formationCount");

const formationList =
    document.getElementById("formationList");

const betList =
    document.getElementById("betList");

const totalCount =
    document.getElementById("totalCount");

const totalAmount =
    document.getElementById("totalAmount");

const savedRaceList =
    document.getElementById("savedRaceList");


// ========================================
// 券種ごとの選択数
// ========================================

const POSITION_COUNT = {

    "単勝": 1,

    "複勝": 1,

    "馬連": 2,

    "馬単": 2,

    "ワイド": 2,

    "3連複": 3,

    "3連単": 3

};


// ========================================
// 券種変更
// ========================================

betType.addEventListener("change", () => {

    createFormationInputs();

    updateFormationCount();

});


// ========================================
// フォーメーション入力欄生成
// ========================================

function createFormationInputs() {

    formationArea.innerHTML = "";

    const type = betType.value;

    const positionCount =
        POSITION_COUNT[type];


    const positionNames =
        getPositionNames(type);


    formationDescription.textContent =
        getFormationDescription(type);


    for (
        let position = 0;
        position < positionCount;
        position++
    ) {

        const block =
            document.createElement("div");

        block.className =
            "position-block";


        const title =
            document.createElement("div");

        title.className =
            "position-title";

        title.textContent =
            positionNames[position];


        block.appendChild(title);


        const grid =
            document.createElement("div");

        grid.className =
            "horse-grid";


        for (
            let horse = 1;
            horse <= MAX_HORSES;
            horse++
        ) {

            const label =
                document.createElement("label");

            label.className =
                "horse-check";


            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.dataset.position =
                position;

            checkbox.value =
                horse;


            checkbox.addEventListener(
                "change",
                updateFormationCount
            );


            const text =
                document.createTextNode(
                    horse + "番"
                );


            label.appendChild(checkbox);

            label.appendChild(text);

            grid.appendChild(label);
        }


        block.appendChild(grid);

        formationArea.appendChild(block);
    }
}


// ========================================
// ポジション名
// ========================================

function getPositionNames(type) {

    switch (type) {

        case "単勝":
        case "複勝":

            return [
                "対象馬"
            ];


        case "馬連":
        case "ワイド":

            return [
                "1頭目",
                "2頭目"
            ];


        case "馬単":

            return [
                "1着",
                "2着"
            ];


        case "3連複":

            return [
                "1頭目",
                "2頭目",
                "3頭目"
            ];


        case "3連単":

            return [
                "1着",
                "2着",
                "3着"
            ];
    }

    return [];
}


// ========================================
// 説明
// ========================================

function getFormationDescription(type) {

    switch (type) {

        case "単勝":

            return "勝利すると予想する馬を選択してください。";

        case "複勝":

            return "3着以内に入ると予想する馬を選択してください。";

        case "馬連":

            return "1頭目・2頭目から1頭ずつ選択します。順不同です。";

        case "馬単":

            return "1着・2着を順番に選択します。";

        case "ワイド":

            return "1頭目・2頭目から1頭ずつ選択します。順不同です。";

        case "3連複":

            return "3つのグループから1頭ずつ選択します。順不同です。";

        case "3連単":

            return "1着・2着・3着を順番に選択します。";
    }

    return "";
}


// ========================================
// 選択馬取得
// ========================================

function getSelectedHorses(position) {

    return Array.from(
        document.querySelectorAll(
            `input[data-position="${position}"]:checked`
        )
    ).map(
        checkbox => Number(checkbox.value)
    );
}


// ========================================
// 組み合わせ生成
// ========================================

function generateCombinations() {

    const type =
        betType.value;


    const positionCount =
        POSITION_COUNT[type];


    const selections = [];


    for (
        let i = 0;
        i < positionCount;
        i++
    ) {

        selections.push(
            getSelectedHorses(i)
        );
    }


    if (
        selections.some(
            list => list.length === 0
        )
    ) {

        return [];
    }


    let results = [[]];


    selections.forEach(
        horses => {

            const newResults = [];


            results.forEach(
                result => {

                    horses.forEach(
                        horse => {

                            newResults.push(
                                [
                                    ...result,
                                    horse
                                ]
                            );

                        }
                    );

                }
            );


            results = newResults;
        }
    );


    // 同一馬が複数ポジションに
    // 入っている組み合わせを除外
    results =
        results.filter(
            combination =>
                new Set(combination).size ===
                combination.length
        );


    // 馬連・ワイド・3連複は
    // 順不同なので重複を削除
    if (
        type === "馬連" ||
        type === "ワイド" ||
        type === "3連複"
    ) {

        const unique =
            new Map();


        results.forEach(
            combination => {

                const sorted =
                    [...combination].sort(
                        (a, b) => a - b
                    );


                const key =
                    sorted.join("-");


                if (!unique.has(key)) {

                    unique.set(
                        key,
                        sorted
                    );
                }

            }
        );


        results =
            Array.from(
                unique.values()
            );
    }


    return results;
}


// ========================================
// 点数表示
// ========================================

function updateFormationCount() {

    const combinations =
        generateCombinations();


    formationCount.textContent =
        combinations.length;
}


// ========================================
// フォーメーション追加
// ========================================

document
    .getElementById("addFormationButton")
    .addEventListener(
        "click",
        addFormation
    );


function addFormation() {

    const type =
        betType.value;


    const amount =
        Number(betAmount.value);


    if (!amount || amount < 100) {

        alert(
            "購入金額を100円以上で入力してください。"
        );

        return;
    }


    if (amount % 100 !== 0) {

        alert(
            "購入金額は100円単位で入力してください。"
        );

        return;
    }


    const selections = [];


    for (
        let position = 0;
        position < POSITION_COUNT[type];
        position++
    ) {

        const horses =
            getSelectedHorses(position);


        if (horses.length === 0) {

            alert(
                "すべての枠で1頭以上選択してください。"
            );

            return;
        }


        selections.push(horses);
    }


    const combinations =
        generateCombinations();


    if (combinations.length === 0) {

        alert(
            "有効な買い目がありません。"
        );

        return;
    }


    const formation = {

        id: Date.now(),

        type: type,

        selections:
            structuredClone(selections),

        amount: amount,

        combinations:
            structuredClone(combinations)

    };


    formations.push(formation);


    // 買い目を追加
    combinations.forEach(
        combination => {

            bets.push({

                id:
                    Date.now() +
                    Math.random(),

                type:
                    type,

                numbers:
                    combination.join(
                        getSeparator(type)
                    ),

                horses:
                    combination,

                amount:
                    amount,

                formationId:
                    formation.id

            });

        }
    );


    renderFormations();

    renderBets();

    clearFormationChecks();

}


// ========================================
// 区切り文字
// ========================================

function getSeparator(type) {

    if (type === "馬単") {
        return " → ";
    }

    if (type === "3連単") {
        return " → ";
    }

    return "-";
}


// ========================================
// チェック解除
// ========================================

function clearFormationChecks() {

    document
        .querySelectorAll(
            "#formationArea input[type='checkbox']"
        )
        .forEach(
            checkbox => {
                checkbox.checked = false;
            }
        );


    updateFormationCount();
}


// ========================================
// フォーメーション表示
// ========================================

function renderFormations() {

    formationList.innerHTML = "";


    if (formations.length === 0) {

        formationList.innerHTML =
            '<p class="empty-message">フォーメーションがありません</p>';

        return;
    }


    formations.forEach(
        (formation, index) => {

            const item =
                document.createElement("div");

            item.className =
                "formation-item";


            const type =
                document.createElement("div");

            type.className =
                "formation-type";

            type.textContent =
                formation.type;


            const text =
                document.createElement("div");

            text.className =
                "formation-text";

            text.innerHTML =
                createFormationText(
                    formation
                );


            const button =
                document.createElement("button");

            button.className =
                "delete-formation";

            button.textContent =
                "削除";


            button.addEventListener(
                "click",
                () => {

                    deleteFormation(
                        formation.id
                    );

                }
            );


            item.appendChild(type);

            item.appendChild(text);

            item.appendChild(button);


            formationList.appendChild(item);
        }
    );
}


// ========================================
// フォーメーション文字列
// ========================================

function createFormationText(
    formation
) {

    const names =
        getPositionNames(
            formation.type
        );


    const parts =
        formation.selections.map(
            (horses, index) => {

                return `
                    <strong>
                        ${escapeHtml(names[index])}
                    </strong>
                    ：
                    ${horses
                        .map(
                            horse =>
                                horse + "番"
                        )
                        .join("・")}
                `;

            }
        );


    return `
        ${parts.join("　/　")}
        <br>
        ${formation.combinations.length}点
        ×
        ${formation.amount.toLocaleString()}円
        =
        ${(formation.combinations.length *
            formation.amount).toLocaleString()}円
    `;
}


// ========================================
// フォーメーション削除
// ========================================

function deleteFormation(id) {

    const formation =
        formations.find(
            item => item.id === id
        );


    if (!formation) {
        return;
    }


    if (
        !confirm(
            "このフォーメーションを削除しますか？"
        )
    ) {

        return;
    }


    formations =
        formations.filter(
            item => item.id !== id
        );


    bets =
        bets.filter(
            bet =>
                bet.formationId !== id
        );


    renderFormations();

    renderBets();
}


// ========================================
// 買い目表示
// ========================================

function renderBets() {

    betList.innerHTML = "";


    if (bets.length === 0) {

        betList.innerHTML =
            '<p class="empty-message">買い目がありません</p>';

        totalCount.textContent = "0";

        totalAmount.textContent = "0";

        return;
    }


    let total = 0;


    bets.forEach(
        (bet, index) => {

            total += bet.amount;


            const item =
                document.createElement("div");

            item.className =
                "bet-item";


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
        }
    );


    totalCount.textContent =
        bets.length.toLocaleString();


    totalAmount.textContent =
        total.toLocaleString();


    document
        .querySelectorAll(".delete-bet")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        const bet =
                            bets[index];


                        // フォーメーション由来なら
                        // フォーメーションごと削除
                        if (
                            bet &&
                            bet.formationId
                        ) {

                            deleteFormation(
                                bet.formationId
                            );

                            return;
                        }


                        bets.splice(
                            index,
                            1
                        );


                        renderBets();

                    }
                );
            }
        );
}


// ========================================
// レース保存
// ========================================

document
    .getElementById("saveButton")
    .addEventListener(
        "click",
        saveRace
    );


function saveRace() {

    const name =
        raceName.value.trim();


    if (!name) {

        alert(
            "レース名を入力してください。"
        );

        return;
    }


    if (bets.length === 0) {

        alert(
            "フォーメーションを1つ以上追加してください。"
        );

        return;
    }


    const savedRaces =
        getSavedRaces();


    const raceData = {

        id: Date.now(),

        name: name,

        date:
            raceDate.value,

        memo:
            raceMemo.value,

        formations:
            structuredClone(formations),

        bets:
            structuredClone(bets),

        savedAt:
            new Date().toISOString()

    };


    savedRaces.push(
        raceData
    );


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedRaces)
    );


    renderSavedRaces();


    alert(
        "レースを保存しました。"
    );
}


// ========================================
// 保存データ取得
// ========================================

function getSavedRaces() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


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

    const savedRaces =
        getSavedRaces();


    savedRaceList.innerHTML = "";


    if (savedRaces.length === 0) {

        savedRaceList.innerHTML =
            '<p class="empty-message">保存されているレースがありません</p>';

        return;
    }


    savedRaces
        .slice()
        .reverse()
        .forEach(
            race => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "saved-race";


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


                savedRaceList.appendChild(
                    item
                );
            }
        );


    document
        .querySelectorAll(".load-button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        loadRace(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-race-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteRace(
                            Number(
                                button.dataset.id
                            )
                        );

                    }
                );

            }
        );
}


// ========================================
// レース呼び出し
// ========================================

function loadRace(id) {

    const savedRaces =
        getSavedRaces();


    const race =
        savedRaces.find(
            item => item.id === id
        );


    if (!race) {
        return;
    }


    raceName.value =
        race.name || "";


    raceDate.value =
        race.date || "";


    raceMemo.value =
        race.memo || "";


    formations =
        structuredClone(
            race.formations || []
        );


    bets =
        structuredClone(
            race.bets || []
        );


    renderFormations();

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

    if (
        !confirm(
            "このレースを削除しますか？"
        )
    ) {

        return;
    }


    let savedRaces =
        getSavedRaces();


    savedRaces =
        savedRaces.filter(
            race =>
                race.id !== id
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

document
    .getElementById("clearButton")
    .addEventListener(
        "click",
        () => {

            if (
                !confirm(
                    "現在の入力内容をすべてクリアしますか？"
                )
            ) {

                return;
            }


            raceName.value = "";

            raceDate.value = "";

            raceMemo.value = "";

            formations = [];

            bets = [];


            clearFormationChecks();

            renderFormations();

            renderBets();
        }
    );


// ========================================
// HTMLエスケープ
// ========================================

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;
}


// ========================================
// 初期表示
// ========================================

createFormationInputs();

renderFormations();

renderBets();

renderSavedRaces();
