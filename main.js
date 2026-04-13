const contentContainer = document.getElementById('dynamic-content');

const recruitLink = document.getElementById('nav-recruit');
const fighterMainLink = document.getElementById('nav-fighter');
const extraMainLink = document.getElementById('nav-extra');
const interestMainLink = document.getElementById('nav-interest');
const logo = document.getElementById('logoHome');

contentContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

// Сохранение текущей страницы в localStorage
function saveCurrentPage(pageType, subType) {
    const state = { pageType, subType };
    localStorage.setItem('currentPage', JSON.stringify(state));
}

// Загрузка сохранённой страницы
function loadSavedPage() {
    const saved = localStorage.getItem('currentPage');
    if (saved) {
        try {
            const { pageType, subType } = JSON.parse(saved);
            renderPage(pageType, subType);
            setActiveNavHighlight(pageType === 'home' ? null : pageType);
            return true;
        } catch(e) {
            console.log('Ошибка загрузки сохранения');
        }
    }
    return false;
}

function renderPageFromSections(sections) {
    contentContainer.style.opacity = '0';
    contentContainer.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        contentContainer.innerHTML = '';
        
        if (!sections || sections.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'hero-message';
            emptyMessage.innerHTML = `
                <h1>РАЗДЕЛ В РАЗРАБОТКЕ</h1>
                <p>Контент скоро появится</p>
            `;
            contentContainer.appendChild(emptyMessage);
        } else {
            const wrapper = document.createElement('div');
            wrapper.style.width = '100%';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '2rem';
            
            sections.forEach((section) => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = section.html.trim();
                
                while (tempDiv.firstChild) {
                    wrapper.appendChild(tempDiv.firstChild);
                }
            });
            
            contentContainer.appendChild(wrapper);
        }
        
        setTimeout(() => {
            contentContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            contentContainer.style.opacity = '1';
            contentContainer.style.transform = 'translateY(0)';
        }, 50);
    }, 150);
}

function renderPage(pageType, subType = null) {
    let sections = null;
    let pageTitle = "212 Десантно-Штурмовой";
    
    document.body.classList.remove('home-page');
    
    if (pageType === 'home') {
        document.body.classList.add('home-page');
        sections = pageContent.home;
        pageTitle = "212 Десантно-Штурмовой | Главная";
    }
    else if (pageType === 'recruit') {
        sections = pageContent.recruit;
        pageTitle = "212 Десантно-Штурмовой | Новобранцам";
    }
    else if (pageType === 'fighter' && subType === 'charter') {
        sections = pageContent.fighter_charter;
        pageTitle = "212 Десантно-Штурмовой | Устав";
    }
    else if (pageType === 'fighter' && subType === 'rank_system') {
        sections = pageContent.fighter_rank;
        pageTitle = "212 Десантно-Штурмовой | Система повышения";
    }
    else if (pageType === 'fighter' && subType === 'training_system') {
        sections = pageContent.fighter_training;
        pageTitle = "212 Десантно-Штурмовой | Система тренировок";
    }
    else if (pageType === 'extra' && subType === 'instructions') {
        sections = pageContent.extra_instructions;
        pageTitle = "212 Десантно-Штурмовой | Инструкции";
    }
    else if (pageType === 'extra' && subType === 'units') {
        sections = pageContent.extra_units;
        pageTitle = "212 Десантно-Штурмовой | Отряды";
    }
    else if (pageType === 'extra' && subType === 'documents') {
        sections = pageContent.extra_documents;
        pageTitle = "212 Десантно-Штурмовой | Документы";
    }
    else if (pageType === 'interest' && subType === 'album') {
        sections = pageContent.interest_album;
        pageTitle = "212 Десантно-Штурмовой | Альбом";
    }
    else if (pageType === 'interest' && subType === 'lore') {
        sections = pageContent.interest_lore;
        pageTitle = "212 Десантно-Штурмовой | Лор батальона";
    }
    else if (pageType === 'fighter' && subType === 'general') {
        sections = generalPages.fighter;
        pageTitle = "212 Десантно-Штурмовой | Бойцам";
    }
    else if (pageType === 'extra' && subType === 'general') {
        sections = generalPages.extra;
        pageTitle = "212 Десантно-Штурмовой | Дополнительно";
    }
    else if (pageType === 'interest' && subType === 'lorekeepers') {
        sections = pageContent.interest_lorekeepers;
        pageTitle = "212 Десантно-Штурмовой | Лорники";
    }
    else if (pageType === 'interest' && subType === 'general') {
        sections = generalPages.interest;
        pageTitle = "212 Десантно-Штурмовой | Интересное";
    }
    else {
        document.body.classList.add('home-page');
        sections = pageContent.home;
        pageTitle = "212 Десантно-Штурмовой | Главная";
    }
    
    
    if (sections) {
        renderPageFromSections(sections);
    }
    document.title = pageTitle;
}

recruitLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderPage('recruit', null);
    saveCurrentPage('recruit', null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNavHighlight('recruit');
});

function attachSubmenuHandlers() {
    document.querySelectorAll('.sub-link').forEach(link => {
        link.removeEventListener('click', submenuHandler);
        link.addEventListener('click', submenuHandler);
    });
}

function submenuHandler(e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    let parentCategory = null;
    if (this.closest('#nav-fighter-item')) parentCategory = 'fighter';
    else if (this.closest('#nav-extra-item')) parentCategory = 'extra';
    else if (this.closest('#nav-interest-item')) parentCategory = 'interest';
    
    if (parentCategory && page) {
        renderPage(parentCategory, page);
        saveCurrentPage(parentCategory, page);
    } else {
        renderPage('home', null);
        saveCurrentPage('home', null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNavHighlight(parentCategory);
}

fighterMainLink.addEventListener('click', (e) => {
    e.preventDefault();
});

extraMainLink.addEventListener('click', (e) => {
    e.preventDefault();
});

interestMainLink.addEventListener('click', (e) => {
    e.preventDefault();
});

function setActiveNavHighlight(activeCategory) {
    const allMainLinks = [
        { id: 'nav-recruit', cat: 'recruit' },
        { id: 'nav-fighter', cat: 'fighter' },
        { id: 'nav-extra', cat: 'extra' },
        { id: 'nav-interest', cat: 'interest' }
    ];
    allMainLinks.forEach(link => {
        const el = document.getElementById(link.id);
        if (el) {
            if (link.cat === activeCategory) {
                el.style.borderBottom = '2px solid #e7c158';
                el.style.color = '#e7c158';
            } else {
                el.style.borderBottom = '2px solid transparent';
                el.style.color = '#f0f0f0';
            }
        }
    });
}

logo.addEventListener('click', () => {
    renderPage('home', null);
    saveCurrentPage('home', null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNavHighlight(null);
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.borderBottom = '2px solid transparent';
        a.style.color = '#f0f0f0';
    });
});

function initMobileDropdowns() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('> a');
        if (item.querySelector('.dropdown-menu')) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    item.classList.toggle('active-mobile');
                }
            });
        }
    });
}

window.clearSavedPage = function() {
    localStorage.removeItem('currentPage');
    console.log('Сохранение очищено');
    location.reload();
};

window.addEventListener('DOMContentLoaded', () => {
    const loaded = loadSavedPage();
    if (!loaded) {
        renderPage('home', null);
        setActiveNavHighlight(null);
    }
    attachSubmenuHandlers();
    initMobileDropdowns();
    const bgVideo = document.querySelector('.video-background');
    if (bgVideo) {
        bgVideo.play().catch(e => console.log("autoplay blocked"));
    }
    setInterval(() => {
        attachSubmenuHandlers();
    }, 500);
});

const videoEl = document.querySelector('.video-background');
if(videoEl) {
    videoEl.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play().catch(()=>{});
    });
}
