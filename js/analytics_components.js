// Дополнительные интерактивные компоненты для панели аналитики
// analytics_components.js

class AdvancedAnalytics {
    constructor() {
        this.chartInstances = new Map();
        this.dataCache = new Map();
        this.animationDuration = 1000;
        this.colorPalettes = {
            primary: ['#4f46e5', '#7c3aed', '#ec4899', '#10b981', '#f59e0b'],
            secondary: ['#6366f1', '#8b5cf6', '#f472b6', '#34d399', '#fbbf24'],
            gradients: [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            ]
        };
    }

    // Создание продвинутого спидометра как в современных автомобилях
    createModernGauge(canvasId, value, maxValue = 100, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        // Настройки по умолчанию
        const config = {
            startAngle: -Math.PI * 0.75,
            endAngle: Math.PI * 0.75,
            backgroundColor: '#f3f4f6',
            primaryColor: options.color || '#4f46e5',
            secondaryColor: options.secondaryColor || '#e5e7eb',
            textColor: '#1f2937',
            showLabels: options.showLabels !== false,
            showValue: options.showValue !== false,
            title: options.title || '',
            unit: options.unit || '',
            ...options
        };

        // Очистка канваса
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисование фона спидометра
        this.drawGaugeBackground(ctx, centerX, centerY, radius, config);
        
        // Рисование шкалы
        this.drawGaugeScale(ctx, centerX, centerY, radius, config, maxValue);
        
        // Рисование значения
        this.drawGaugeValue(ctx, centerX, centerY, radius, config, value, maxValue);
        
        // Рисование стрелки
        this.drawGaugeNeedle(ctx, centerX, centerY, radius, config, value, maxValue);
        
        // Рисование центрального элемента
        this.drawGaugeCenter(ctx, centerX, centerY, config);
        
        // Рисование текста
        this.drawGaugeText(ctx, centerX, centerY, config, value);

        return {
            update: (newValue) => this.updateGauge(canvasId, newValue, maxValue, config)
        };
    }

    drawGaugeBackground(ctx, centerX, centerY, radius, config) {
        // Внешний круг
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = config.backgroundColor;
        ctx.fill();
        
        // Градиентный фон
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    drawGaugeScale(ctx, centerX, centerY, radius, config, maxValue) {
        const { startAngle, endAngle } = config;
        const totalAngle = endAngle - startAngle;
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
            const angle = startAngle + (totalAngle * i / steps);
            const value = (maxValue * i / steps);
            
            // Основные деления
            const outerRadius = radius - 10;
            const innerRadius = radius - 25;
            const x1 = centerX + Math.cos(angle) * outerRadius;
            const y1 = centerY + Math.sin(angle) * outerRadius;
            const x2 = centerX + Math.cos(angle) * innerRadius;
            const y2 = centerY + Math.sin(angle) * innerRadius;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = config.secondaryColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Подписи
            if (config.showLabels && i % 2 === 0) {
                const labelRadius = radius - 35;
                const labelX = centerX + Math.cos(angle) * labelRadius;
                const labelY = centerY + Math.sin(angle) * labelRadius;
                
                ctx.fillStyle = config.textColor;
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(Math.round(value), labelX, labelY);
            }
            
            // Малые деления
            if (i < steps) {
                for (let j = 1; j < 5; j++) {
                    const smallAngle = angle + (totalAngle / steps) * (j / 5);
                    const smallX1 = centerX + Math.cos(smallAngle) * (radius - 10);
                    const smallY1 = centerY + Math.sin(smallAngle) * (radius - 10);
                    const smallX2 = centerX + Math.cos(smallAngle) * (radius - 18);
                    const smallY2 = centerY + Math.sin(smallAngle) * (radius - 18);
                    
                    ctx.beginPath();
                    ctx.moveTo(smallX1, smallY1);
                    ctx.lineTo(smallX2, smallY2);
                    ctx.strokeStyle = config.secondaryColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    drawGaugeValue(ctx, centerX, centerY, radius, config, value, maxValue) {
        const { startAngle, endAngle } = config;
        const totalAngle = endAngle - startAngle;
        const valueAngle = startAngle + (totalAngle * value / maxValue);
        
        // Цветная дуга для показания значения
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 30, startAngle, valueAngle);
        ctx.strokeStyle = config.primaryColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Градиентный эффект
        const gradient = ctx.createLinearGradient(
            centerX - radius, centerY,
            centerX + radius, centerY
        );
        gradient.addColorStop(0, config.primaryColor);
        gradient.addColorStop(1, config.primaryColor + '80');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 32, startAngle, valueAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    drawGaugeNeedle(ctx, centerX, centerY, radius, config, value, maxValue) {
        const { startAngle, endAngle } = config;
        const totalAngle = endAngle - startAngle;
        const needleAngle = startAngle + (totalAngle * value / maxValue);
        
        const needleLength = radius - 40;
        const needleX = centerX + Math.cos(needleAngle) * needleLength;
        const needleY = centerY + Math.sin(needleAngle) * needleLength;
        
        // Тень стрелки
        ctx.beginPath();
        ctx.moveTo(centerX + 2, centerY + 2);
        ctx.lineTo(needleX + 2, needleY + 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Основная стрелка
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(needleX, needleY);
        ctx.strokeStyle = config.textColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    drawGaugeCenter(ctx, centerX, centerY, config) {
        // Центральный круг с градиентом
        const centerGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, 15
        );
        centerGradient.addColorStop(0, '#ffffff');
        centerGradient.addColorStop(0.7, config.primaryColor);
        centerGradient.addColorStop(1, config.textColor);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
        ctx.fillStyle = centerGradient;
        ctx.fill();
        
        // Внутренний круг
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    drawGaugeText(ctx, centerX, centerY, config, value) {
        if (config.showValue) {
            // Значение
            ctx.fillStyle = config.textColor;
            ctx.font = 'bold 24px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                Math.round(value) + (config.unit || ''),
                centerX,
                centerY + 40
            );
        }
        
        if (config.title) {
            // Заголовок
            ctx.fillStyle = config.textColor;
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(config.title, centerX, centerY - 60);
        }
    }

    // Создание интерактивной круговой диаграммы
    createInteractivePieChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const config = {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: this.colorPalettes.primary,
                    borderWidth: 0,
                    cutout: options.cutout || '70%',
                    spacing: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
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
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${percentage}%`;
                            }
                        }
                    }
                },
                onHover: (event, activeElements) => {
                    canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: this.animationDuration
                }
            }
        };

        const chart = new Chart(canvas.getContext('2d'), config);
        this.chartInstances.set(canvasId, chart);
        return chart;
    }

    // Создание продвинутого линейного графика
    createAdvancedLineChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const config = {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: data.datasets.map((dataset, index) => ({
                    label: dataset.label,
                    data: dataset.data,
                    borderColor: this.colorPalettes.primary[index % this.colorPalettes.primary.length],
                    backgroundColor: this.colorPalettes.primary[index % this.colorPalettes.primary.length] + '20',
                    borderWidth: 3,
                    fill: dataset.fill || false,
                    tension: 0.4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: this.colorPalettes.primary[index % this.colorPalettes.primary.length],
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }))
            },
            options: {
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
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#4f46e5',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        display: true,
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
                        display: true,
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
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: this.animationDuration
                }
            }
        };

        const chart = new Chart(canvas.getContext('2d'), config);
        this.chartInstances.set(canvasId, chart);
        return chart;
    }

    // Создание тепловой карты
    createHeatmapChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        const cellWidth = width / data[0].length;
        const cellHeight = height / data.length;
        
        // Находим минимальное и максимальное значения
        const flatData = data.flat();
        const minValue = Math.min(...flatData);
        const maxValue = Math.max(...flatData);
        
        // Функция для получения цвета на основе значения
        const getColor = (value) => {
            const normalized = (value - minValue) / (maxValue - minValue);
            const r = Math.round(255 * (1 - normalized));
            const g = Math.round(255 * (1 - normalized));
            const b = 255;
            return `rgb(${r}, ${g}, ${b})`;
        };
        
        // Рисование тепловой карты
        data.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                const x = colIndex * cellWidth;
                const y = rowIndex * cellHeight;
                
                ctx.fillStyle = getColor(value);
                ctx.fillRect(x, y, cellWidth, cellHeight);
                
                // Добавление значения в ячейку
                ctx.fillStyle = '#000000';
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    value.toFixed(1),
                    x + cellWidth / 2,
                    y + cellHeight / 2
                );
            });
        });
    }

    // Анимация обновления диаграммы
    animateChartUpdate(chartId, newData) {
        const chart = this.chartInstances.get(chartId);
        if (!chart) return;

        chart.data.datasets.forEach((dataset, datasetIndex) => {
            if (newData.datasets[datasetIndex]) {
                dataset.data = newData.datasets[datasetIndex].data;
            }
        });

        chart.update('active');
    }

    // Экспорт диаграммы как изображение
    exportChart(chartId, filename = 'chart.png') {
        const chart = this.chartInstances.get(chartId);
        if (!chart) return;

        const canvas = chart.canvas;
        const url = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }

    // Уничтожение диаграммы
    destroyChart(chartId) {
        const chart = this.chartInstances.get(chartId);
        if (chart) {
            chart.destroy();
            this.chartInstances.delete(chartId);
        }
    }

    // Изменение размера всех диаграмм
    resizeAllCharts() {
        this.chartInstances.forEach(chart => {
            chart.resize();
        });
    }
}

// Экспорт класса для использования
window.AdvancedAnalytics = AdvancedAnalytics;
