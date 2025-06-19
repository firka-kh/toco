/**
 * Упрощенный JavaScript для портала рынка труда РТ
 * Версия: 2.2 (исправленная)
 * Дата: 19 июня 2025
 */

// Глобальные функции для работы с интерфейсом
window.PortalUtils = {
    // Переключение мобильного меню
    toggleMobileMenu: function() {
        const menu = document.getElementById('mobileMenu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    },

    // Переключение языка
    setLanguage: function(lang) {
        console.log('Switching to language:', lang);
        const langButton = document.querySelector('[data-dropdown-trigger]');
        if (langButton) {
            const langMap = { 'ru': 'RU', 'tt': 'TT', 'en': 'EN' };
            langButton.firstChild.textContent = langMap[lang] || 'RU';
        }
    },

    // Показать уведомление
    showNotification: function(message, type = 'info') {
        // Создаем контейнер для уведомлений, если его нет
        let container = document.getElementById('notifications');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notifications';
            container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
        }

        // Создаем уведомление
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : 
                       type === 'error' ? 'bg-red-500' : 
                       type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
        
        notification.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg max-w-sm`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        container.appendChild(notification);

        // Автоматическое удаление через 4 секунды
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 4000);
    },

    // Инициализация дропдаунов
    initDropdowns: function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('[data-dropdown-trigger]');
            const content = dropdown.querySelector('.dropdown-content');
            
            if (trigger && content) {
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Закрыть другие дропдауны
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            const otherContent = other.querySelector('.dropdown-content');
                            if (otherContent) {
                                otherContent.classList.add('hidden');
                            }
                        }
                    });
                    
                    // Переключить текущий дропдаун
                    content.classList.toggle('hidden');
                });
            }
        });
        
        // Закрытие дропдаунов при клике вне
        document.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                if (content && !content.classList.contains('hidden')) {
                    content.classList.add('hidden');
                }
            });
        });
    },

    // Валидация форм
    validateForm: function(formElement) {
        let isValid = true;
        const requiredFields = formElement.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('border-red-500');
                isValid = false;
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    },

    // Загрузка header и footer
    loadHeaderFooter: function() {
        // Загрузка header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            fetch('header_simple.html')
                .then(response => response.text())
                .then(data => {
                    headerContainer.innerHTML = data;
                    // Переинициализировать дропдауны после загрузки
                    setTimeout(() => {
                        this.initDropdowns();
                    }, 100);
                })
                .catch(error => {
                    console.error('Ошибка загрузки header:', error);
                    // Фолбэк - простой header
                    headerContainer.innerHTML = `
                        <header class="bg-white shadow-lg">
                            <div class="container mx-auto px-4 py-4">
                                <div class="flex items-center justify-between">
                                    <h1 class="text-xl font-bold">Портал рынка труда РТ</h1>
                                    <nav class="space-x-4">
                                        <a href="index.html" class="text-blue-600">Главная</a>
                                        <a href="about.html" class="text-blue-600">О портале</a>
                                    </nav>
                                </div>
                            </div>
                        </header>
                    `;
                });
        }

        // Загрузка footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            fetch('footer.html')
                .then(response => response.text())
                .then(data => {
                    footerContainer.innerHTML = data;
                })
                .catch(error => {
                    console.error('Ошибка загрузки footer:', error);
                    // Фолбэк - простой footer
                    footerContainer.innerHTML = `
                        <footer class="bg-gray-800 text-white py-8">
                            <div class="container mx-auto px-4 text-center">
                                <p>&copy; 2025 Портал рынка труда Республики Татарстан</p>
                            </div>
                        </footer>
                    `;
                });
        }
    }
};

// Основной класс приложения (упрощенный)
class PortalApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('PortalApp: Инициализация...');
        
        // Инициализация основных функций
        PortalUtils.initDropdowns();
        
        // Глобальные функции
        window.toggleMobileMenu = PortalUtils.toggleMobileMenu;
        window.setLanguage = PortalUtils.setLanguage;
        
        console.log('PortalApp: Инициализация завершена');
    }

    showNotification(message, type) {
        PortalUtils.showNotification(message, type);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузить header и footer если есть контейнеры
    PortalUtils.loadHeaderFooter();
    
    // Инициализировать приложение
    window.portalApp = new PortalApp();
    
    // Инициализация форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!PortalUtils.validateForm(this)) {
                e.preventDefault();
                PortalUtils.showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            }
        });
    });
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortalApp, PortalUtils };
}
