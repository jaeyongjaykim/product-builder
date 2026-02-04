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

function generateMenuSVG(name) {
    // Generate a simple hash from the name for consistent colors
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const getHue = (offset) => Math.abs((hash + offset) % 360);
    const color1 = `hsl(${getHue(0)}, 70%, 60%)`;
    const color2 = `hsl(${getHue(120)}, 70%, 40%)`;
    const color3 = `hsl(${getHue(240)}, 70%, 50%)`;

    // Create a unique abstract SVG
    const svg = `
        <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" fill="${color1}"/>
            <circle cx="200" cy="200" r="150" fill="${color2}" opacity="0.6"/>
            <path d="M0 400 Q 200 100 400 400" fill="${color3}" opacity="0.8"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="40" fill="white" font-weight="bold">${name}</text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function displayMenu(menu) {
    currentMenu = menu; // Store for language switching
    menuContainer.innerHTML = '';
    
    const menuName = menu[currentLang];
    
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('menu-card');

    // Local SVG Generation
    const imageUrl = generateMenuSVG(menu.ko);
    
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = menuName;
    imgElement.classList.add('menu-image');

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