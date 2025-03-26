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
            // 少し遅れて次の問題を表示（アニメーションの代わり）
            setTimeout(() => {
                document.getElementById(`puzzle${puzzleNumber + 1}`).style.display = 'block';
                // 画面を少し下にスクロールして次の問題を見やすくする（任意）
                document.getElementById(`puzzle${puzzleNumber + 1}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500); // 0.5秒後
        } else {
            // 少し遅れて結果を表示
             setTimeout(() => {
                displayResult(true);
             }, 500);
        }
        document.getElementById(`answer${puzzleNumber}`).disabled = true;
        document.querySelector(`#puzzle${puzzleNumber} button`).disabled = true;

    } else {
        feedbackElement.textContent = "不正解。もう一度チームで情報を整理してみよう。";
        feedbackElement.className = 'feedback incorrect';
        // 不正解の時に少し入力欄を揺らすアニメーション（おまけ）
        const inputElement = document.getElementById(`answer${puzzleNumber}`);
        inputElement.classList.add('shake');
        setTimeout(() => {
            inputElement.classList.remove('shake');
        }, 500);

        if (puzzleNumber === 3) {
             setTimeout(() => {
                 displayResult(false);
             }, 500);
        }
    }
}

// 不正解時に揺れるCSSアニメーション (style.css に追加しても良い)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}`, styleSheet.cssRules.length);

styleSheet.insertRule(`
.shake {
  animation: shake 0.5s ease-in-out;
}`, styleSheet.cssRules.length);


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
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 結果表示時にスクロール

    // 前の設問を非表示にする（任意）
    // document.getElementById('puzzle1').style.display = 'none';
    // document.getElementById('puzzle2').style.display = 'none';
    // document.getElementById('puzzle3').style.display = 'none';
}
