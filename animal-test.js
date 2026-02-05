// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/sRJk5css6J/";

let model;
let uploadedImage = null;

// Get system language preference
function getSystemLang() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('ko') ? 'ko' : 'en';
}

let currentLang = localStorage.getItem('lang') || getSystemLang();

// UI Text translations
const uiText = {
    ko: {
        pageTitle: '동물상 테스트 - 나는 강아지상? 고양이상?',
        backLink: '← 메인으로 돌아가기',
        mainTitle: '동물상 테스트',
        subtitle: '나는 강아지상일까? 고양이상일까?',
        description: '사진을 업로드해서<br>어떤 동물과 닮았는지 알려드려요!',
        uploadText: '이미지를 드래그하거나 클릭하여 업로드',
        uploadHint: 'JPG, PNG 파일 지원',
        loadingModel: '모델 로딩 중...',
        analyzeBtn: '분석하기',
        analyzingBtn: '분석 중...',
        reselectBtn: '다른 사진 선택',
        retryBtn: '다시 테스트하기',
        resultYouAre: '당신은',
        dogLabel: '🐶 강아지',
        catLabel: '🐱 고양이',
        imageOnly: '이미지 파일만 업로드 가능합니다.',
        modelLoadFailed: '모델 로딩에 실패했습니다. 페이지를 새로고침해주세요.',
        modelNotReady: '모델이 아직 로딩되지 않았습니다. 잠시만 기다려주세요.',
        analysisFailed: '분석에 실패했습니다. 다시 시도해주세요.'
    },
    en: {
        pageTitle: 'Animal Face Test - Are you a puppy or a kitty?',
        backLink: '← Back to Main',
        mainTitle: 'Animal Face Test',
        subtitle: 'Are you a puppy face or a kitty face?',
        description: 'Upload a photo and<br>find out which animal you look like!',
        uploadText: 'Drag & drop or click to upload',
        uploadHint: 'JPG, PNG files supported',
        loadingModel: 'Loading model...',
        analyzeBtn: 'Analyze',
        analyzingBtn: 'Analyzing...',
        reselectBtn: 'Choose Another Photo',
        retryBtn: 'Try Again',
        resultYouAre: 'You are',
        dogLabel: '🐶 Puppy',
        catLabel: '🐱 Kitty',
        imageOnly: 'Only image files can be uploaded.',
        modelLoadFailed: 'Failed to load model. Please refresh the page.',
        modelNotReady: 'Model is still loading. Please wait a moment.',
        analysisFailed: 'Analysis failed. Please try again.'
    }
};

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
    ko: {
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
    },
    en: {
        dog: {
            icon: '🐶',
            title: 'Puppy Face',
            descriptions: [
                'You have a friendly and lively charm!',
                'You radiate bright energy and are easy to approach.',
                'You are loyal and express affection openly.',
                'You have the power to make people around you happy!'
            ]
        },
        cat: {
            icon: '🐱',
            title: 'Kitty Face',
            descriptions: [
                'You have a mysterious and elegant charm!',
                'Independent yet subtly adorable.',
                'You have a calm and graceful aura.',
                'Once you open up, you form deep connections!'
            ]
        }
    }
};

// Update language function
function updateLanguage() {
    const text = uiText[currentLang];
    document.documentElement.lang = currentLang;

    document.getElementById('page-title').textContent = text.pageTitle;
    document.getElementById('back-link').textContent = text.backLink;
    document.getElementById('main-title').textContent = text.mainTitle;
    document.getElementById('subtitle').textContent = text.subtitle;
    document.getElementById('description').innerHTML = text.description;
    document.getElementById('upload-text').textContent = text.uploadText;
    document.getElementById('upload-hint').textContent = text.uploadHint;
    document.getElementById('loading-message').textContent = text.loadingModel;
    document.getElementById('analyze-btn').textContent = text.analyzeBtn;
    document.getElementById('reselect-btn').textContent = text.reselectBtn;
    document.getElementById('retry-btn').textContent = text.retryBtn;
}

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
        alert(uiText[currentLang].imageOnly);
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
        alert(uiText[currentLang].modelLoadFailed);
    }

    loadingText.classList.add('hidden');
    buttonGroup.classList.remove('hidden');
}

// Analyze button click
analyzeBtn.addEventListener('click', async () => {
    if (!model) {
        alert(uiText[currentLang].modelNotReady);
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = uiText[currentLang].analyzingBtn;

    try {
        const prediction = await model.predict(previewImage);
        showResult(prediction);
    } catch (error) {
        console.error('Prediction error:', error);
        alert(uiText[currentLang].analysisFailed);
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = uiText[currentLang].analyzeBtn;
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
    analyzeBtn.textContent = uiText[currentLang].analyzeBtn;
});

// Show result
function showResult(prediction) {
    previewScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const text = uiText[currentLang];
    const descriptions = animalDescriptions[currentLang];

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
    const animal = isDog ? descriptions.dog : descriptions.cat;
    const probability = isDog ? dogProb : catProb;

    // Display result
    document.getElementById('result-animal-icon').textContent = animal.icon;
    document.getElementById('result-title').textContent = `${text.resultYouAre} ${animal.title}!`;
    document.getElementById('result-percentage').textContent = `${Math.round(probability * 100)}%`;

    // Random description
    const randomDesc = animal.descriptions[Math.floor(Math.random() * animal.descriptions.length)];
    document.getElementById('result-description').textContent = randomDesc;

    // Probability bars
    const barsContainer = document.getElementById('probability-bars');
    barsContainer.innerHTML = `
        <div class="probability-item">
            <span class="probability-label">${text.dogLabel}</span>
            <div class="probability-bar-container">
                <div class="probability-bar dog" style="width: 0%">${Math.round(dogProb * 100)}%</div>
            </div>
        </div>
        <div class="probability-item">
            <span class="probability-label">${text.catLabel}</span>
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

// Initialize language on page load
updateLanguage();
