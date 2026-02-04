const generatorBtn = document.getElementById('generator-btn');
const menuContainer = document.querySelector('.menu-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const mainTitle = document.getElementById('main-title');

// Unified Menu Data
const menuItems = [
    { ko: "김치찌개", en: "Kimchi Stew" },
    { ko: "된장찌개", en: "Soybean Paste Stew" },
    { ko: "삼겹살", en: "Grilled Pork Belly BBQ" },
    { ko: "치킨", en: "Fried Chicken" },
    { ko: "피자", en: "Pizza" },
    { ko: "햄버거", en: "Hamburger" },
    { ko: "초밥", en: "Sushi" },
    { ko: "파스타", en: "Pasta" },
    { ko: "떡볶이", en: "Tteokbokki spicy rice cake" },
    { ko: "라면", en: "Ramen noodles" },
    { ko: "비빔밥", en: "Bibimbap" },
    { ko: "불고기", en: "Bulgogi" },
    { ko: "족발", en: "Jokbal Braised Pig's Trotters" },
    { ko: "보쌈", en: "Bossam Napa Wraps with Pork" },
    { ko: "카레", en: "Curry Rice" },
    { ko: "돈까스", en: "Tonkatsu Pork Cutlet" },
    { ko: "냉면", en: "Naengmyeon Cold Noodles" },
    { ko: "칼국수", en: "Kalguksu Noodle Soup" },
    { ko: "마라탕", en: "Malatang" },
    { ko: "쌀국수", en: "Pho Rice Noodles" }
];

const uiText = {
    ko: {
        title: "오늘의 저녁 메뉴는?",
        button: "메뉴 추천받기",
        theme: "테마 변경",
        lang: "English"
    },
    en: {
        title: "What's for Dinner Today?",
        button: "Get Recommendation",
        theme: "Toggle Theme",
        lang: "한국어"
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';
let currentMenu = null;

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.documentElement.lang = lang;
    mainTitle.textContent = uiText[lang].title;
    generatorBtn.textContent = uiText[lang].button;
    themeToggleBtn.textContent = uiText[lang].theme;
    langToggleBtn.textContent = uiText[lang].lang;
    
    // Update display if there's a menu showing
    if (currentMenu) {
        displayMenu(currentMenu);
    }
}

// Theme toggle functionality
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    applyTheme(true);
} else {
    applyTheme(false);
}

themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage(nextLang);
});

function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    return menuItems[randomIndex];
}

function displayMenu(menu) {
    currentMenu = menu; // Store for language switching
    menuContainer.innerHTML = '';
    
    const menuName = menu[currentLang];
    
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('menu-card');

    // Image Generation using Pollinations.ai
    // Adding keywords to ensure food photography style
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(menu.en + " delicious food photography")}?width=400&height=400&seed=${Math.floor(Math.random() * 1000)}`;
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = menuName;
    imgElement.classList.add('menu-image');
    imgElement.onerror = () => {
        imgElement.src = 'https://via.placeholder.com/400?text=Food+Image';
    };

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('menu-name');
    nameDiv.textContent = menuName;

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(nameDiv);
    
    menuContainer.appendChild(cardDiv);
}

function handleGeneratorClick() {
    menuContainer.innerHTML = '<div class="loading">...</div>'; // Simple loading state
    const menu = getRandomMenu();
    // Small delay to make it feel like "processing" if desired, 
    // but direct call is snappier.
    displayMenu(menu);
}

generatorBtn.addEventListener('click', handleGeneratorClick);

// Initial setup
updateLanguage(currentLang);
// Generate one on load
handleGeneratorClick();