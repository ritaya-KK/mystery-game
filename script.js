// --- 謎と解答の設定 ---
// 謎1：緯度経度 -> 場所 -> パスワード
// 例：33.93943 / 134.51015 は徳島県庁の緯度経度
const answerKey1 = "TOKUSHIMA"; // 例：徳島県庁 -> ローマ字読みなど（難易度調整）

// 謎2：証言の矛盾から最も怪しい人物を絞る
// 例：ささきが嘘をついており、何かを隠している可能性が高い
const answerKey2 = "ささき";

// 謎3：全ての情報から犯人を特定
// 例：赤いボタンは「あたえ」のジャケットのもの。金銭トラブルに加え、
// 立半に強引な協力を迫られていた（経理情報を利用するなど）。
// 緯度経度が示す場所が、以前二人が密会していた場所だった、など。
const answerKey3 = "あたえ";
const explanationText = `
犯人は【あたえ】でした。\n
【謎1解説】メモの数字は緯度経度を示していました。33.93943 / 134.51015 は徳島県庁の位置です。PCのパスワードはこれをローマ字にした「TOKUSHIMA」でした。（これはあくまで例です。場所やパスワードは自由に設定してください）\n
【謎2解説】ささきは「デスクに近づいていない」と証言しましたが、監視カメラ映像（PC内の情報）で彼が何かを拾う様子が映っていました。これは立半が落としたメモを拾っただけで、犯行とは直接結びつきません。しかし、この嘘が彼を一時的に最も怪しく見せました。\n
【謎3解説】決定的な証拠は、現場に落ちていた「赤いボタン」と、PC内のメールでした。ボタンはあたえのジャケットのものであり、メールから立半があたえに対して、経理情報を不正に利用するよう強引に迫っていたことが判明しました。あたえは金銭トラブルに加え、この強要に耐えかねて犯行に及んだのです。謎1の場所は、二人が過去に金銭の受け渡しをした場所でした。立半は倒れる間際、その場所を伝えようとしたのかもしれません。\n
つるい、たいしゅう、ちゅうえいの証言にも怪しい点はありましたが、決定的な証拠はありませんでした。（これらの人物に関するフェイク情報やミスリードをさらに加えると、より面白くなります）
`;

// --- ゲーム進行ロジック ---

function startGame() {
    document.getElementById('story').style.display = 'none';
    document.getElementById('puzzle1').style.display = 'block';
}

function checkAnswer(puzzleNumber) {
    const userAnswer = document.getElementById(`answer${puzzleNumber}`).value.trim();
    const feedbackElement = document.getElementById(`feedback${puzzleNumber}`);
    let isCorrect = false;
    let correctAnswer = '';

    if (puzzleNumber === 1) {
        correctAnswer = answerKey1;
        // 大文字小文字を区別しない比較
        if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
            isCorrect = true;
        }
    } else if (puzzleNumber === 2) {
        correctAnswer = answerKey2;
        if (userAnswer === correctAnswer) {
            isCorrect = true;
        }
    } else if (puzzleNumber === 3) {
        correctAnswer = answerKey3;
        if (userAnswer === correctAnswer) {
            isCorrect = true;
        }
    }

    if (isCorrect) {
        feedbackElement.textContent = "正解！次の謎に進もう。";
        feedbackElement.className = 'feedback correct';
        // 次のパズルを表示（最後の謎なら結果表示）
        if (puzzleNumber < 3) {
            document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
        } else {
            displayResult(true);
        }
        // 正解したら入力欄とボタンを無効化（任意）
        document.getElementById(`answer${puzzleNumber}`).disabled = true;
        document.querySelector(`#puzzle${puzzleNumber} button`).disabled = true;

    } else {
        feedbackElement.textContent = "不正解。もう一度チームで考えてみよう。";
        feedbackElement.className = 'feedback incorrect';
        if (puzzleNumber === 3) {
            displayResult(false); // 最終問題で不正解の場合も結果表示
        }
    }
}

function displayResult(isGameClear) {
    const resultSection = document.getElementById('result');
    const finalMessage = document.getElementById('finalMessage');
    const explanation = document.getElementById('explanation');

    if (isGameClear) {
        finalMessage.textContent = `おめでとう！見事、真犯人【${answerKey3}】を特定した！`;
        finalMessage.style.color = 'green';
    } else {
        finalMessage.textContent = `残念！犯人の特定には至らなかった...。正解は【${answerKey3}】でした。`;
        finalMessage.style.color = 'red';
    }
    explanation.innerText = explanationText; // innerTextで改行を反映
    resultSection.style.display = 'block';
}

// 注意：memo_image.png は別途用意する必要があります。
// 緯度経度で場所を検索するよう促す画像などが良いでしょう。
