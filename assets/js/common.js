/**
 * Общие JavaScript функции для портала рынка труда РТ
 * Версия: 2.0
 * Дата: 19 июня 2025
 */

class PortalApp {
    constructor() {
        this.init();
    }

    init() {
        this.initNavigation();
        this.initModals();
        this.initToasts();
        this.initAnimations();
        this.initLanguageSupport();
        this.initThemeSupport();
        this.initFormValidation();
        this.initSearch();
    }

    // === НАВИГАЦИЯ ===
    initNavigation() {
        // Выпадающие меню
        this.initDropdowns();
        
        // Мобильное меню
        this.initMobileMenu();
        
        // Плавная прокрутка
        this.initSmoothScroll();
    }

    initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('[data-dropdown-trigger]');
            const content = dropdown.querySelector('.dropdown-content');
            
            if (trigger && content) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Закрыть другие дропдауны
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.querySelector('.dropdown-content')?.classList.remove('show');
                        }
                    });
                    
                    content.classList.toggle('show');
                });
            }
        });

        // Закрытие при клике вне
        document.addEventListener('click', () => {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-content')?.classList.remove('show');
            });
        });
    }

    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Анимация иконки
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // === МОДАЛЬНЫЕ ОКНА ===
    initModals() {
        // Открытие модалок
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-modal-target]');
            if (trigger) {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-target');
                this.openModal(modalId);
            }
        });

        // Закрытие модалок
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || 
                e.target.closest('[data-modal-close]')) {
                this.closeModal();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Фокус на первый элемент
            const firstInput = modal.querySelector('input, button, textarea, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModal() {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // === УВЕДОМЛЕНИЯ ===
    initToasts() {
        this.toastContainer = this.createToastContainer();
    }

    createToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
        }
        return container;
    }

    showToast(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `p-4 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300 max-w-sm ${this.getToastClasses(type)}`;
        
        toast.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span class="flex-1">${message}</span>
                <button class="text-white hover:text-gray-200 ml-2" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        this.toastContainer.appendChild(toast);

        // Анимация появления
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Автоудаление
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    getToastClasses(type) {
        const classes = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        return classes[type] || classes.info;
    }

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // === АНИМАЦИИ ===
    initAnimations() {
        // Intersection Observer для анимаций при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Наблюдение за элементами с классом animate-on-scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // === ПОДДЕРЖКА ЯЗЫКОВ ===
    initLanguageSupport() {
        const langButtons = document.querySelectorAll('[data-lang]');
        const currentLang = localStorage.getItem('portal_language') || 'ru';
        
        this.setLanguage(currentLang);
        
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                this.setLanguage(lang);
                localStorage.setItem('portal_language', lang);
                
                // Обновляем активную кнопку
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.showToast('Язык изменен', 'success', 2000);
            });
        });
    }

    setLanguage(lang) {
        // Здесь можно добавить логику перевода
        document.documentElement.lang = lang;
        
        // Обновляем текст кнопки языка
        const currentLangLabel = document.getElementById('currentLangLabel');
        if (currentLangLabel) {
            const langMap = {
                'ru': 'RUS',
                'tg': 'TAJ', 
                'en': 'ENG'
            };
            currentLangLabel.textContent = langMap[lang] || 'RUS';
        }
    }

    // === ТЕМЫ ===
    initThemeSupport() {
        const theme = localStorage.getItem('portal_theme') || 'light';
        this.setTheme(theme);
        
        // Переключатель темы
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
                localStorage.setItem('portal_theme', newTheme);
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Обновляем иконку переключателя
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // === ВАЛИДАЦИЯ ФОРМ ===
    initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Валидация в реальном времени
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Проверка обязательности
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Это поле обязательно для заполнения';
        }
        
        // Проверка email
        if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Введите корректный email адрес';
        }
        
        // Проверка телефона
        if (type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            message = 'Введите корректный номер телефона';
        }
        
        // Отображение ошибки
        this.showFieldError(field, isValid ? '' : message);
        
        return isValid;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    isValidPhone(phone) {
        const re = /^\+?[\d\s\-\(\)]{9,}$/;
        return re.test(phone);
    }

    showFieldError(field, message) {
        // Удаляем предыдущую ошибку
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Добавляем новую ошибку
        if (message) {
            field.classList.add('border-red-500');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
        } else {
            field.classList.remove('border-red-500');
        }
    }

    // === ПОИСК ===
    initSearch() {
        const searchInputs = document.querySelectorAll('[data-search]');
        
        searchInputs.forEach(input => {
            let timeout;
            input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.performSearch(e.target.value, e.target.getAttribute('data-search'));
                }, 300);
            });
        });
    }

    performSearch(query, context) {
        if (query.length < 2) return;
        
        // Здесь можно добавить логику поиска в зависимости от контекста
        console.log(`Поиск: "${query}" в контексте: ${context}`);
    }

    // === УТИЛИТЫ ===
    
    // Сохранение в localStorage
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
        }
    }
    
    // Загрузка из localStorage
    loadFromStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
            return defaultValue;
        }
    }
    
    // Форматирование даты
    formatDate(date, format = 'dd.mm.yyyy') {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        const formats = {
            'dd.mm.yyyy': `${day}.${month}.${year}`,
            'mm/dd/yyyy': `${month}/${day}/${year}`,
            'yyyy-mm-dd': `${year}-${month}-${day}`
        };
        
        return formats[format] || formats['dd.mm.yyyy'];
    }
    
    // Дебаунс
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Проверка мобильного устройства
    isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Копирование в буфер обмена
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Скопировано в буфер обмена', 'success', 2000);
        } catch (err) {
            console.error('Ошибка копирования:', err);
            this.showToast('Ошибка копирования', 'error', 2000);
        }
    }
}

// === ГЛОБАЛЬНЫЕ ФУНКЦИИ ===

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.portalApp = new PortalApp();
});

// Глобальные вспомогательные функции
window.showToast = (message, type, duration) => {
    if (window.portalApp) {
        window.portalApp.showToast(message, type, duration);
    }
};

window.openModal = (modalId) => {
    if (window.portalApp) {
        window.portalApp.openModal(modalId);
    }
};

window.closeModal = () => {
    if (window.portalApp) {
        window.portalApp.closeModal();
    }
};

// === GOOGLE TRANSLATE ПОДДЕРЖКА ===
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'ru',
            includedLanguages: 'ru,tg,en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        },
        'google_translate_element'
    );
}
