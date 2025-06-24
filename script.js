// Common JavaScript functionality for the Labor Market Portal
// © 2025 Portal Rynka Truda Respubliki Tadzhikistan

// Global constants and utilities
const PORTAL_CONFIG = {
    apiUrl: '/api/v1',
    storagePrefix: 'portal_',
    languages: ['ru', 'tj'],
    defaultLanguage: 'ru',
    animations: {
        duration: 300,
        easing: 'ease-in-out'
    }
};

// Region-city mapping for cascading dropdowns
const REGIONS_DATA = {
    "dushanbe": { 
        name: "Город Душанбе", 
        cities: ["Центральный район", "Исмоили Сомони", "Авиценна", "Фирдавси"],
        vacancies: 5420
    },
    "sughd": { 
        name: "Согдийская область", 
        cities: ["Худжанд", "Исфара", "Канибадам", "Пенджикент", "Зафарабад", "Кайраккум"],
        vacancies: 3280
    },
    "khatlon": { 
        name: "Хатлонская область", 
        cities: ["Курган-Тюбе", "Куляб", "Бохтар", "Левакант", "Кабодиён", "Носири Хусрав"],
        vacancies: 2150
    },
    "gbao": { 
        name: "ГБАО", 
        cities: ["Хорог", "Ишкашим", "Рушан", "Шугнан", "Дарваз"],
        vacancies: 890
    },
    "rrp": { 
        name: "РРП", 
        cities: ["Гиссар", "Рудаки", "Вахдат", "Турсунзаде", "Файзабад"],
        vacancies: 710
    }
};

// Search suggestions for autocomplete
const SEARCH_SUGGESTIONS = [
    "Веб-разработчик", "Frontend developer", "Backend developer",
    "UX/UI дизайнер", "Графический дизайнер", "Product designer",
    "Менеджер по продажам", "Менеджер проектов", "Account manager",
    "Преподаватель английского", "Преподаватель математики", "Репетитор",
    "Финансовый аналитик", "Бизнес-аналитик", "Data analyst",
    "Медицинская сестра", "Врач", "Фармацевт",
    "Программист Python", "Программист Java", "Программист C#",
    "Маркетолог", "SMM-специалист", "Content manager",
    "Бухгалтер", "Экономист", "Аудитор",
    "Инженер", "Архитектор", "Строитель"
];

// Mock translations for bilingual support
const TRANSLATIONS = {
    ru: {
        'search_placeholder': 'Должность, компания или ключевые слова',
        'location_placeholder': 'Все регионы',
        'find_button': 'Найти',
        'filters_button': 'Фильтры',
        'login_button': 'Войти',
        'register_button': 'Регистрация',
        'all_vacancies': 'Все вакансии',
        'by_regions': 'По регионам',
        'by_specialties': 'По специальностям',
        'remote_work': 'Удаленная работа'
    },
    tj: {
        'search_placeholder': 'Вазифа, ширкат ё калимаҳои калидӣ',
        'location_placeholder': 'Ҳамаи минтақаҳо',
        'find_button': 'Ҷустуҷӯ',
        'filters_button': 'Филтрҳо',
        'login_button': 'Даромад',
        'register_button': 'Бақайдгирӣ',
        'all_vacancies': 'Ҳамаи вакансияҳо',
        'by_regions': 'Аз рӯи минтақаҳо',
        'by_specialties': 'Аз рӯи ихтисосҳо',
        'remote_work': 'Кори масофавӣ'
    }
};

// Utility functions
const Utils = {
    // Local storage helpers
    setItem: (key, value) => {
        try {
            localStorage.setItem(PORTAL_CONFIG.storagePrefix + key, JSON.stringify(value));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    },

    getItem: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(PORTAL_CONFIG.storagePrefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
            return defaultValue;
        }
    },

    removeItem: (key) => {
        try {
            localStorage.removeItem(PORTAL_CONFIG.storagePrefix + key);
        } catch (e) {
            console.warn('Failed to remove from localStorage:', e);
        }
    },

    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format numbers with locale
    formatNumber: (num) => {
        return new Intl.NumberFormat('ru-RU').format(num);
    },

    // Animate counter
    animateCounter: (element, target, duration = 2000) => {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Utils.formatNumber(Math.floor(target));
                clearInterval(counter);
            } else {
                element.textContent = Utils.formatNumber(Math.floor(current));
            }
        }, 16);
    },

    // Show notification
    showNotification: (message, type = 'info', duration = 5000) => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    },

    // Get URL parameters
    getUrlParams: () => {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },

    // Set URL parameters
    setUrlParams: (params) => {
        const url = new URL(window.location);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            } else {
                url.searchParams.delete(key);
            }
        });
        window.history.pushState({}, '', url);
    }
};

// Search functionality
const Search = {
    init: () => {
        const searchInputs = document.querySelectorAll('.search-input, #search-input');
        const suggestionsContainers = document.querySelectorAll('.search-suggestions');

        searchInputs.forEach((input, index) => {
            const suggestions = suggestionsContainers[index];
            if (!suggestions) return;

            const debouncedSearch = Utils.debounce((query) => {
                Search.showSuggestions(query, suggestions, input);
            }, 300);

            input.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });

            input.addEventListener('focus', (e) => {
                if (e.target.value.trim()) {
                    Search.showSuggestions(e.target.value, suggestions, input);
                }
            });

            // Handle suggestion selection
            suggestions.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-item')) {
                    input.value = e.target.textContent;
                    suggestions.classList.remove('show');
                    input.focus();
                }
            });
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-field')) {
                suggestionsContainers.forEach(container => {
                    container.classList.remove('show');
                });
            }
        });
    },

    showSuggestions: (query, container, input) => {
        if (query.length < 2) {
            container.classList.remove('show');
            return;
        }

        const filtered = SEARCH_SUGGESTIONS.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        if (filtered.length > 0) {
            container.innerHTML = filtered.map(item => 
                `<div class="suggestion-item">${item}</div>`
            ).join('');
            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    }
};

// Filter sidebar functionality
const FilterSidebar = {
    init: () => {
        const filterBtns = document.querySelectorAll('.filter-btn, #filter-btn');
        const sidebar = document.getElementById('filter-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const closeBtn = document.getElementById('sidebar-close');
        const applyBtn = document.getElementById('apply-filters');
        const clearBtn = document.getElementById('clear-filters');

        if (!sidebar) return;

        // Open sidebar
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => FilterSidebar.open());
        });

        // Close sidebar
        [closeBtn, overlay].forEach(element => {
            if (element) {
                element.addEventListener('click', () => FilterSidebar.close());
            }
        });

        // Apply filters
        if (applyBtn) {
            applyBtn.addEventListener('click', () => FilterSidebar.apply());
        }

        // Clear filters
        if (clearBtn) {
            clearBtn.addEventListener('click', () => FilterSidebar.clear());
        }

        // Setup cascading dropdowns
        FilterSidebar.setupCascadingDropdowns();

        // Load saved filters
        FilterSidebar.loadSavedFilters();
    },

    open: () => {
        const sidebar = document.getElementById('filter-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        sidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    close: () => {
        const sidebar = document.getElementById('filter-sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    },

    setupCascadingDropdowns: () => {
        const regionSelect = document.getElementById('region-select');
        const citySelect = document.getElementById('city-select');

        if (!regionSelect || !citySelect) return;

        regionSelect.addEventListener('change', function() {
            const regionCode = this.value;
            citySelect.innerHTML = '<option value="">Выберите город</option>';
            
            if (regionCode && REGIONS_DATA[regionCode]) {
                citySelect.disabled = false;
                const region = REGIONS_DATA[regionCode];
                
                region.cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = city;
                    citySelect.appendChild(option);
                });

                // Show vacancy count
                const vacancyCount = document.createElement('small');
                vacancyCount.textContent = ` (${Utils.formatNumber(region.vacancies)} вакансий)`;
                regionSelect.parentNode.appendChild(vacancyCount);
            } else {
                citySelect.disabled = true;
                citySelect.innerHTML = '<option value="">Сначала выберите регион</option>';
            }
        });
    },

    getFilters: () => {
        const filters = {
            employment: [],
            salary: [],
            experience: [],
            region: '',
            city: '',
            industry: [],
            companyType: []
        };

        // Get region and city
        const regionSelect = document.getElementById('region-select');
        const citySelect = document.getElementById('city-select');
        
        if (regionSelect) filters.region = regionSelect.value;
        if (citySelect) filters.city = citySelect.value;

        // Get checkbox values
        document.querySelectorAll('.filter-group input[type="checkbox"]:checked').forEach(checkbox => {
            const group = checkbox.closest('.filter-group').querySelector('h4').textContent;
            
            if (group.includes('занятости')) {
                filters.employment.push(checkbox.value);
            } else if (group.includes('зарплаты')) {
                filters.salary.push(checkbox.value);
            } else if (group.includes('Опыт')) {
                filters.experience.push(checkbox.value);
            } else if (group.includes('деятельности')) {
                filters.industry.push(checkbox.value);
            } else if (group.includes('компании')) {
                filters.companyType.push(checkbox.value);
            }
        });

        return filters;
    },

    apply: () => {
        const filters = FilterSidebar.getFilters();
        Utils.setItem('jobFilters', filters);
        
        // If on vacancies page, apply filters directly
        if (window.location.pathname.includes('vacancies')) {
            if (typeof window.applyFilters === 'function') {
                window.applyFilters(filters);
            }
        } else {
            // Redirect to vacancies page
            window.location.href = 'vacancies.html';
        }
        
        FilterSidebar.close();
        Utils.showNotification('Фильтры применены', 'success');
    },

    clear: () => {
        // Clear checkboxes
        document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset selects
        const regionSelect = document.getElementById('region-select');
        const citySelect = document.getElementById('city-select');
        
        if (regionSelect) regionSelect.value = '';
        if (citySelect) {
            citySelect.value = '';
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Сначала выберите регион</option>';
        }
        
        // Clear saved filters
        Utils.removeItem('jobFilters');
        Utils.showNotification('Фильтры очищены', 'info');
    },

    loadSavedFilters: () => {
        const savedFilters = Utils.getItem('jobFilters');
        if (!savedFilters) return;

        // Set region and trigger change event
        const regionSelect = document.getElementById('region-select');
        if (regionSelect && savedFilters.region) {
            regionSelect.value = savedFilters.region;
            regionSelect.dispatchEvent(new Event('change'));
            
            // Set city after region is loaded
            setTimeout(() => {
                const citySelect = document.getElementById('city-select');
                if (citySelect && savedFilters.city) {
                    citySelect.value = savedFilters.city;
                }
            }, 100);
        }

        // Set checkboxes
        Object.keys(savedFilters).forEach(filterType => {
            if (Array.isArray(savedFilters[filterType])) {
                savedFilters[filterType].forEach(value => {
                    const checkbox = document.querySelector(`input[type="checkbox"][value="${value}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        });
    }
};

// Language switching functionality
const LanguageSwitch = {
    init: () => {
        const currentLang = Utils.getItem('language', PORTAL_CONFIG.defaultLanguage);
        LanguageSwitch.setLanguage(currentLang);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-btn')) {
                const lang = e.target.dataset.lang;
                LanguageSwitch.setLanguage(lang);
            }
        });
    },

    setLanguage: (lang) => {
        Utils.setItem('language', lang);
        
        // Update active language button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Apply translations
        LanguageSwitch.applyTranslations(lang);
    },

    applyTranslations: (lang) => {
        const translations = TRANSLATIONS[lang] || TRANSLATIONS[PORTAL_CONFIG.defaultLanguage];
        
        // Apply translations to elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[key]) {
                if (element.tagName === 'INPUT' && element.type !== 'button') {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        // Special cases for complex elements
        if (lang === 'tj') {
            // Update logo text
            const logoText = document.querySelector('.logo-text');
            if (logoText) {
                logoText.textContent = 'Портали Бозори Мехнати Чумхурии Точикистон';
            }
        } else {
            const logoText = document.querySelector('.logo-text');
            if (logoText) {
                logoText.textContent = 'Портал Рынка Труда Республики Таджикистан';
            }
        }
    }
};

// Animation helpers
const Animations = {
    init: () => {
        Animations.setupScrollAnimations();
        Animations.setupCounterAnimations();
    },

    setupScrollAnimations: () => {
        const animatedElements = document.querySelectorAll(
            '.feature-card, .vacancy-card, .employer-card, .stat-card, .review-card, .footer-column'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    },

    setupCounterAnimations: () => {
        const counterElements = document.querySelectorAll('[data-animate="counter"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const target = parseInt(entry.target.dataset.target);
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement) {
                        Utils.animateCounter(numberElement, target);
                        entry.target.dataset.animated = 'true';
                    }
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(element => {
            observer.observe(element);
        });
    }
};

// Form validation and handling
const Forms = {
    init: () => {
        // Add validation to all forms
        document.querySelectorAll('form').forEach(form => {
            Forms.setupValidation(form);
        });

        // Handle search forms specifically
        document.querySelectorAll('.search-form').forEach(form => {
            form.addEventListener('submit', Forms.handleSearch);
        });
    },

    setupValidation: (form) => {
        form.addEventListener('submit', (e) => {
            if (!Forms.validateForm(form)) {
                e.preventDefault();
            }
        });

        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => Forms.validateField(field));
            field.addEventListener('input', () => Forms.clearFieldError(field));
        });
    },

    validateForm: (form) => {
        let isValid = true;
        
        form.querySelectorAll('[required]').forEach(field => {
            if (!Forms.validateField(field)) {
                isValid = false;
            }
        });

        // Custom validations
        const passwordField = form.querySelector('input[name="password"]');
        const confirmPasswordField = form.querySelector('input[name="confirm-password"]');
        
        if (passwordField && confirmPasswordField) {
            if (passwordField.value !== confirmPasswordField.value) {
                Forms.showFieldError(confirmPasswordField, 'Пароли не совпадают');
                isValid = false;
            }
        }

        return isValid;
    },

    validateField: (field) => {
        const value = field.value.trim();
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            Forms.showFieldError(field, 'Это поле обязательно для заполнения');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                Forms.showFieldError(field, 'Введите корректный email адрес');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                Forms.showFieldError(field, 'Введите корректный номер телефона');
                return false;
            }
        }

        // Password strength
        if (field.type === 'password' && value && field.name === 'password') {
            if (value.length < 6) {
                Forms.showFieldError(field, 'Пароль должен содержать минимум 6 символов');
                return false;
            }
        }

        Forms.clearFieldError(field);
        return true;
    },

    showFieldError: (field, message) => {
        Forms.clearFieldError(field);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        
        field.classList.add('error');
        field.parentNode.appendChild(error);
    },

    clearFieldError: (field) => {
        field.classList.remove('error');
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    },

    handleSearch: (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const searchQuery = formData.get('search') || form.querySelector('input[type="text"]').value;
        const location = formData.get('location') || form.querySelector('select').value;
        
        // Build search URL
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (location) params.set('location', location);
        
        // Save search to history
        const searchHistory = Utils.getItem('searchHistory', []);
        if (searchQuery && !searchHistory.includes(searchQuery)) {
            searchHistory.unshift(searchQuery);
            if (searchHistory.length > 10) searchHistory.pop();
            Utils.setItem('searchHistory', searchHistory);
        }
        
        // Redirect to search results
        window.location.href = `vacancies.html?${params.toString()}`;
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Search.init();
    FilterSidebar.init();
    LanguageSwitch.init();
    Animations.init();
    Forms.init();

    // Load components if placeholders exist
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Re-initialize header-specific functionality
                LanguageSwitch.init();
            })
            .catch(error => console.error('Error loading header:', error));
    }

    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Setup global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('#search-input, .search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape to close modals/sidebars
        if (e.key === 'Escape') {
            // Close filter sidebar
            if (document.getElementById('filter-sidebar').classList.contains('open')) {
                FilterSidebar.close();
            }
            
            // Close modals
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    });

    // Setup smooth scrolling for internal links
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Show welcome message for first-time visitors
    if (!Utils.getItem('visited')) {
        setTimeout(() => {
            Utils.showNotification(
                'Добро пожаловать на Портал Рынка Труда Республики Таджикистан! Используйте Ctrl+K для быстрого поиска.',
                'info',
                8000
            );
            Utils.setItem('visited', true);
        }, 2000);
    }
});

// Export utilities for use in other scripts
window.PortalUtils = Utils;
window.PortalConfig = PORTAL_CONFIG;
window.RegionsData = REGIONS_DATA;
