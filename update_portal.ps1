# Скрипт автоматизации обновления портала рынка труда
# Этот скрипт обновляет все HTML-файлы портала для внедрения единого дизайна

Write-Host "=== Автоматизация обновления портала рынка труда ===" -ForegroundColor Green
Write-Host "Обновление всех страниц для внедрения единого дизайна..." -ForegroundColor Yellow

# Список основных HTML-файлов для обновления
$htmlFiles = @(
    "about.html",
    "analitic_pg.html", 
    "employer_anons_work.html",
    "employer_profile.html",
    "gov_pg.html",
    "micro_credit.html",
    "online_interviews.html",
    "prof_skill_need.html",
    "register.html",
    "serchwork.html",
    "skill_serch.html",
    "talent_report.html",
    "test_blind.html",
    "user_profile.html",
    "video_res.html",
    "youth_programs.html",
    "2_online_interview.html"
)

# Фриланс-файлы
$freelanceFiles = @(
    "free_lans/benefits.html",
    "free_lans/categories.html",
    "free_lans/contact.html",
    "free_lans/cta.html",
    "free_lans/find_tasks.html",
    "free_lans/freelance_homepage.html",
    "free_lans/help_faq.html",
    "free_lans/how_it_works.html",
    "free_lans/how_to_find_job.html",
    "free_lans/how_to_post_project.html",
    "free_lans/privacy_policy.html",
    "free_lans/publish_service.html",
    "free_lans/rules.html",
    "free_lans/security_center.html"
)

# Платные услуги
$payFiles = @(
    "pay_cont/ads.html",
    "pay_cont/analytics.html",
    "pay_cont/api_access.html",
    "pay_cont/commission.html",
    "pay_cont/fairs.html",
    "pay_cont/paid_services.html",
    "pay_cont/premium.html"
)

Write-Host "Файлы для обновления найдены. Общее количество: $($htmlFiles.Count + $freelanceFiles.Count + $payFiles.Count)" -ForegroundColor Cyan

# Функция добавления единых стилей и скриптов в head
function Add-CommonResources {
    param([string]$filePath)
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Проверяем, не добавлены ли уже общие ресурсы
        if ($content -notmatch "assets/css/common.css") {
            Write-Host "  → Добавление общих ресурсов в $filePath" -ForegroundColor Blue
            
            # Добавляем CSS и JS после существующих ресурсов
            $content = $content -replace '(<link rel="stylesheet" href="https://cdn\.jsdelivr\.net/npm/@fortawesome[^>]+>)', '$1`n    <link rel="stylesheet" href="assets/css/common.css">'
            $content = $content -replace '(</head>)', '    <script src="assets/js/common.js"></script>`n$1'
            
            Set-Content $filePath -Value $content -Encoding UTF8
        } else {
            Write-Host "  ✓ Общие ресурсы уже добавлены в $filePath" -ForegroundColor Gray
        }
    }
}

# Функция замены header на единый
function Replace-Header {
    param([string]$filePath)
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Проверяем, не заменён ли уже header
        if ($content -notmatch 'id="portal-header"') {
            Write-Host "  → Замена header в $filePath" -ForegroundColor Blue
            
            # Ищем и заменяем различные варианты header
            $headerPatterns = @(
                '(?s)<header[^>]*>.*?</header>',
                '(?s)<!-- Header Start -->.*?<!-- Header End -->',
                '(?s)<div[^>]*class="[^"]*header[^"]*"[^>]*>.*?</div>',
                '(?s)<nav[^>]*class="[^"]*navbar[^"]*"[^>]*>.*?</nav>'
            )
            
            $headerReplacement = @'
    <!-- Подключение единого header -->
    <div id="portal-header"></div>
    <script>
        // Загружаем header при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            fetch('header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('portal-header').innerHTML = data;
                    // Инициализируем приложение после загрузки header
                    if (typeof window.PortalApp !== 'undefined') {
                        window.PortalApp.init();
                    }
                })
                .catch(error => console.error('Ошибка загрузки header:', error));
        });
    </script>
'@
            
            $replaced = $false
            foreach ($pattern in $headerPatterns) {
                if ($content -match $pattern) {
                    $content = $content -replace $pattern, $headerReplacement
                    $replaced = $true
                    break
                }
            }
            
            if ($replaced) {
                Set-Content $filePath -Value $content -Encoding UTF8
            } else {
                Write-Host "  ⚠ Header не найден для замены в $filePath" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ✓ Единый header уже установлен в $filePath" -ForegroundColor Gray
        }
    }
}

# Функция замены footer на единый
function Replace-Footer {
    param([string]$filePath)
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Проверяем, не заменён ли уже footer
        if ($content -notmatch 'id="portal-footer"') {
            Write-Host "  → Замена footer в $filePath" -ForegroundColor Blue
            
            # Ищем и заменяем различные варианты footer
            $footerPatterns = @(
                '(?s)<footer[^>]*>.*?</footer>',
                '(?s)<!-- Footer Start -->.*?<!-- Footer End -->',
                '(?s)<div[^>]*class="[^"]*footer[^"]*"[^>]*>.*?</div>'
            )
            
            $footerReplacement = @'
    <!-- Подключение единого footer -->
    <div id="portal-footer"></div>
    <script>
        // Загружаем footer
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('portal-footer').innerHTML = data;
            })
            .catch(error => console.error('Ошибка загрузки footer:', error));
    </script>
'@
            
            $replaced = $false
            foreach ($pattern in $footerPatterns) {
                if ($content -match $pattern) {
                    $content = $content -replace $pattern, $footerReplacement
                    $replaced = $true
                    break
                }
            }
            
            if ($replaced) {
                Set-Content $filePath -Value $content -Encoding UTF8
            } else {
                Write-Host "  ⚠ Footer не найден для замены в $filePath" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ✓ Единый footer уже установлен в $filePath" -ForegroundColor Gray
        }
    }
}

# Обработка основных файлов
Write-Host "`n=== Обработка основных страниц ===" -ForegroundColor Green
foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "Обрабатывается: $file" -ForegroundColor White
        Add-CommonResources $file
        Replace-Header $file
        Replace-Footer $file
    } else {
        Write-Host "⚠ Файл не найден: $file" -ForegroundColor Red
    }
}

# Обработка фриланс-файлов
Write-Host "`n=== Обработка фриланс-страниц ===" -ForegroundColor Green
foreach ($file in $freelanceFiles) {
    if (Test-Path $file) {
        Write-Host "Обрабатывается: $file" -ForegroundColor White
        Add-CommonResources $file
        Replace-Header $file
        Replace-Footer $file
    } else {
        Write-Host "⚠ Файл не найден: $file" -ForegroundColor Red
    }
}

# Обработка файлов платных услуг
Write-Host "`n=== Обработка страниц платных услуг ===" -ForegroundColor Green
foreach ($file in $payFiles) {
    if (Test-Path $file) {
        Write-Host "Обрабатывается: $file" -ForegroundColor White
        Add-CommonResources $file
        Replace-Header $file
        Replace-Footer $file
    } else {
        Write-Host "⚠ Файл не найден: $file" -ForegroundColor Red
    }
}

Write-Host "`n=== Обновление завершено! ===" -ForegroundColor Green
Write-Host "Единый дизайн внедрён во все страницы портала." -ForegroundColor Cyan
Write-Host "Проверьте работу сайта в браузере." -ForegroundColor Yellow
