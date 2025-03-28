// --- 謎と解答の設定 ---
// 謎1：緯度経度 -> 場所 -> パスワード
// 35.6895 / 139.6917 は東京都庁の緯度経度
const answerKey1 = "TOCHOU"; // 東京都庁 -> TOCHOU (ローマ字大文字)

// 謎2：証言の矛盾から最も怪しい人物を絞る
// 動機とPC内の決定的情報から「あたえ」が最も怪しい
const answerKey2 = "あたえ";

// 謎3：全ての情報から犯人を特定
// 決定的な証拠（ボタン、チャットログ）と動機から犯人は「あたえ」
const answerKey3 = "あたえ";

// --- 解説テキスト ---
const explanationText = `
【解説】 真犯人は【あたえ】でした！

**【謎１】ダイイングメッセージ？の解読**
メモの数字「35.6895 / 139.6917」は、地図アプリなどで検索すると「東京都庁」の位置を示します。
PCのパスワードは、この場所の名称をローマ字（すべて大文字）にしたものなので、「TOCHOU」が正解でした。
これにより、立半のPCにアクセスし、重要な情報を得ることができました。チームでの情報検索・共有がポイントでしたね。

**【謎２】容疑者たちの証言と食い違う事実**
この段階で最も怪しい人物として、何人か候補が挙がったのではないでしょうか？
・**ささき:** 「デスクに近づいていない」という嘘をつき、メモを拾っていました。立半を心配して忠告に来たが、追い返されたことを隠していたようです。嘘は怪しいですが、これが直接犯行に結びつく証拠はありませんでした。メモを拾ったのは偶然の可能性が高いです。
・**あたえ:** 立半から借金があり、さらに不正への協力を強要されていたことがPCのチャットログから判明しました。強い動機があり、この段階で最も犯人である可能性が高いと考えられます。顔色が悪かったのも、これらのプレッシャーによるものでしょう。
・**つるい:** 立半への対抗心は強いですが、具体的な犯行計画や証拠は見つかりませんでした。監視カメラの記録も、口論の範囲を出ません。
・**たいしゅう、ちゅうえい:** それぞれ立半への不満や悩みはありましたが、アリバイがある程度しっかりしていました。（ちゅうえいは通話記録、たいしゅうは目撃証言）
チーム内で、「誰が一番怪しいか」「その根拠は何か」を議論することが重要でした。

**【謎３】決定的な証拠と真犯人**
最終的な決め手は、現場に落ちていた「赤いボタン」と、PC内の「チャットログ」でした。
・**赤いボタン:** これは、あたえが着ていたグレーのジャケットの袖についていたものと一致しました。立半ともみ合いになった際に取れたものと考えられます。（謎2の服装情報を思い出せましたか？）
・**チャットログ:** 立半があたえに対し、借金と経理情報悪用を持ち出して脅迫し、不正な取引への協力を強要していた動かぬ証拠です。
これらの証拠と強い動機（借金苦、脅迫からの逃亡、そしておそらくは契約書を奪うことによる状況の打開）から、犯人は【あたえ】であると特定できました。

立半は、あたえに襲われた後、最後の力を振り絞り、不正取引や密会に関連のある場所（東京都庁）を示すメモを残そうとしたのかもしれません。

このように、断片的な情報を集め、整理し、客観的な証拠と証言を結びつけていくことで、真実にたどり着くことができます。これはまさにチームで行う営業活動と同じですね！
`;

// --- ゲーム進行ロジック ---

function startGame() {
    // 要素が存在するか確認してから処理
    const storyElement = document.getElementById('story');
    const puzzle1Element = document.getElementById('puzzle1');
    if (storyElement && puzzle1Element) {
        storyElement.style.display = 'none';
        puzzle1Element.style.display = 'block';
        // ゲーム開始時に最初の問題が見えるようにスクロール（任意）
        puzzle1Element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log("startGame: ゲーム開始処理を実行しました。"); // 動作確認用ログ
    } else {
        console.error("startGame エラー: 必要な要素が見つかりません: #story または #puzzle1");
    }
}

function checkAnswer(puzzleNumber) {
    // 要素が存在するか確認
    const answerInput = document.getElementById(`answer${puzzleNumber}`);
    const feedbackElement = document.getElementById(`feedback${puzzleNumber}`);
    const nextPuzzleElement = document.getElementById(`puzzle${puzzleNumber + 1}`);
    const currentPuzzleButton = document.querySelector(`#puzzle${puzzleNumber} button`);

    // 要素が見つからない場合はエラーログを出力して処理中断
    if (!answerInput) {
        console.error(`checkAnswer エラー: 要素 #answer${puzzleNumber} が見つかりません。`);
        return;
    }
    if (!feedbackElement) {
        console.error(`checkAnswer エラー: 要素 #feedback${puzzleNumber} が見つかりません。`);
        return;
    }
    if (!currentPuzzleButton) {
        console.error(`checkAnswer エラー: パズル${puzzleNumber} のボタンが見つかりません。`);
        return;
    }
    // 次の問題や結果表示要素も念のためログで確認（ただし、これらが無くても途中までは動くはず）
    if (puzzleNumber < 3 && !nextPuzzleElement) {
        console.warn(`checkAnswer 警告: 次のパズル要素 #puzzle${puzzleNumber + 1} が見つかりません。`);
    }
    if (puzzleNumber === 3 && !document.getElementById('result')) {
         console.warn(`checkAnswer 警告: 結果表示要素 #result が見つかりません。`);
    }


    const userAnswer = answerInput.value.trim();
    let isCorrect = false;
    let correctAnswer = '';

    if (puzzleNumber === 1) {
        correctAnswer = answerKey1;
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

    // フィードバック表示リセット
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback'; // クラスをリセット

    console.log(`checkAnswer(${puzzleNumber}): ユーザー解答="${userAnswer}", 正解判定=${isCorrect}`); // 動作確認用ログ

    if (isCorrect) {
        feedbackElement.textContent = "正解！ 次の情報を確認しよう。";
        feedbackElement.classList.add('correct');

        answerInput.disabled = true;
        currentPuzzleButton.disabled = true;

        if (puzzleNumber < 3) {
            if (nextPuzzleElement) {
                setTimeout(() => {
                    nextPuzzleElement.style.display = 'block';
                    nextPuzzleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log(`checkAnswer(${puzzleNumber}): 次のパズル #puzzle${puzzleNumber + 1} を表示しました。`); // 動作確認用ログ
                }, 500);
            } else {
                 // 次のパズル要素がない場合も、エラーではなく最後の問題だったかのように結果表示を試みる
                 console.warn(`checkAnswer(${puzzleNumber}): 次のパズル要素が見つからないため、結果表示を試みます。`);
                 setTimeout(() => { displayResult(true); }, 500);
            }
        } else {
             setTimeout(() => {
                 displayResult(true);
                 console.log(`checkAnswer(${puzzleNumber}): 最終問題正解のため、結果を表示します。`); // 動作確認用ログ
                }, 500);
        }

    } else {
        feedbackElement.textContent = "不正解。もう一度チームで情報を整理してみよう。";
        feedbackElement.classList.add('incorrect');

        answerInput.classList.add('shake');
        setTimeout(() => {
            answerInput.classList.remove('shake');
        }, 400);

        if (puzzleNumber === 3) {
             setTimeout(() => {
                 displayResult(false);
                 console.log(`checkAnswer(${puzzleNumber}): 最終問題不正解のため、結果を表示します。`); // 動作確認用ログ
                }, 500);
        }
    }
}

function displayResult(isGameClear) {
    // 要素が存在するか確認
    const resultSection = document.getElementById('result');
    const finalMessage = document.getElementById('finalMessage');
    const explanation = document.getElementById('explanation');

    if (!resultSection || !finalMessage || !explanation) {
        console.error("displayResult エラー: 結果表示用の要素が見つかりません: #result, #finalMessage, または #explanation");
        return;
    }

    if (isGameClear) {
        finalMessage.textContent = `素晴らしい！チームで見事、真犯人【${answerKey3}】を突き止めた！`;
        finalMessage.style.color = 'green';
    } else {
        finalMessage.textContent = `残念！犯人の特定には至らなかった...。真犯人は【${answerKey3}】でした。`;
        finalMessage.style.color = 'red';
    }
    explanation.innerText = explanationText;
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log(`displayResult: 結果を表示しました (isGameClear=${isGameClear})`); // 動作確認用ログ

    // オプション：前の設問を非表示にする場合
    // const puzzle1 = document.getElementById('puzzle1');
    // const puzzle2 = document.getElementById('puzzle2');
    // const puzzle3 = document.getElementById('puzzle3');
    // if(puzzle1) puzzle1.style.display = 'none';
    // if(puzzle2) puzzle2.style.display = 'none';
    // if(puzzle3) puzzle3.style.display = 'none';
}

// ページ読み込み完了時に基本的な要素が存在するか確認する（デバッグ用）
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const elementsToCheck = ['story', 'puzzle1', 'puzzle2', 'puzzle3', 'result', 'answer1', 'feedback1', 'answer2', 'feedback2', 'answer3', 'feedback3', 'finalMessage', 'explanation'];
    let allElementsFound = true;
    elementsToCheck.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`初期チェックエラー: 要素 #${id} が見つかりません。HTMLを確認してください。`);
            allElementsFound = false;
        }
    });
    if (allElementsFound) {
        console.log("初期チェック: 必要な基本要素はすべて存在します。");
    } else {
         console.error("初期チェック: いくつかの基本要素が見つかりませんでした。HTMLのIDを確認してください。");
    }
    // ボタンのonclick属性が正しく設定されているかも確認（ただし、これは実行時エラーで検知されることが多い）
    const startButton = document.querySelector('#story button');
    if (startButton && startButton.getAttribute('onclick') !== 'startGame()') {
        console.warn("初期チェック警告: 捜査開始ボタンのonclick属性が 'startGame()' になっていない可能性があります。");
    }
    // 他のボタンも同様に確認可能
});
