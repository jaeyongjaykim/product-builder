const generatorBtn = document.getElementById('generator-btn');
const menuContainer = document.querySelector('.menu-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

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
    applyTheme(false); // Default to light mode if no preference or 'light'
}

themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

const dinnerMenus = [
    "김치찌개", "된장찌개", "삼겹살", "치킨", "피자", "햄버거",
    "초밥", "파스타", "떡볶이", "라면", "비빔밥", "불고기",
    "족발", "보쌈", "카레", "돈까스", "냉면", "칼국수", "마라탕", "쌀국수"
];

function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    return dinnerMenus[randomIndex];
}

function displayMenu(menuName) {
    menuContainer.innerHTML = '';
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menu-item');
    menuDiv.textContent = menuName;
    menuContainer.appendChild(menuDiv);
}

function handleGeneratorClick() {
    // Add a simple animation effect or just switch
    menuContainer.innerHTML = ''; 
    const menu = getRandomMenu();
    displayMenu(menu);
}

generatorBtn.addEventListener('click', handleGeneratorClick);

// Initial generation
displayMenu(getRandomMenu());