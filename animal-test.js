// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/sRJk5css6J/";

let model;
let uploadedImage = null;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const previewScreen = document.getElementById('preview-screen');
const resultScreen = document.getElementById('result-screen');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');
const analyzeBtn = document.getElementById('analyze-btn');
const reselectBtn = document.getElementById('reselect-btn');
const retryBtn = document.getElementById('retry-btn');
const loadingText = document.getElementById('loading-text');
const buttonGroup = document.getElementById('button-group');

// Animal descriptions
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

// Upload area click
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// File input change
fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

// Drag and drop events
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

// Handle uploaded file
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        uploadedImage = previewImage;
        startScreen.classList.add('hidden');
        previewScreen.classList.remove('hidden');
        loadModel();
    };
    reader.readAsDataURL(file);
}

// Load model
async function loadModel() {
    if (model) return; // Already loaded

    loadingText.classList.remove('hidden');
    buttonGroup.classList.add('hidden');

    try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
    } catch (error) {
        console.error('Model load error:', error);
        alert('모델 로딩에 실패했습니다. 페이지를 새로고침해주세요.');
    }

    loadingText.classList.add('hidden');
    buttonGroup.classList.remove('hidden');
}

// Analyze button click
analyzeBtn.addEventListener('click', async () => {
    if (!model) {
        alert('모델이 아직 로딩되지 않았습니다. 잠시만 기다려주세요.');
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = '분석 중...';

    try {
        const prediction = await model.predict(previewImage);
        showResult(prediction);
    } catch (error) {
        console.error('Prediction error:', error);
        alert('분석에 실패했습니다. 다시 시도해주세요.');
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = '분석하기';
    }
});

// Reselect button click
reselectBtn.addEventListener('click', () => {
    previewScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    fileInput.value = '';
    uploadedImage = null;
});

// Retry button click
retryBtn.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    fileInput.value = '';
    uploadedImage = null;
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '분석하기';
});

// Show result
function showResult(prediction) {
    previewScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    // Find dog/cat probabilities
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

    // Display result
    document.getElementById('result-animal-icon').textContent = animal.icon;
    document.getElementById('result-title').textContent = `당신은 ${animal.title}!`;
    document.getElementById('result-percentage').textContent = `${Math.round(probability * 100)}%`;

    // Random description
    const randomDesc = animal.descriptions[Math.floor(Math.random() * animal.descriptions.length)];
    document.getElementById('result-description').textContent = randomDesc;

    // Probability bars
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

    // Animate bars after a delay
    setTimeout(() => {
        const dogBar = barsContainer.querySelector('.probability-bar.dog');
        const catBar = barsContainer.querySelector('.probability-bar.cat');
        dogBar.style.width = `${Math.round(dogProb * 100)}%`;
        catBar.style.width = `${Math.round(catProb * 100)}%`;
    }, 100);
}
