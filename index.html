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
    // 要素が存在するか確認してから処理（念のため）
    const storyElement = document.getElementById('story');
    const puzzle1Element = document.getElementById('puzzle1');
    if (storyElement && puzzle1Element) {
        storyElement.style.display = 'none';
        puzzle1Element.style.display = 'block';
        // ゲーム開始時に最初の問題が見えるようにスクロール（任意）
        puzzle1Element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.error("必要な要素が見つかりません: #story または #puzzle1");
    }
}

function checkAnswer(puzzleNumber) {
    // 要素が存在するか確認
    const answerInput = document.getElementById(`answer${puzzleNumber}`);
    const feedbackElement = document.getElementById(`feedback${puzzleNumber}`);
    const nextPuzzleElement = document.getElementById(`puzzle${puzzleNumber + 1}`);
    const resultElement = document.getElementById('result');
    const currentPuzzleButton = document.querySelector(`#puzzle${puzzleNumber} button`);

    if (!answerInput || !feedbackElement || !currentPuzzleButton) {
        console.error(`パズル${puzzleNumber}の要素が見つかりません。`);
        return; // 要素がなければ処理中断
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

    if (isCorrect) {
        feedbackElement.textContent = "正解！ 次の情報を確認しよう。";
        feedbackElement.classList.add('correct'); // 正解クラス追加

        // 入力欄とボタンを無効化
        answerInput.disabled = true;
        currentPuzzleButton.disabled = true;

        if (puzzleNumber < 3) {
            // 次の問題要素が存在するか確認
            if (nextPuzzleElement) {
                // 少し遅れて次の問題を表示
                setTimeout(() => {
                    nextPuzzleElement.style.display = 'block';
                    // 画面を少し下にスクロールして次の問題を見やすくする
                    nextPuzzleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500); // 0.5秒後
            } else {
                 console.error(`次のパズル要素 #puzzle${puzzleNumber + 1} が見つかりません。`);
                 // 最後の問題だったかのように結果を表示させることも検討できる
                 setTimeout(() => { displayResult(true); }, 500);
            }
        } else {
            // 最後の問題なら結果を表示
             setTimeout(() => { displayResult(true); }, 500);
        }

    } else {
        feedbackElement.textContent = "不正解。もう一度チームで情報を整理してみよう。";
        feedbackElement.classList.add('incorrect'); // 不正解クラス追加

        // 不正解の時に少し入力欄を揺らすアニメーション
        answerInput.classList.add('shake');
        // アニメーションが終わったらクラスを削除
        setTimeout(() => {
            answerInput.classList.remove('shake');
        }, 400); // アニメーション時間（CSSで指定した0.4s）に合わせる

        // 最終問題で不正解の場合も結果を表示
        if (puzzleNumber === 3) {
             setTimeout(() => { displayResult(false); }, 500);
        }
    }
}

function displayResult(isGameClear) {
    // 要素が存在するか確認
    const resultSection = document.getElementById('result');
    const finalMessage = document.getElementById('finalMessage');
    const explanation = document.getElementById('explanation');

    if (!resultSection || !finalMessage || !explanation) {
        console.error("結果表示用の要素が見つかりません: #result, #finalMessage, または #explanation");
        return; // 要素がなければ処理中断
    }

    if (isGameClear) {
        finalMessage.textContent = `素晴らしい！チームで見事、真犯人【${answerKey3}】を突き止めた！`;
        finalMessage.style.color = 'green';
    } else {
        finalMessage.textContent = `残念！犯人の特定には至らなかった...。真犯人は【${answerKey3}】でした。`;
        finalMessage.style.color = 'red';
    }
    explanation.innerText = explanationText; // innerTextで改行を反映
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 結果表示時にスクロール

    // オプション：前の設問を非表示にする場合
    // const puzzle1 = document.getElementById('puzzle1');
    // const puzzle2 = document.getElementById('puzzle2');
    // const puzzle3 = document.getElementById('puzzle3');
    // if(puzzle1) puzzle1.style.display = 'none';
    // if(puzzle2) puzzle2.style.display = 'none';
    // if(puzzle3) puzzle3.style.display = 'none';
}

// ページ読み込み完了後に処理を開始したい場合は、以下のコメントアウトを外す
/*
window.addEventListener('DOMContentLoaded', (event) => {
    // ゲーム開始ボタンにイベントリスナーを設定する場合など、
    // DOM要素へのアクセスが必要な初期化処理をここに入れる。
    // ただし、今回はstartGame()がボタンのonclickで呼ばれるため、必須ではない。
    console.log('DOM fully loaded and parsed');
});
*/
