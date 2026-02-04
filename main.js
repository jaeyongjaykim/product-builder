const generatorBtn = document.getElementById('generator-btn');
const menuContainer = document.querySelector('.menu-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const langToggleBtn = document.getElementById('lang-toggle-btn');
const mainTitle = document.getElementById('main-title');

// Translations
const translations = {
    ko: {
        title: "오늘의 저녁 메뉴는?",
        button: "메뉴 추천받기",
        theme: "테마 변경",
        lang: "English",
        menus: [
            "김치찌개", "된장찌개", "삼겹살", "치킨", "피자", "햄버거",
            "초밥", "파스타", "떡볶이", "라면", "비빔밥", "불고기",
            "족발", "보쌈", "카레", "돈까스", "냉면", "칼국수", "마라탕", "쌀국수"
        ]
    },
    en: {
        title: "What's for Dinner Today?",
        button: "Get Recommendation",
        theme: "Toggle Theme",
        lang: "한국어",
        menus: [
            "Kimchi Stew", "Soybean Paste Stew", "Grilled Pork Belly", "Fried Chicken", "Pizza", "Burger",
            "Sushi", "Pasta", "Tteokbokki", "Ramen", "Bibimbap", "Bulgogi",
            "Jokbal", "Bossam", "Curry", "Donkatsu", "Cold Noodles", "Kalguksu", "Malatang", "Pho"
        ]
    }
};

let currentLang = localStorage.getItem('lang') || 'ko';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.documentElement.lang = lang;
    mainTitle.textContent = translations[lang].title;
    generatorBtn.textContent = translations[lang].button;
    themeToggleBtn.textContent = translations[lang].theme;
    langToggleBtn.textContent = translations[lang].lang;
    
    // Update display if there's a menu showing
    if (menuContainer.firstChild) {
        displayMenu(getRandomMenu());
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
    const menus = translations[currentLang].menus;
    const randomIndex = Math.floor(Math.random() * menus.length);
    return menus[randomIndex];
}

function displayMenu(menuName) {
    menuContainer.innerHTML = '';
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menu-item');
    menuDiv.textContent = menuName;
    menuContainer.appendChild(menuDiv);
}

function handleGeneratorClick() {
    menuContainer.innerHTML = ''; 
    const menu = getRandomMenu();
    displayMenu(menu);
}

generatorBtn.addEventListener('click', handleGeneratorClick);

// Initial setup
updateLanguage(currentLang);
displayMenu(getRandomMenu());
