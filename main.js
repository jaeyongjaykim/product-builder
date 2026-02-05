// DOM Elements
const generatorBtn = document.getElementById('generator-btn');
const menuContainer = document.getElementById('menu-container');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const langToggleBtn = document.getElementById('lang-toggle-btn');

// Menu Data
const menuItems = [
    { ko: "김치찌개", en: "Kimchi Stew", emoji: "🍲" },
    { ko: "된장찌개", en: "Soybean Paste Stew", emoji: "🥘" },
    { ko: "삼겹살", en: "Grilled Pork Belly", emoji: "🥓" },
    { ko: "치킨", en: "Fried Chicken", emoji: "🍗" },
    { ko: "피자", en: "Pizza", emoji: "🍕" },
    { ko: "햄버거", en: "Hamburger", emoji: "🍔" },
    { ko: "초밥", en: "Sushi", emoji: "🍣" },
    { ko: "파스타", en: "Pasta", emoji: "🍝" },
    { ko: "떡볶이", en: "Tteokbokki", emoji: "🌶️" },
    { ko: "라면", en: "Ramen", emoji: "🍜" },
    { ko: "비빔밥", en: "Bibimbap", emoji: "🍚" },
    { ko: "불고기", en: "Bulgogi", emoji: "🥩" },
    { ko: "족발", en: "Braised Pig's Feet", emoji: "🦶" },
    { ko: "보쌈", en: "Bossam", emoji: "🥬" },
    { ko: "카레", en: "Curry Rice", emoji: "🍛" },
    { ko: "돈까스", en: "Tonkatsu", emoji: "🍖" },
    { ko: "냉면", en: "Cold Noodles", emoji: "🧊" },
    { ko: "칼국수", en: "Kalguksu", emoji: "🍜" },
    { ko: "마라탕", en: "Malatang", emoji: "🔥" },
    { ko: "쌀국수", en: "Pho", emoji: "🥢" }
];

// UI Text translations
const uiText = {
    ko: {
        heroTitle1: "오늘 저녁",
        heroTitle2: "뭐 먹을까?",
        heroSubtitle: "결정장애 탈출! 버튼 하나로 오늘의 메뉴를 추천받으세요",
        button: "메뉴 추천받기",
        lang: "EN",
        featuresTitle: "더 많은 재미",
        animalTestTitle: "동물상 테스트",
        animalTestDesc: "나는 강아지상? 고양이상? AI가 분석해드려요",
        animalTestCta: "테스트 하기 →",
        howtoTitle: "사용 방법",
        howtoDesc: "3단계로 간단하게 오늘의 메뉴를 결정하세요",
        howtoStep1Title: "버튼 클릭",
        howtoStep1Desc: "\"메뉴 추천받기\" 버튼을 클릭하세요",
        howtoStep2Title: "메뉴 확인",
        howtoStep2Desc: "랜덤으로 추천된 메뉴를 확인하세요",
        howtoStep3Title: "맛있게 식사",
        howtoStep3Desc: "추천 메뉴로 맛있는 식사를 즐기세요!",
        menuinfoTitle: "추천 메뉴 소개",
        menuinfoDesc: "20가지 이상의 다양한 메뉴를 준비했어요",
        catKorean: "한식",
        catAsian: "아시안",
        catWestern: "양식 & 분식",
        faqTitle: "자주 묻는 질문",
        faqQ1: "서비스는 무료인가요?",
        faqA1: "네, 완전 무료입니다! 회원가입 없이 누구나 바로 이용할 수 있어요.",
        faqQ2: "추천 기준이 있나요?",
        faqA2: "완전히 무작위(랜덤)로 추천해요. 복잡한 알고리즘 없이 공정하게!",
        faqQ3: "마음에 안 들면 어떻게 하나요?",
        faqA3: "버튼을 다시 누르면 새로운 메뉴가 추천돼요. 마음에 드는 메뉴가 나올 때까지 눌러보세요!",
        faqQ4: "새로운 메뉴 추가 요청은 어떻게 하나요?",
        faqA4: "아래 제휴 문의 양식을 통해 요청해 주세요. 검토 후 추가할게요!",
        partnershipTitle: "제휴 문의",
        partnershipDesc: "비즈니스 협업 및 제휴에 관심이 있으시다면 연락주세요",
        labelName: "성함/업체명",
        labelEmail: "이메일",
        labelMessage: "문의 내용",
        submitBtn: "문의하기",
        commentsTitle: "커뮤니티",
        commentsDesc: "다른 사람들과 메뉴 고민을 나눠보세요",
        loading: "추천 중",
        placeholderName: "홍길동",
        placeholderMessage: "문의하실 내용을 입력해주세요",
        navAbout: "소개",
        footerTagline: "결정장애 탈출! 버튼 하나로 메뉴 추천",
        footerService: "서비스",
        footerHome: "홈",
        footerAnimal: "동물상 테스트",
        footerInfo: "정보",
        footerAbout: "소개",
        footerPrivacy: "개인정보처리방침",
        footerTerms: "이용약관"
    },
    en: {
        heroTitle1: "What's for",
        heroTitle2: "Dinner?",
        heroSubtitle: "Can't decide? Let us recommend today's menu with one click!",
        button: "Get Recommendation",
        lang: "KO",
        featuresTitle: "More Fun",
        animalTestTitle: "Animal Face Test",
        animalTestDesc: "Are you a puppy or a kitty? Let AI analyze your face!",
        animalTestCta: "Take Test →",
        howtoTitle: "How to Use",
        howtoDesc: "Decide today's menu in 3 simple steps",
        howtoStep1Title: "Click Button",
        howtoStep1Desc: "Click the \"Get Recommendation\" button",
        howtoStep2Title: "Check Menu",
        howtoStep2Desc: "See the randomly recommended menu",
        howtoStep3Title: "Enjoy Your Meal",
        howtoStep3Desc: "Enjoy your delicious meal!",
        menuinfoTitle: "Menu Collection",
        menuinfoDesc: "Over 20 diverse menu options available",
        catKorean: "Korean",
        catAsian: "Asian",
        catWestern: "Western & Snacks",
        faqTitle: "FAQ",
        faqQ1: "Is the service free?",
        faqA1: "Yes, it's completely free! Anyone can use it without signing up.",
        faqQ2: "Is there a recommendation criteria?",
        faqA2: "It's completely random. No complex algorithms, just fair randomness!",
        faqQ3: "What if I don't like the result?",
        faqA3: "Just click the button again for a new menu. Keep clicking until you find one you like!",
        faqQ4: "How can I request new menu additions?",
        faqA4: "Use the partnership form below. We'll review and add them!",
        partnershipTitle: "Partnership",
        partnershipDesc: "Interested in business collaboration? Contact us!",
        labelName: "Name/Company",
        labelEmail: "Email",
        labelMessage: "Message",
        submitBtn: "Send",
        commentsTitle: "Community",
        commentsDesc: "Share your food dilemmas with others",
        loading: "Loading",
        placeholderName: "John Doe",
        placeholderMessage: "Please enter your inquiry",
        navAbout: "About",
        footerTagline: "Escape decision fatigue! One-click menu recommendation",
        footerService: "Service",
        footerHome: "Home",
        footerAnimal: "Animal Face Test",
        footerInfo: "Info",
        footerAbout: "About",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service"
    }
};

// Get system language preference
function getSystemLang() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('ko') ? 'ko' : 'en';
}

// Get system theme preference
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

let currentLang = localStorage.getItem('lang') || getSystemLang();
let currentMenu = null;

// Initialize language
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    const text = uiText[lang];

    // Update hero
    const mainTitle = document.getElementById('main-title');
    mainTitle.innerHTML = `
        <span class="title-line">${text.heroTitle1}</span>
        <span class="title-line highlight">${text.heroTitle2}</span>
    `;
    document.getElementById('hero-subtitle').textContent = text.heroSubtitle;

    // Update button
    document.getElementById('generator-btn-text').textContent = text.button;
    langToggleBtn.textContent = text.lang;

    // Update features
    document.getElementById('features-title').textContent = text.featuresTitle;
    document.getElementById('animal-test-title').textContent = text.animalTestTitle;
    document.getElementById('animal-test-desc').textContent = text.animalTestDesc;
    document.querySelector('.feature-cta').textContent = text.animalTestCta;

    // Update partnership
    document.getElementById('partnership-title').textContent = text.partnershipTitle;
    document.getElementById('partnership-desc').textContent = text.partnershipDesc;
    document.getElementById('label-name').textContent = text.labelName;
    document.getElementById('label-email').textContent = text.labelEmail;
    document.getElementById('label-message').textContent = text.labelMessage;
    document.getElementById('submit-btn').querySelector('span').textContent = text.submitBtn;

    // Update comments
    document.getElementById('comments-title').textContent = text.commentsTitle;
    document.getElementById('comments-desc').textContent = text.commentsDesc;

    // Update placeholders
    document.getElementById('name').placeholder = text.placeholderName;
    document.getElementById('message').placeholder = text.placeholderMessage;

    // Update how-to section
    const howtoTitle = document.getElementById('howto-title');
    if (howtoTitle) {
        howtoTitle.textContent = text.howtoTitle;
        document.getElementById('howto-desc').textContent = text.howtoDesc;
        document.getElementById('howto-step1-title').textContent = text.howtoStep1Title;
        document.getElementById('howto-step1-desc').textContent = text.howtoStep1Desc;
        document.getElementById('howto-step2-title').textContent = text.howtoStep2Title;
        document.getElementById('howto-step2-desc').textContent = text.howtoStep2Desc;
        document.getElementById('howto-step3-title').textContent = text.howtoStep3Title;
        document.getElementById('howto-step3-desc').textContent = text.howtoStep3Desc;
    }

    // Update menu info section
    const menuinfoTitle = document.getElementById('menuinfo-title');
    if (menuinfoTitle) {
        menuinfoTitle.textContent = text.menuinfoTitle;
        document.getElementById('menuinfo-desc').textContent = text.menuinfoDesc;
        document.getElementById('cat-korean').textContent = text.catKorean;
        document.getElementById('cat-asian').textContent = text.catAsian;
        document.getElementById('cat-western').textContent = text.catWestern;
    }

    // Update FAQ section
    const faqTitle = document.getElementById('faq-title');
    if (faqTitle) {
        faqTitle.textContent = text.faqTitle;
        document.getElementById('faq-q1').textContent = text.faqQ1;
        document.getElementById('faq-a1').textContent = text.faqA1;
        document.getElementById('faq-q2').textContent = text.faqQ2;
        document.getElementById('faq-a2').textContent = text.faqA2;
        document.getElementById('faq-q3').textContent = text.faqQ3;
        document.getElementById('faq-a3').textContent = text.faqA3;
        document.getElementById('faq-q4').textContent = text.faqQ4;
        document.getElementById('faq-a4').textContent = text.faqA4;
    }

    // Update navigation
    const navAbout = document.getElementById('nav-about');
    if (navAbout) navAbout.textContent = text.navAbout;

    // Update footer
    const footerTagline = document.getElementById('footer-tagline');
    if (footerTagline) {
        footerTagline.textContent = text.footerTagline;
        document.getElementById('footer-service').textContent = text.footerService;
        document.getElementById('footer-home').textContent = text.footerHome;
        document.getElementById('footer-animal').textContent = text.footerAnimal;
        document.getElementById('footer-info').textContent = text.footerInfo;
        document.getElementById('footer-about').textContent = text.footerAbout;
        document.getElementById('footer-privacy').textContent = text.footerPrivacy;
        document.getElementById('footer-terms').textContent = text.footerTerms;
    }

    // Update menu display
    if (currentMenu) {
        displayMenu(currentMenu);
    }
}

// Theme functionality
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Reset Disqus for theme
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = window.location.pathname;
                this.page.url = window.location.href;
            }
        });
    }
}

// Load saved theme or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme === 'dark');
} else {
    applyTheme(getSystemTheme() === 'dark');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches);
    }
});

themeToggleBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage(nextLang);
});

// Menu functions
function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    return menuItems[randomIndex];
}

function generateMenuSVG(name, emoji) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const getHue = (offset) => Math.abs((hash + offset) % 360);
    const color1 = `hsl(${getHue(0)}, 65%, 55%)`;
    const color2 = `hsl(${getHue(40)}, 70%, 45%)`;

    const svg = `
        <svg width="400" height="240" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#grad${hash})"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="80">${emoji}</text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function displayMenu(menu) {
    currentMenu = menu;
    menuContainer.innerHTML = '';

    const menuName = menu[currentLang];

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('menu-card');

    const imageUrl = generateMenuSVG(menu.ko, menu.emoji);

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
    // Show loading
    const loadingText = uiText[currentLang].loading;
    menuContainer.innerHTML = `<div class="loading">${loadingText}</div>`;

    // Slight delay for effect
    setTimeout(() => {
        const menu = getRandomMenu();
        displayMenu(menu);
    }, 300);
}

generatorBtn.addEventListener('click', handleGeneratorClick);

// Initialize
updateLanguage(currentLang);
handleGeneratorClick();

// Add scroll animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.feature-card, .partnership-wrapper, .comments-wrapper').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});
