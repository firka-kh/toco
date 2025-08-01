// Функция инициализации графика возрастной структуры населения
function initAgeStructureChart() {
    const ctx = document.getElementById('ageStructureChart');
    
    // Если элемент не найден, выходим из функции
    if (!ctx) {
        console.error('Element with ID "ageStructureChart" not found');
        return;
    }
    
    // Добавляем фильтр по регионам над графиком
    const regionFilterContainer = document.createElement('div');
    regionFilterContainer.className = 'region-filter-container flex items-center justify-between mb-4 px-1 bg-gray-50 rounded-lg py-2';
    regionFilterContainer.innerHTML = `
        <div class="text-sm font-medium text-gray-700 mr-3">Регион:</div>
        <div class="region-chips flex items-center flex-1">
            <button class="region-chip bg-blue-500 text-white text-sm px-4 py-1 rounded-md mr-2" data-region="all">Все регионы</button>
            <button class="region-chip bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-md mr-2" data-region="dushanbe">г. Душанбе</button>
            <button class="region-chip bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-md mr-2" data-region="sughd">Согдийская обл.</button>
            <button class="region-chip bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-md mr-2" data-region="khatlon">Хатлонская обл.</button>
            <button class="region-chip bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-md mr-2" data-region="rnp">РРП</button>
            <button class="region-chip bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-md mr-2" data-region="gbao">ГБАО</button>
        </div>
        <div class="flex items-center">
            <button class="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 ml-2 flex items-center border border-blue-300 rounded-md hover:bg-blue-50 transition-colors" id="customizeRegionsBtn">
                <i class="fas fa-cog mr-1"></i>
                <span>Настроить</span>
            </button>
        </div>
    `;
    
    // Вставляем фильтр перед canvas
    ctx.parentElement.parentElement.insertBefore(regionFilterContainer, ctx.parentElement);
    
    // Данные для графика возрастных групп и пола (мужчины - отрицательные значения для создания пирамиды)
    const ageGroups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65+'];
    const maleData = [7.2, 6.8, 6.5, 5.8, 5.3, 4.9, 4.2, 3.8, 3.4, 2.9, 2.3, 1.8, 1.4, 1.5]; // в процентах
    const femaleData = [6.8, 6.6, 6.3, 5.6, 5.2, 4.8, 4.3, 3.9, 3.6, 3.2, 2.6, 2.1, 1.7, 1.9]; // в процентах
    
    // Преобразуем мужские данные в отрицательные для пирамиды
    const maleDataNegative = maleData.map(value => -value);
    
    // Создаем градиенты для столбцов - делаем их темнее по мере удаления от центра
    const maleGradient = ctx.getContext('2d').createLinearGradient(400, 0, 0, 0); // Горизонтальный градиент справа налево
    maleGradient.addColorStop(0, 'rgba(54, 162, 235, 0.3)'); // Очень светлый у центра
    maleGradient.addColorStop(0.3, 'rgba(54, 162, 235, 0.5)'); // Светлее в первой трети
    maleGradient.addColorStop(0.7, 'rgba(54, 162, 235, 0.7)'); // Темнее во второй трети
    maleGradient.addColorStop(1, 'rgba(25, 118, 210, 0.9)'); // Самый темный у края (более насыщенный синий)
    
    const femaleGradient = ctx.getContext('2d').createLinearGradient(0, 0, 400, 0); // Горизонтальный градиент слева направо
    femaleGradient.addColorStop(0, 'rgba(255, 99, 132, 0.3)'); // Очень светлый у центра
    femaleGradient.addColorStop(0.3, 'rgba(255, 99, 132, 0.5)'); // Светлее в первой трети
    femaleGradient.addColorStop(0.7, 'rgba(255, 99, 132, 0.7)'); // Темнее во второй трети
    femaleGradient.addColorStop(1, 'rgba(213, 0, 71, 0.9)'); // Самый темный у края (более насыщенный красный)
    
    // Сохраняем оригинальные данные для анимации
    const originalMaleData = [...maleDataNegative];
    const originalFemaleData = [...femaleData];
    
    // Создаем диаграмму
    const ageChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ageGroups,
            datasets: [
                {
                    label: 'Мужчины',
                    data: maleDataNegative,
                    backgroundColor: maleGradient,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 0.95
                },
                {
                    label: 'Женщины',
                    data: femaleData,
                    backgroundColor: femaleGradient,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 0.95
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // горизонтальные столбцы
            plugins: {
                title: {
                    display: true,
                    text: 'Распределение населения по возрасту и полу (%)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#333',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    display: false, // Скрываем легенду, так как есть подписи под диаграммой
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let value = context.raw;
                            // Преобразуем отрицательные значения в положительные для отображения
                            value = Math.abs(value);
                            return context.dataset.label + ': ' + value + '%';
                        }
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#333',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8
                },
                datalabels: {
                    display: true, // Включаем отображение подписей
                    formatter: (value) => {
                        return Math.abs(value) > 3 ? Math.abs(value).toFixed(1) + '%' : ''; // показываем проценты только для значимых групп
                    },
                    color: (context) => {
                        // Для больших значений (дальше от центра) - белый текст
                        const absValue = Math.abs(context.dataset.data[context.dataIndex]);
                        if (absValue > 5.5) return '#fff';
                        // Для мужчин - темно-синий, для женщин - темно-красный
                        return context.datasetIndex === 0 ? '#0c4a6e' : '#881337';
                    },
                    backgroundColor: (context) => {
                        // Полупрозрачный фон для меньших значений
                        const absValue = Math.abs(context.dataset.data[context.dataIndex]);
                        if (absValue <= 5.5) return 'rgba(255, 255, 255, 0.7)';
                        return null; // без фона для больших значений
                    },
                    borderRadius: 3,
                    padding: { top: 2, right: 4, bottom: 2, left: 4 },
                    font: {
                        size: 11,
                        weight: 'bold'
                    },
                    anchor: 'center',
                    align: 'center'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        callback: function(value) {
                            // Скрываем метку 0% на оси, чтобы избежать дублирования
                            if (value === 0) return '';
                            return Math.abs(value) + '%'; // Отображаем положительные проценты на оси
                        },
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: function(context) {
                            if (context.tick && context.tick.value === 0) {
                                return 'rgba(0, 0, 0, 0.2)';
                            }
                            return 'rgba(0, 0, 0, 0.05)';
                        },
                        lineWidth: function(context) {
                            if (context.tick && context.tick.value === 0) {
                                return 2;
                            }
                            return 1;
                        }
                    },
                    offset: true,
                    position: 'bottom'
                },
                y: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // Добавляем центральную вертикальную линию для разделения мужчин и женщин
    function addCenterLine() {
        const chartContainer = ctx.parentElement;
        chartContainer.style.position = 'relative';
        
        // Создаем контейнер для подписей мужчин и женщин
        const genderLabelsContainer = document.createElement('div');
        genderLabelsContainer.style.position = 'absolute';
        genderLabelsContainer.style.left = '0';
        genderLabelsContainer.style.right = '0';
        genderLabelsContainer.style.bottom = '5px';
        genderLabelsContainer.style.display = 'flex';
        genderLabelsContainer.style.justifyContent = 'space-between';
        genderLabelsContainer.style.padding = '0 50px';
        genderLabelsContainer.style.zIndex = '10';
        
        // Создаем подпись для мужчин (слева)
        const maleLabel = document.createElement('div');
        maleLabel.style.fontSize = '15px';
        maleLabel.style.fontWeight = 'bold';
        maleLabel.style.color = 'rgba(54, 162, 235, 1)';
        maleLabel.textContent = 'Мужчины';
        maleLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        maleLabel.style.padding = '3px 12px';
        maleLabel.style.borderRadius = '15px';
        maleLabel.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        genderLabelsContainer.appendChild(maleLabel);
        
        // Создаем подпись для женщин (справа)
        const femaleLabel = document.createElement('div');
        femaleLabel.style.fontSize = '15px';
        femaleLabel.style.fontWeight = 'bold';
        femaleLabel.style.color = 'rgba(255, 99, 132, 1)';
        femaleLabel.textContent = 'Женщины';
        femaleLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        femaleLabel.style.padding = '3px 12px';
        femaleLabel.style.borderRadius = '15px';
        femaleLabel.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        genderLabelsContainer.appendChild(femaleLabel);
        
        chartContainer.appendChild(genderLabelsContainer);
    }
    
    // Вызываем функцию добавления центральной линии после рендеринга графика
    setTimeout(addCenterLine, 500);
    
    // Данные для разных регионов
    const regionData = {
        all: {
            male: [...originalMaleData],
            female: [...originalFemaleData],
            title: 'Распределение населения по возрасту и полу (%)'
        },
        dushanbe: {
            male: [-5.9, -5.8, -5.5, -8.4, -9.2, -7.3, -6.1, -5.3, -4.2, -3.5, -2.8, -2.1, -1.7, -1.9],
            female: [5.8, 5.7, 5.4, 8.1, 8.9, 7.5, 6.4, 5.7, 4.5, 3.8, 3.1, 2.3, 1.9, 2.3],
            title: 'Распределение населения г. Душанбе по возрасту и полу (%)'
        },
        sughd: {
            male: [-7.1, -6.9, -6.6, -5.9, -5.5, -5.2, -4.4, -3.9, -3.5, -3.1, -2.5, -1.9, -1.5, -1.6],
            female: [6.7, 6.7, 6.4, 5.7, 5.4, 5.0, 4.5, 4.0, 3.7, 3.3, 2.7, 2.2, 1.8, 2.0],
            title: 'Распределение населения Согдийской области по возрасту и полу (%)'
        },
        khatlon: {
            male: [-7.8, -7.3, -7.0, -5.4, -4.9, -4.6, -3.9, -3.5, -3.2, -2.7, -2.1, -1.7, -1.2, -1.2],
            female: [7.3, 7.0, 6.8, 5.2, 4.8, 4.5, 4.0, 3.6, 3.4, 2.9, 2.3, 1.9, 1.4, 1.6],
            title: 'Распределение населения Хатлонской области по возрасту и полу (%)'
        },
        rnp: {
            male: [-7.5, -7.0, -6.7, -5.6, -5.0, -4.7, -4.1, -3.6, -3.3, -2.8, -2.2, -1.7, -1.3, -1.4],
            female: [7.1, 6.8, 6.5, 5.4, 4.9, 4.6, 4.2, 3.8, 3.5, 3.1, 2.5, 2.0, 1.6, 1.8],
            title: 'Распределение населения РРП по возрасту и полу (%)'
        },
        gbao: {
            male: [-6.7, -6.3, -6.0, -5.3, -4.7, -4.3, -3.8, -3.4, -3.1, -2.6, -2.1, -1.6, -1.3, -1.4],
            female: [6.5, 6.2, 5.9, 5.2, 4.6, 4.2, 3.9, 3.5, 3.2, 2.8, 2.3, 1.8, 1.5, 1.7],
            title: 'Распределение населения ГБАО по возрасту и полу (%)'
        }
    };
    
    // Данные для разных трендов
    const trendData = {
        current: {
            male: [...originalMaleData],
            female: [...originalFemaleData]
        },
        forecast: {
            male: [-6.8, -6.5, -6.2, -5.9, -5.6, -5.3, -4.8, -4.5, -4.1, -3.7, -3.2, -2.8, -2.3, -2.9],
            female: [6.5, 6.3, 6.0, 5.7, 5.5, 5.2, 5.0, 4.7, 4.3, 4.1, 3.6, 3.2, 2.9, 3.5]
        },
        'urban-rural': {
            male: [-5.2, -5.0, -4.8, -5.9, -6.2, -5.5, -4.2, -3.5, -3.1, -2.7, -2.1, -1.5, -1.2, -1.3],
            female: [5.0, 4.8, 4.6, 5.7, 6.0, 5.4, 4.3, 3.7, 3.3, 3.0, 2.4, 1.8, 1.5, 1.7]
        }
    };
    
    // Инициализируем переменную для хранения текущего выбранного региона
    let currentRegion = 'all';
    
    // Функция анимации переключения данных
    function animateChartTransition() {
        // Сначала сохраняем текущие данные
        const currentMaleData = [...ageChart.data.datasets[0].data];
        const currentFemaleData = [...ageChart.data.datasets[1].data];
        
        // Создаем промежуточные данные (уменьшаем до нуля)
        const intermediateMaleData = currentMaleData.map(() => 0);
        const intermediateFemaleData = currentFemaleData.map(() => 0);
        
        // Устанавливаем промежуточные данные с быстрой анимацией
        ageChart.data.datasets[0].data = intermediateMaleData;
        ageChart.data.datasets[1].data = intermediateFemaleData;
        
        // Обновляем график с коротким сжатием
        ageChart.update({
            duration: 300,
            easing: 'easeInQuad'
        });
        
        // После небольшой задержки получаем новые данные и анимируем их
        setTimeout(() => {
            // Вызываем обновление данных
            updateChartDataNoAnimation();
            
            // Обновляем график с более медленным расширением
            ageChart.update({
                duration: 800, 
                easing: 'easeOutElastic'
            });
            
            // Добавляем эффект выделения
            const trendHighlight = document.createElement('div');
            trendHighlight.className = 'trend-highlight';
            trendHighlight.style.position = 'absolute';
            trendHighlight.style.top = '50%';
            trendHighlight.style.left = '50%';
            trendHighlight.style.transform = 'translate(-50%, -50%)';
            trendHighlight.style.width = '70%';
            trendHighlight.style.height = '70%';
            trendHighlight.style.borderRadius = '10px';
            trendHighlight.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            trendHighlight.style.opacity = '0';
            trendHighlight.style.transition = 'opacity 0.5s ease';
            trendHighlight.style.pointerEvents = 'none';
            
            ctx.parentElement.appendChild(trendHighlight);
            trendHighlight.style.opacity = '1';
            
            setTimeout(() => {
                trendHighlight.style.opacity = '0';
                setTimeout(() => {
                    trendHighlight.remove();
                }, 500);
            }, 300);
        }, 350);
    }
    
    // Функция для обновления данных с учетом выбранного региона и тренда (с анимацией)
    function updateChartData() {
        // Запускаем анимацию перехода
        animateChartTransition();
    }
    
    // Функция для обновления данных без анимации - используется внутри animateChartTransition
    function updateChartDataNoAnimation() {
        const activeTrendButton = document.querySelector('.trend-button.active');
        const currentTrend = activeTrendButton ? activeTrendButton.getAttribute('data-trend') : 'current';
        
        let maleData, femaleData, chartTitle;
        
        if (currentTrend === 'current') {
            // Используем данные выбранного региона
            maleData = regionData[currentRegion].male;
            femaleData = regionData[currentRegion].female;
            chartTitle = regionData[currentRegion].title;
        } else {
            // Для прогнозов и других трендов используем общие данные тренда
            maleData = trendData[currentTrend].male;
            femaleData = trendData[currentTrend].female;
            
            // Добавляем название региона в заголовок
            if (currentRegion === 'all') {
                chartTitle = currentTrend === 'forecast' ? 'Прогноз распределения населения к 2035 году (%)' : 'Сравнение городского и сельского населения (%)';
            } else {
                const regionNames = {
                    'dushanbe': 'г. Душанбе',
                    'sughd': 'Согдийская область',
                    'khatlon': 'Хатлонская область',
                    'rnp': 'РРП',
                    'gbao': 'ГБАО'
                };
                const regionName = regionNames[currentRegion] || '';
                chartTitle = currentTrend === 'forecast' ? 
                    `Прогноз распределения населения ${regionName} к 2035 году (%)` : 
                    `Сравнение городского и сельского населения ${regionName} (%)`;
            }
        }
        
        // Применяем обновление данных без анимации
        ageChart.data.datasets[0].data = maleData;
        ageChart.data.datasets[1].data = femaleData;
        ageChart.options.plugins.title.text = chartTitle;
    }
    
    // Обработчики для кнопок регионов
    const regionChips = regionFilterContainer.querySelectorAll('.region-chip');
    regionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            regionChips.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('bg-blue-500', 'text-white');
            this.classList.remove('bg-gray-100', 'text-gray-700');
            
            // Получаем выбранный регион
            const regionType = this.getAttribute('data-region');
            currentRegion = regionType;
            
            // Применяем данные региона к текущему тренду
            updateChartData();
            
            // Анимация эффекта фильтрации
            const filterEffect = document.createElement('div');
            filterEffect.className = 'filter-effect';
            filterEffect.style.position = 'absolute';
            filterEffect.style.top = '0';
            filterEffect.style.left = '0';
            filterEffect.style.right = '0';
            filterEffect.style.bottom = '0';
            filterEffect.style.background = 'rgba(255, 255, 255, 0.3)';
            filterEffect.style.borderRadius = '8px';
            filterEffect.style.pointerEvents = 'none';
            filterEffect.style.opacity = '0.7';
            filterEffect.style.transition = 'opacity 0.5s ease';
            ctx.parentElement.appendChild(filterEffect);
            
            setTimeout(() => {
                filterEffect.style.opacity = '0';
                setTimeout(() => filterEffect.remove(), 500);
            }, 300);
        });
    });
    
    // Кнопка настройки регионов
    const customizeBtn = document.getElementById('customizeRegionsBtn');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', function() {
            alert('Функциональность настройки регионов будет доступна в следующем обновлении');
        });
    }
    
    // Добавляем интерактивные элементы для визуализации демографических трендов
    const trendSelector = document.createElement('div');
    trendSelector.className = 'age-trend-selector flex items-center justify-center mt-4 space-x-4';
    trendSelector.innerHTML = `
        <button class="trend-button text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 active" data-trend="current">Текущие данные</button>
        <button class="trend-button text-sm font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200" data-trend="forecast">Прогноз 2035</button>
        <button class="trend-button text-sm font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200" data-trend="urban-rural">Город/Село</button>
    `;
    ctx.parentElement.parentElement.appendChild(trendSelector);
    
    // Обработчики для кнопок переключения трендов
    const trendButtons = trendSelector.querySelectorAll('.trend-button');
    trendButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            trendButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-100', 'text-blue-800');
                btn.classList.add('bg-gray-100', 'text-gray-800');
            });
            
            // Добавляем активный класс на нажатую кнопку
            this.classList.add('active', 'bg-blue-100', 'text-blue-800');
            this.classList.remove('bg-gray-100', 'text-gray-800');
            
            // Получаем выбранный тренд
            const trendType = this.getAttribute('data-trend');
            
            // Обновляем данные графика с учетом выбранного региона
            updateChartData();
            
            // Добавляем эффект выделения при переключении трендов
            const chartContainer = ctx.parentElement;
            const trendHighlight = document.createElement('div');
            trendHighlight.className = 'trend-highlight';
            trendHighlight.style.position = 'absolute';
            trendHighlight.style.top = '50%';
            trendHighlight.style.left = '50%';
            trendHighlight.style.transform = 'translate(-50%, -50%)';
            trendHighlight.style.width = '70%';
            trendHighlight.style.height = '70%';
            trendHighlight.style.borderRadius = '10px';
            trendHighlight.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            trendHighlight.style.opacity = '0';
            trendHighlight.style.transition = 'opacity 0.5s ease';
            trendHighlight.style.pointerEvents = 'none';
            
            // Добавляем и убираем эффект выделения
            chartContainer.appendChild(trendHighlight);
            trendHighlight.style.opacity = '1';
            
            setTimeout(() => {
                trendHighlight.style.opacity = '0';
                setTimeout(() => {
                    trendHighlight.remove();
                }, 500);
            }, 300);
        });
    });
    
    // Добавляем источник данных
    const sourceInfo = document.createElement('div');
    sourceInfo.className = 'chart-data-source text-xs text-gray-500 italic mt-2 text-right';
    sourceInfo.textContent = 'Источник: Агентство по статистике РТ, 2024';
    ctx.parentElement.parentElement.appendChild(sourceInfo);
    
    // Добавляем подписи для значений под графиком
    const insightNote = document.createElement('div');
    insightNote.className = 'mt-4 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg';
    insightNote.innerHTML = `
        <p class="font-medium text-gray-800 mb-2">Демографические выводы:</p>
        <ul class="list-disc pl-4 space-y-1">
            <li>Молодая возрастная структура обеспечивает высокий потенциал трудовых ресурсов</li>
            <li>Высокая доля населения 15-29 лет создает «демографический дивиденд» для экономики</li>
            <li>Низкая доля пожилого населения снижает нагрузку на пенсионную систему</li>
            <li>Для рынка труда ежегодно становятся доступны около 200,000 молодых работников</li>
        </ul>
    `;
    ctx.parentElement.parentElement.appendChild(insightNote);
}
