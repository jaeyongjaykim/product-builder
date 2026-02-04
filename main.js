// Teachable Machine 모델 URL
const URL = "https://teachablemachine.withgoogle.com/models/sRJk5css6J/";

let model, webcam, maxPredictions;

// DOM 요소
const startScreen = document.getElementById('start-screen');
const cameraScreen = document.getElementById('camera-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const captureBtn = document.getElementById('capture-btn');
const retryBtn = document.getElementById('retry-btn');
const webcamContainer = document.getElementById('webcam-container');
const analyzingText = document.getElementById('analyzing-text');

// 동물상 설명
const animalDescriptions = {
    dog: {
        icon: '🐶',
        title: '강아지상',
        descriptions: [
            '당신은 친근하고 활발한 매력의 소유자!',
            '사람들에게 다가가기 쉽고 밝은 에너지를 가졌어요.',
            '충성스럽고 애정 표현이 풍부한 타입이에요.',
            '주변 사람들을 행복하게 만드는 힘이 있어요!'
        ]
    },
    cat: {
        icon: '🐱',
        title: '고양이상',
        descriptions: [
            '당신은 도도하고 신비로운 매력의 소유자!',
            '독립적이면서도 은근한 애교가 있어요.',
            '차분하고 우아한 분위기를 가졌어요.',
            '한번 마음을 열면 깊은 유대감을 형성해요!'
        ]
    }
};

// 시작 버튼 클릭
startBtn.addEventListener('click', async () => {
    startScreen.classList.add('hidden');
    cameraScreen.classList.remove('hidden');
    await init();
});

// 사진 찍기 버튼 클릭
captureBtn.addEventListener('click', async () => {
    captureBtn.classList.add('hidden');
    analyzingText.classList.remove('hidden');

    // 잠시 후 분석 결과 표시 (여러 프레임 분석)
    let predictions = [];
    for (let i = 0; i < 5; i++) {
        const prediction = await model.predict(webcam.canvas);
        predictions.push(prediction);
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 평균 계산
    const avgPrediction = predictions[0].map((p, idx) => {
        const avg = predictions.reduce((sum, pred) => sum + pred[idx].probability, 0) / predictions.length;
        return {
            className: p.className,
            probability: avg
        };
    });

    showResult(avgPrediction);
});

// 다시 테스트 버튼 클릭
retryBtn.addEventListener('click', async () => {
    resultScreen.classList.add('hidden');
    cameraScreen.classList.remove('hidden');
    captureBtn.classList.remove('hidden');
    analyzingText.classList.add('hidden');

    // 웹캠 다시 시작
    await webcam.play();
    window.requestAnimationFrame(loop);
});

// 모델 및 웹캠 초기화
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // 모델 로드
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // 웹캠 설정
    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    // 웹캠 캔버스 추가
    webcamContainer.innerHTML = '';
    webcamContainer.appendChild(webcam.canvas);

    // 사진 찍기 버튼 표시
    captureBtn.classList.remove('hidden');
}

// 웹캠 업데이트 루프
async function loop() {
    webcam.update();
    window.requestAnimationFrame(loop);
}

// 결과 표시
function showResult(prediction) {
    // 웹캠 정지
    webcam.stop();

    cameraScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // 결과 찾기 (강아지/고양이 중 높은 확률)
    let dogProb = 0;
    let catProb = 0;

    prediction.forEach(p => {
        const className = p.className.toLowerCase();
        if (className.includes('dog') || className.includes('강아지')) {
            dogProb = p.probability;
        } else if (className.includes('cat') || className.includes('고양이')) {
            catProb = p.probability;
        }
    });

    const isDog = dogProb > catProb;
    const animal = isDog ? animalDescriptions.dog : animalDescriptions.cat;
    const probability = isDog ? dogProb : catProb;

    // 결과 표시
    document.getElementById('result-animal-icon').textContent = animal.icon;
    document.getElementById('result-title').textContent = `당신은 ${animal.title}!`;
    document.getElementById('result-percentage').textContent = `${Math.round(probability * 100)}%`;

    // 랜덤 설명 선택
    const randomDesc = animal.descriptions[Math.floor(Math.random() * animal.descriptions.length)];
    document.getElementById('result-description').textContent = randomDesc;

    // 확률 바 표시
    const barsContainer = document.getElementById('probability-bars');
    barsContainer.innerHTML = `
        <div class="probability-item">
            <span class="probability-label">🐶 강아지</span>
            <div class="probability-bar-container">
                <div class="probability-bar dog" style="width: 0%">${Math.round(dogProb * 100)}%</div>
            </div>
        </div>
        <div class="probability-item">
            <span class="probability-label">🐱 고양이</span>
            <div class="probability-bar-container">
                <div class="probability-bar cat" style="width: 0%">${Math.round(catProb * 100)}%</div>
            </div>
        </div>
    `;

    // 애니메이션을 위해 약간의 딜레이 후 바 너비 설정
    setTimeout(() => {
        const dogBar = barsContainer.querySelector('.probability-bar.dog');
        const catBar = barsContainer.querySelector('.probability-bar.cat');
        dogBar.style.width = `${Math.round(dogProb * 100)}%`;
        catBar.style.width = `${Math.round(catProb * 100)}%`;
    }, 100);
}
