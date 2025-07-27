// Конфигурация и утилиты для панели аналитики TOCO
// analytics-config.js

const AnalyticsConfig = {
    // API endpoints
    endpoints: {
        employment: '/api/employment',
        unemployment: '/api/unemployment',
        vacancies: '/api/vacancies',
        salaries: '/api/salaries',
        migration: '/api/migration',
        skills: '/api/skills',
        regions: '/api/regions',
        industries: '/api/industries',
        forecasting: '/api/forecasting'
    },

    // Цветовые палитры для различных типов диаграмм
    colorPalettes: {
        primary: [
            '#4f46e5', '#7c3aed', '#ec4899', '#10b981', '#f59e0b',
            '#ef4444', '#06b6d4', '#8b5cf6', '#84cc16', '#f97316'
        ],
        employment: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'],
        unemployment: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
        salaries: ['#10b981', '#059669', '#047857', '#065f46'],
        skills: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'],
        migration: ['#f59e0b', '#d97706', '#b45309', '#92400e'],
        regions: ['#06b6d4', '#0891b2', '#0e7490', '#155e75']
    },

    // Настройки анимации
    animation: {
        duration: {
            fast: 300,
            normal: 600,
            slow: 1000,
            chart: 1500
        },
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },

    // Настройки диаграмм
    chartDefaults: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter',
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#4f46e5',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#f3f4f6',
                    borderColor: '#e5e7eb'
                },
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: '#f3f4f6',
                    borderColor: '#e5e7eb'
                },
                ticks: {
                    font: {
                        family: 'Inter',
                        size: 11
                    }
                }
            }
        }
    },

    // Форматы для экспорта
    exportFormats: {
        pdf: {
            name: 'PDF',
            icon: 'fas fa-file-pdf',
            color: 'text-red-500',
            description: 'Полный отчет в формате PDF'
        },
        excel: {
            name: 'Excel',
            icon: 'fas fa-file-excel',
            color: 'text-green-500',
            description: 'Данные для анализа в Excel'
        },
        csv: {
            name: 'CSV',
            icon: 'fas fa-file-csv',
            color: 'text-blue-500',
            description: 'Табличные данные CSV'
        },
        image: {
            name: 'Изображения',
            icon: 'fas fa-image',
            color: 'text-purple-500',
            description: 'Графики в формате PNG'
        },
        powerpoint: {
            name: 'PowerPoint',
            icon: 'fas fa-file-powerpoint',
            color: 'text-orange-500',
            description: 'Презентация для докладов'
        }
    },

    // Региональные данные
    regions: {
        dushanbe: {
            name: 'Душанбе',
            code: 'DU',
            color: '#3b82f6',
            population: 1200000,
            coordinates: [38.5598, 68.7870]
        },
        rrp: {
            name: 'Районы республиканского подчинения',
            code: 'RRP',
            color: '#10b981',
            population: 2100000,
            coordinates: [38.7300, 69.0100]
        },
        sughd: {
            name: 'Согдийская область',
            code: 'SG',
            color: '#f59e0b',
            population: 2700000,
            coordinates: [40.2500, 69.0100]
        },
        khatlon: {
            name: 'Хатлонская область',
            code: 'KT',
            color: '#ef4444',
            population: 3400000,
            coordinates: [37.8500, 69.0100]
        },
        gbao: {
            name: 'Горно-Бадахшанская автономная область',
            code: 'GB',
            color: '#8b5cf6',
            population: 230000,
            coordinates: [37.2500, 72.2500]
        }
    },

    // Отрасли экономики
    industries: {
        agriculture: {
            name: 'Сельское хозяйство',
            icon: 'fas fa-seedling',
            color: '#10b981'
        },
        manufacturing: {
            name: 'Производство',
            icon: 'fas fa-industry',
            color: '#3b82f6'
        },
        services: {
            name: 'Услуги',
            icon: 'fas fa-handshake',
            color: '#f59e0b'
        },
        it: {
            name: 'ИТ и телекоммуникации',
            icon: 'fas fa-laptop-code',
            color: '#8b5cf6'
        },
        construction: {
            name: 'Строительство',
            icon: 'fas fa-hammer',
            color: '#ef4444'
        },
        education: {
            name: 'Образование',
            icon: 'fas fa-graduation-cap',
            color: '#06b6d4'
        },
        healthcare: {
            name: 'Здравоохранение',
            icon: 'fas fa-heartbeat',
            color: '#ec4899'
        },
        finance: {
            name: 'Финансы',
            icon: 'fas fa-chart-line',
            color: '#84cc16'
        },
        tourism: {
            name: 'Туризм',
            icon: 'fas fa-map-marked-alt',
            color: '#f97316'
        },
        energy: {
            name: 'Энергетика',
            icon: 'fas fa-bolt',
            color: '#fbbf24'
        }
    },

    // Типы навыков
    skillTypes: {
        technical: {
            name: 'Технические навыки',
            color: '#3b82f6',
            skills: [
                'Программирование',
                'Анализ данных',
                'Кибербезопасность',
                'Системное администрирование',
                'Веб-разработка'
            ]
        },
        soft: {
            name: 'Гибкие навыки',
            color: '#10b981',
            skills: [
                'Коммуникация',
                'Лидерство',
                'Работа в команде',
                'Критическое мышление',
                'Адаптивность'
            ]
        },
        digital: {
            name: 'Цифровые навыки',
            color: '#8b5cf6',
            skills: [
                'Цифровой маркетинг',
                'SMM',
                'E-commerce',
                'Дизайн UI/UX',
                'Контент-менеджмент'
            ]
        },
        language: {
            name: 'Языковые навыки',
            color: '#f59e0b',
            skills: [
                'Английский язык',
                'Русский язык',
                'Китайский язык',
                'Персидский язык',
                'Арабский язык'
            ]
        }
    },

    // Уровни образования
    educationLevels: {
        basic: 'Базовое образование',
        secondary: 'Среднее образование',
        vocational: 'Профессиональное образование',
        higher: 'Высшее образование',
        postgraduate: 'Послевузовское образование'
    },

    // Возрастные группы
    ageGroups: {
        youth: '18-29 лет',
        adult: '30-49 лет',
        senior: '50-64 лет',
        elderly: '65+ лет'
    },

    // Статусы занятости
    employmentStatus: {
        employed: 'Трудоустроен',
        unemployed: 'Безработный',
        student: 'Студент',
        retired: 'Пенсионер',
        disabled: 'Инвалид'
    }
};

// Утилиты для работы с данными
const AnalyticsUtils = {
    // Форматирование чисел
    formatNumber: (number, locale = 'ru-RU') => {
        if (typeof number !== 'number') return '0';
        
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'М';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'К';
        }
        
        return number.toLocaleString(locale);
    },

    // Форматирование валюты
    formatCurrency: (amount, currency = 'TJS', locale = 'tg-TJ') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Форматирование процентов
    formatPercent: (value, decimals = 1) => {
        return `${value.toFixed(decimals)}%`;
    },

    // Форматирование дат
    formatDate: (date, format = 'short', locale = 'ru-RU') => {
        const options = {
            short: { year: 'numeric', month: 'short' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            full: { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            }
        };
        
        return new Intl.DateTimeFormat(locale, options[format]).format(new Date(date));
    },

    // Генерация случайных данных для демонстрации
    generateRandomData: (count, min, max) => {
        return Array.from({ length: count }, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    },

    // Вычисление процентного изменения
    calculatePercentChange: (current, previous) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    },

    // Вычисление среднего значения
    calculateAverage: (values) => {
        if (!Array.isArray(values) || values.length === 0) return 0;
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    },

    // Вычисление медианы
    calculateMedian: (values) => {
        if (!Array.isArray(values) || values.length === 0) return 0;
        
        const sorted = [...values].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        
        return sorted[middle];
    },

    // Дебаунс функция
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

    // Троттлинг функция
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Глубокое клонирование объекта
    deepClone: (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => AnalyticsUtils.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = AnalyticsUtils.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    // Проверка на мобильное устройство
    isMobile: () => {
        return window.innerWidth <= 768;
    },

    // Получение цвета по индексу
    getColorByIndex: (index, palette = 'primary') => {
        const colors = AnalyticsConfig.colorPalettes[palette] || AnalyticsConfig.colorPalettes.primary;
        return colors[index % colors.length];
    },

    // Генерация градиента
    generateGradient: (color1, color2, direction = '135deg') => {
        return `linear-gradient(${direction}, ${color1}, ${color2})`;
    },

    // Конвертация HEX в RGB
    hexToRgb: (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    // Добавление прозрачности к цвету
    addAlpha: (hex, alpha) => {
        const rgb = AnalyticsUtils.hexToRgb(hex);
        return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex;
    },

    // Сохранение данных в локальное хранилище
    saveToLocalStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    },

    // Загрузка данных из локального хранилища
    loadFromLocalStorage: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
            return defaultValue;
        }
    },

    // Экспорт данных в CSV
    exportToCSV: (data, filename = 'data.csv') => {
        if (!Array.isArray(data) || data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Экспорт для использования
if (typeof window !== 'undefined') {
    window.AnalyticsConfig = AnalyticsConfig;
    window.AnalyticsUtils = AnalyticsUtils;
}
