const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');
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

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getColorForNumber(number) {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa';    // Gray
    return '#b0d840';      // Green
}

function displayNumbers(numbers) {
    lottoNumbersContainer.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numberDiv.style.backgroundColor = getColorForNumber(number);
        lottoNumbersContainer.appendChild(numberDiv);
    }
}

function handleGeneratorClick() {
    lottoNumbersContainer.innerHTML = ''; // Clear existing numbers
    const newNumbers = generateNumbers();
    displayNumbers(newNumbers);
}

generatorBtn.addEventListener('click', handleGeneratorClick);

// Initial generation
displayNumbers(generateNumbers());
