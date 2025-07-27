// Скрипт для детализации отраслей в аналитической панели

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик события детализации отрасли
    document.addEventListener('showIndustryDetails', function(event) {
        const { label, value, index } = event.detail;
        
        // Находим панель индустрии
        const industryCard = document.querySelector('#industryDistribution');
        if (!industryCard) return;
        
        // Проверяем, есть ли уже панель деталей
        let detailsPanel = industryCard.querySelector('.industry-details');
        
        if (!detailsPanel) {
            // Создаем панель деталей, если ее еще нет
            detailsPanel = document.createElement('div');
            detailsPanel.className = 'industry-details';
            
            detailsPanel.innerHTML = `
                <div class="industry-detail-header">
                    <div class="industry-detail-name">${label}</div>
                    <div class="close-details"><i class="fas fa-times"></i></div>
                </div>
                <div class="industry-detail-stats">
                    <div class="detail-stat-item">
                        <div class="detail-stat-value">${value}%</div>
                        <div class="detail-stat-label">Доля в экономике</div>
                    </div>
                    <div class="detail-stat-item">
                        <div class="detail-stat-value">+${(Math.random() * 5).toFixed(1)}%</div>
                        <div class="detail-stat-label">Рост за год</div>
                    </div>
                    <div class="detail-stat-item">
                        <div class="detail-stat-value">${Math.floor(Math.random() * 500) + 1000}</div>
                        <div class="detail-stat-label">Активных вакансий</div>
                    </div>
                    <div class="detail-stat-item">
                        <div class="detail-stat-value">${Math.floor(Math.random() * 100) + 400}</div>
                        <div class="detail-stat-label">Средняя зарплата ($)</div>
                    </div>
                </div>
                <div class="detail-trends" style="flex-grow: 1; height: 120px;">
                    <canvas id="detailTrendChart"></canvas>
                </div>
            `;
            
            industryCard.appendChild(detailsPanel);
            
            // Добавляем обработчик для закрытия
            detailsPanel.querySelector('.close-details').addEventListener('click', function() {
                detailsPanel.classList.remove('show');
            });
        } else {
            // Обновляем данные в существующей панели
            detailsPanel.querySelector('.industry-detail-name').textContent = label;
            detailsPanel.querySelector('.detail-stat-value').textContent = value + '%';
        }
        
        // Показываем панель
        detailsPanel.classList.add('show');
        
        // Создаем график тренда для выбранной отрасли
        const detailCtx = document.getElementById('detailTrendChart');
        if (detailCtx) {
            // Генерируем случайные данные для тренда
            const trendData = Array.from({length: 12}, () => 
                Math.floor(Math.random() * 20) + value - 10
            );
            
            // Если уже есть график, уничтожаем его
            if (window.detailChart) {
                window.detailChart.destroy();
            }
            
            // Создаем новый график
            window.detailChart = new Chart(detailCtx, {
                type: 'line',
                data: {
                    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    datasets: [{
                        label: 'Тренд за год',
                        data: trendData,
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            radius: 2
                        }
                    }
                }
            });
        }
    });
});
