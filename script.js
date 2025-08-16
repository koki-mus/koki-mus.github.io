document.addEventListener('DOMContentLoaded', () => {
    // 質問と結果の要素を取得
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const resetBtn = document.getElementById('reset-btn');

    // 全ての質問を取得
    const questions = document.querySelectorAll('.question');
    let currentQuestionIndex = 0; // 現在の質問番号を管理
    let answers = []; // 選択された回答を格納

    // 診断結果の組み合わせを定義
    const results = {
        'ABC': 'あなたは穏やかでマイペースな性格です。',
        'ACD': 'あなたはクリエイティブで革新的な思考の持ち主です。',
        'BDE': 'あなたは社交的でリーダーシップがあります。',
        'BFG': 'あなたは知的好奇心が旺盛で、探求心にあふれています。',
        'CHI': 'あなたは真面目で責任感が強いタイプです。',
        'GJI': 'あなたはユーモアがあり、周囲を楽しませる才能があります。',
        // 他の組み合わせもここに追加
        // 組み合わせが定義されていない場合は、デフォルトの結果を表示する
        'default': 'あなたの個性はとてもユニークです！'
    };

    // 回答ボタンのイベントリスナーを設定
    quizContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer-btn')) {
            const point = event.target.dataset.point;
            answers.push(point); // 回答を記録
            
            // 次の質問へ
            showNextQuestion();
        }
    });

    // 次の質問を表示する関数
    function showNextQuestion() {
        // 現在の質問を非表示
        questions[currentQuestionIndex].classList.add('hidden');

        currentQuestionIndex++;
        
        // 最後の質問でなければ、次の質問を表示
        if (currentQuestionIndex < questions.length) {
            questions[currentQuestionIndex].classList.remove('hidden');
        } else {
            // 全ての質問が終了したら結果を表示
            displayResult();
        }
    }

    // 診断結果を表示する関数
    function displayResult() {
        // 回答の組み合わせ文字列を作成
        const answersKey = answers.sort().join('');
        
        // 診断結果を判定
        const result = results[answersKey] || results['default'];
        
        resultText.textContent = result;
        
        // 診断エリアを非表示にし、結果エリアを表示
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    }

    // もう一度診断するボタンのイベントリスナー
    resetBtn.addEventListener('click', () => {
        // 全ての状態をリセット
        currentQuestionIndex = 0;
        answers = [];
        
        // 質問を初期状態に戻す
        questions.forEach((q, index) => {
            if (index === 0) {
                q.classList.remove('hidden');
            } else {
                q.classList.add('hidden');
            }
        });
        
        // 結果エリアを非表示にし、診断エリアを表示
        resultContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
    });
});
