// Демонстрационные данные для панели аналитики TOCO
// sample-data.js

const SampleData = {
    // Основные показатели занятости
    employmentMetrics: {
        totalPopulation: 9749000,
        laborForce: 2400000,
        employed: 2280000,
        unemployed: 120000,
        unemploymentRate: 5.0,
        employmentRate: 95.0,
        activeJobSeekers: 45000,
        newVacancies: 1250,
        averageSalary: 2100,
        minWage: 500
    },

    // Тренды по месяцам
    monthlyTrends: {
        labels: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        employment: [94.2, 94.5, 94.8, 95.1, 95.3, 95.0, 94.8, 94.9, 95.2, 95.5, 95.1, 95.0],
        unemployment: [5.8, 5.5, 5.2, 4.9, 4.7, 5.0, 5.2, 5.1, 4.8, 4.5, 4.9, 5.0],
        vacancies: [980, 1050, 1120, 1180, 1250, 1300, 1220, 1180, 1240, 1320, 1280, 1250],
        newRegistrations: [450, 520, 580, 640, 720, 680, 560, 590, 650, 710, 680, 650]
    },

    // Данные по регионам
    regionalData: {
        labels: ['Душанбе', 'РРП', 'Согдийская обл.', 'Хатлонская обл.', 'ГБАО'],
        employment: [
            { region: 'Душанбе', employed: 580000, unemployed: 20000, rate: 96.7 },
            { region: 'РРП', employed: 520000, unemployed: 28000, rate: 94.9 },
            { region: 'Согдийская обл.', employed: 640000, unemployed: 35000, rate: 94.8 },
            { region: 'Хатлонская обл.', employed: 450000, unemployed: 30000, rate: 93.8 },
            { region: 'ГБАО', employed: 90000, unemployed: 7000, rate: 92.8 }
        ],
        salaries: [2800, 2200, 2050, 1850, 2300],
        vacancies: [420, 380, 280, 120, 50],
        population: [1200000, 2100000, 2700000, 3400000, 230000]
    },

    // Данные по отраслям
    industryData: {
        labels: [
            'Сельское хозяйство', 'Производство', 'Услуги', 'ИТ и телеком',
            'Строительство', 'Образование', 'Здравоохранение', 'Финансы',
            'Туризм', 'Энергетика'
        ],
        employment: [680000, 320000, 420000, 85000, 180000, 245000, 195000, 65000, 45000, 95000],
        averageSalaries: [1200, 2800, 2200, 4500, 2100, 1800, 2000, 3200, 1900, 2600],
        vacancies: [120, 280, 350, 180, 95, 85, 70, 45, 25, 50],
        growth: [2.1, 4.8, 3.2, 12.5, 1.8, 2.9, 3.1, 5.2, -1.2, 3.8]
    },

    // Анализ навыков
    skillsAnalysis: {
        mostDemanded: [
            { skill: 'Цифровые навыки', demand: 85, supply: 45, gap: 40 },
            { skill: 'Английский язык', demand: 78, supply: 38, gap: 40 },
            { skill: 'Программирование', demand: 92, supply: 25, gap: 67 },
            { skill: 'Анализ данных', demand: 75, supply: 32, gap: 43 },
            { skill: 'Проектное управление', demand: 68, supply: 42, gap: 26 },
            { skill: 'Продажи', demand: 82, supply: 58, gap: 24 },
            { skill: 'Маркетинг', demand: 65, supply: 41, gap: 24 },
            { skill: 'Бухгалтерия', demand: 55, supply: 72, gap: -17 }
        ],
        byCategory: {
            technical: { total: 45000, certified: 28000, inDemand: 65000 },
            soft: { total: 180000, certified: 95000, inDemand: 220000 },
            digital: { total: 85000, certified: 42000, inDemand: 125000 },
            language: { total: 95000, certified: 35000, inDemand: 150000 }
        }
    },

    // Возрастная структура
    ageDistribution: {
        labels: ['18-25 лет', '26-35 лет', '36-45 лет', '46-55 лет', '56-65 лет'],
        employed: [280000, 620000, 580000, 480000, 320000],
        unemployed: [35000, 28000, 22000, 20000, 15000],
        seeking: [18000, 12000, 8000, 5000, 2000]
    },

    // Образовательная структура
    educationDistribution: {
        labels: [
            'Базовое образование',
            'Среднее образование', 
            'Профессиональное образование',
            'Высшее образование',
            'Послевузовское образование'
        ],
        employed: [180000, 680000, 520000, 780000, 120000],
        unemployed: [28000, 45000, 25000, 18000, 4000],
        averageSalary: [800, 1400, 1800, 2800, 4200]
    },

    // Миграционные данные
    migrationData: {
        internal: {
            labels: ['В Душанбе', 'Из Душанбе', 'Межрегиональная'],
            inflow: [25000, 8000, 15000],
            outflow: [8000, 25000, 12000],
            net: [17000, -17000, 3000]
        },
        external: {
            labels: ['Россия', 'Казахстан', 'Кыргызстан', 'Другие'],
            emigrants: [180000, 25000, 8000, 12000],
            returnees: [45000, 8000, 3000, 4000],
            remittances: [2800000000, 180000000, 25000000, 85000000] // в сомони
        }
    },

    // Прогнозные данные
    forecastData: {
        employment: {
            labels: ['2024', '2025', '2026', '2027', '2028'],
            optimistic: [96.2, 96.8, 97.2, 97.5, 97.8],
            realistic: [95.0, 95.3, 95.6, 95.8, 96.0],
            pessimistic: [93.8, 94.0, 94.2, 94.4, 94.6]
        },
        salaries: {
            labels: ['2024', '2025', '2026', '2027', '2028'],
            average: [2100, 2280, 2450, 2620, 2800],
            it: [4500, 5200, 5850, 6500, 7200],
            agriculture: [1200, 1320, 1450, 1580, 1720]
        },
        vacancies: {
            labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
            it: [180, 220, 250, 280],
            services: [350, 380, 420, 450],
            manufacturing: [280, 300, 320, 340]
        }
    },

    // Данные по программам трудоустройства
    employmentPrograms: {
        activePrograms: [
            {
                name: 'Молодежная занятость',
                participants: 12000,
                completed: 8500,
                employed: 6800,
                successRate: 80,
                budget: 15000000
            },
            {
                name: 'Переквалификация',
                participants: 8500,
                completed: 7200,
                employed: 5400,
                successRate: 75,
                budget: 12000000
            },
            {
                name: 'Микрокредитование',
                participants: 5200,
                completed: 4800,
                employed: 4200,
                successRate: 88,
                budget: 25000000
            },
            {
                name: 'Сельская занятость',
                participants: 15000,
                completed: 12000,
                employed: 9600,
                successRate: 80,
                budget: 18000000
            }
        ],
        monthlyProgress: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            newParticipants: [850, 920, 1100, 1250, 1350, 1180],
            completions: [680, 750, 820, 950, 1080, 920],
            placements: [520, 580, 650, 720, 850, 740]
        }
    },

    // Удовлетворенность услугами
    satisfaction: {
        services: [
            { service: 'Поиск работы', rating: 4.2, responses: 2500 },
            { service: 'Профориентация', rating: 4.0, responses: 1800 },
            { service: 'Обучение', rating: 4.5, responses: 1200 },
            { service: 'Микрокредиты', rating: 3.8, responses: 800 },
            { service: 'Консультации', rating: 4.1, responses: 3200 }
        ],
        overall: 4.1,
        nps: 68
    },

    // Экономические индикаторы
    economicIndicators: {
        gdp: {
            current: 85600000000, // в сомони
            growth: 3.8,
            perCapita: 8780
        },
        inflation: 5.2,
        productivity: {
            change: 2.8,
            sectors: {
                agriculture: 1.2,
                industry: 4.5,
                services: 3.1
            }
        },
        investment: {
            fdi: 320000000, // прямые иностранные инвестиции
            domestic: 1200000000,
            infrastructure: 890000000
        }
    }
};

// Утилиты для работы с демонстрационными данными
const SampleDataUtils = {
    // Получение случайных исторических данных
    generateHistoricalData: (months = 12, baseValue = 100, variance = 10) => {
        const data = [];
        let currentValue = baseValue;
        
        for (let i = 0; i < months; i++) {
            const change = (Math.random() - 0.5) * variance;
            currentValue += change;
            currentValue = Math.max(0, currentValue); // не меньше 0
            data.push(Math.round(currentValue * 100) / 100);
        }
        
        return data;
    },

    // Генерация данных с трендом
    generateTrendData: (months = 12, startValue = 100, trendRate = 0.05) => {
        const data = [];
        
        for (let i = 0; i < months; i++) {
            const trendValue = startValue * Math.pow(1 + trendRate, i / 12);
            const randomVariation = (Math.random() - 0.5) * startValue * 0.1;
            data.push(Math.round((trendValue + randomVariation) * 100) / 100);
        }
        
        return data;
    },

    // Получение данных по региону
    getRegionalData: (regionCode) => {
        const regionMap = {
            'DU': 0, 'RRP': 1, 'SG': 2, 'KT': 3, 'GB': 4
        };
        
        const index = regionMap[regionCode];
        if (index === undefined) return null;
        
        return {
            employment: SampleData.regionalData.employment[index],
            salary: SampleData.regionalData.salaries[index],
            vacancies: SampleData.regionalData.vacancies[index],
            population: SampleData.regionalData.population[index]
        };
    },

    // Получение топ навыков с наибольшим разрывом
    getTopSkillGaps: (limit = 5) => {
        return SampleData.skillsAnalysis.mostDemanded
            .sort((a, b) => b.gap - a.gap)
            .slice(0, limit);
    },

    // Расчет показателей эффективности программ
    calculateProgramEfficiency: () => {
        return SampleData.employmentPrograms.activePrograms.map(program => ({
            ...program,
            efficiency: (program.employed / program.budget * 1000000).toFixed(2),
            completionRate: (program.completed / program.participants * 100).toFixed(1)
        }));
    },

    // Генерация сравнительных данных
    generateComparison: (current, previous) => {
        const change = current - previous;
        const percentChange = previous !== 0 ? (change / previous * 100) : 0;
        
        return {
            current,
            previous,
            change,
            percentChange: Math.round(percentChange * 100) / 100,
            trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
        };
    },

    // Получение данных для дашборда
    getDashboardSummary: () => {
        const metrics = SampleData.employmentMetrics;
        const lastMonth = SampleData.monthlyTrends.employment[SampleData.monthlyTrends.employment.length - 1];
        const prevMonth = SampleData.monthlyTrends.employment[SampleData.monthlyTrends.employment.length - 2];
        
        return {
            totalEmployed: metrics.employed,
            employmentRate: metrics.employmentRate,
            unemployment: metrics.unemployed,
            unemploymentRate: metrics.unemploymentRate,
            activeVacancies: metrics.newVacancies,
            averageSalary: metrics.averageSalary,
            monthlyChange: SampleDataUtils.generateComparison(lastMonth, prevMonth),
            topRegion: SampleData.regionalData.employment.reduce((max, region) => 
                region.rate > max.rate ? region : max
            ),
            topIndustry: {
                name: 'ИТ и телекоммуникации',
                growth: 12.5,
                avgSalary: 4500
            }
        };
    }
};

// Экспорт для использования
if (typeof window !== 'undefined') {
    window.SampleData = SampleData;
    window.SampleDataUtils = SampleDataUtils;
}
