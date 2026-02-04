const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');

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
