// --- 謎と解答の設定 ---
// 謎1：緯度経度 -> 場所 -> パスワード
// 35.6895 / 139.6917 は東京都庁の緯度経度
const answerKey1 = "TOCHOU"; // 東京都庁 -> TOCHOU (ローマ字大文字)

// 謎2：証言の矛盾から最も怪しい人物を絞る
// この段階では、嘘をついている「ささき」や、動機が明らかな「あたえ」が特に怪しく見える
// ゲームの流れとして、一旦ミスリードされやすい「ささき」を正解とするのも良いが、
// より直接的な動機を持つ「あたえ」をこの段階での正解としても良い。
// ここでは、より伏線が露骨な「あたえ」を中間解答とする。（研修の意図に合わせて変更可能）
const answerKey2 = "あたえ"; // もしくは「ささき」でも可。解説で両方に触れる。

// 謎3：全ての情報から犯人を特定
// 決定的な証拠（ボタン、チャットログ）と動機から犯人は「あたえ」
const answerKey3 = "あたえ";

// --- 解説テキスト ---
// より詳細な解説に変更
const explanationText = `
【解説】 真犯人は【あたえ】でした！

**【謎１】ダイイングメッセージ？の解読**
メモの数字「35.6895 / 139.6917」は、地図アプリなどで検索すると「東京都庁」の位置を示します。
PCのパスワードは、この場所の名称をローマ字（すべて大文字）にしたものなので、「TOCHOU」が正解でした。
これにより、立半のPCにアクセスし、重要な情報を得ることができました。チームでの情報検索・共有がポイントでしたね。

**【謎２】容疑者たちの証言と食い違う事実**
この段階で最も怪しい人物として、何人か候補が挙がったのではないでしょうか？
・**ささき:** 「デスクに近づいていない」という嘘をつき、メモを拾っていました。立半を心配して忠告に来たが、追い返されたことを隠していたようです。嘘は怪しいですが、これが直接犯行に結びつく証拠はありませんでした。メモを拾ったのは偶然の可能性が高いです。
・**あたえ:** 立半から借金があり、さらに不正への協力を強要されていたことがPCのチャットログから判明しました。強い動機があり、この段階で最も犯人である可能性が高いと考えられます。（解答としては「あたえ」または、嘘をついていた「ささき」のどちらかで迷ったかもしれません）
・**つるい:** 立半への対抗心は強いですが、具体的な犯行計画や証拠は見つかりませんでした。
・**たいしゅう、ちゅうえい:** それぞれ立半への不満や悩みはありましたが、アリバイがある程度しっかりしていました。
チーム内で、「誰が一番怪しいか」「その根拠は何か」を議論することが重要でした。

**【謎３】決定的な証拠と真犯人**
最終的な決め手は、現場に落ちていた「赤いボタン」と、PC内の「チャットログ」でした。
・**赤いボタン:** これは、あたえが着ていたグレーのジャケットの袖についていたものと一致しました。立半ともみ合いになった際に取れたものと考えられます。
・**チャットログ:** 立半があたえに対し、借金と経理情報悪用を持ち出して脅迫し、不正な取引への協力を強要していた動かぬ証拠です。
これらの証拠と強い動機（借金苦、脅迫からの逃亡、そしておそらくは契約書を奪うことによる状況の打開）から、犯人は【あたえ】であると特定できました。

立半は、あたえに襲われた後、最後の力を振り絞り、不正取引や密会に関連のある場所（東京都庁）を示すメモを残そうとしたのかもしれません。

このように、断片的な情報を集め、整理し、客観的な証拠と証言を結びつけていくことで、真実にたどり着くことができます。これはまさにチームで行う営業活動と同じですね！
`;

// --- ゲーム進行ロジック ---
// (変更なし)

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
         // 謎2は「あたえ」または「ささき」を許容する場合（任意）
        // if (userAnswer === answerKey2 || userAnswer === "ささき") {
        //     isCorrect = true;
        // }
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
        feedbackElement.textContent = "正解！ 次の情報を確認しよう。";
        feedbackElement.className = 'feedback correct';
        if (puzzleNumber < 3) {
            document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
        } else {
            displayResult(true);
        }
        document.getElementById(`answer${puzzleNumber}`).disabled = true;
        document.querySelector(`#puzzle${puzzleNumber} button`).disabled = true;

    } else {
        feedbackElement.textContent = "不正解。もう一度チームで情報を整理してみよう。";
        feedbackElement.className = 'feedback incorrect';
        if (puzzleNumber === 3) {
            displayResult(false);
        }
    }
}

function displayResult(isGameClear) {
    const resultSection = document.getElementById('result');
    const finalMessage = document.getElementById('finalMessage');
    const explanation = document.getElementById('explanation');

    if (isGameClear) {
        finalMessage.textContent = `素晴らしい！チームで見事、真犯人【${answerKey3}】を突き止めた！`;
        finalMessage.style.color = 'green';
    } else {
        finalMessage.textContent = `残念！犯人の特定には至らなかった...。真犯人は【${answerKey3}】でした。`;
        finalMessage.style.color = 'red';
    }
    explanation.innerText = explanationText; // innerTextで改行を反映
    resultSection.style.display = 'block';

    // 前の設問を非表示にする（任意）
    document.getElementById('puzzle1').style.display = 'none';
    document.getElementById('puzzle2').style.display = 'none';
    document.getElementById('puzzle3').style.display = 'none';
}
