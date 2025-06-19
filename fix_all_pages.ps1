# PowerShell скрипт для исправления всех страниц портала
# Заменяет подключения CSS/JS на исправленные версии и обновляет header/footer

Write-Host "Начинаем массовое исправление всех страниц портала..." -ForegroundColor Green

# Получаем все HTML файлы в корне и подпапках
$htmlFiles = Get-ChildItem -Path "." -Include "*.html" -Recurse | Where-Object { 
    $_.Name -ne "header.html" -and 
    $_.Name -ne "header_simple.html" -and 
    $_.Name -ne "footer.html" -and
    $_.Name -ne "test_page.html"
}

$processedFiles = 0
$errorFiles = @()

foreach ($file in $htmlFiles) {
    try {
        Write-Host "Обрабатываем: $($file.FullName)" -ForegroundColor Yellow
        
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        $changed = $false
        
        # 1. Заменяем подключения CSS на исправленную версию
        if ($content -match 'assets/css/common\.css') {
            $content = $content -replace 'assets/css/common\.css', 'assets/css/common_fixed.css'
            $changed = $true
            Write-Host "  ✓ Обновлено подключение CSS" -ForegroundColor Cyan
        }
        
        # 2. Заменяем подключения JS на исправленную версию
        if ($content -match 'assets/js/common\.js') {
            $content = $content -replace 'assets/js/common\.js', 'assets/js/common_fixed.js'
            $changed = $true
            Write-Host "  ✓ Обновлено подключение JS" -ForegroundColor Cyan
        }
        
        # 3. Ищем и заменяем статичный header на динамический контейнер
        # Если есть <header> тег, но нет header-container
        if ($content -match '<header[^>]*>' -and $content -notmatch 'id="header-container"') {
            # Удаляем старый header (ищем от <header до </header>)
            $content = $content -replace '(?s)<header[^>]*>.*?</header>', ''
            
            # Добавляем контейнер для динамического header после <body>
            if ($content -match '<body[^>]*>') {
                $content = $content -replace '(<body[^>]*>)', '$1`n    <!-- Динамический header -->`n    <div id="header-container"></div>'
                $changed = $true
                Write-Host "  ✓ Заменён статичный header на динамический" -ForegroundColor Cyan
            }
        }
        # Если уже есть portal-header, заменяем на header-container
        elseif ($content -match 'id="portal-header"') {
            $content = $content -replace 'id="portal-header"', 'id="header-container"'
            $content = $content -replace 'header\.html', 'header_simple.html'
            $changed = $true
            Write-Host "  ✓ Обновлён контейнер header" -ForegroundColor Cyan
        }
        # Если нет никакого header контейнера, добавляем
        elseif ($content -notmatch 'header-container' -and $content -notmatch 'portal-header') {
            if ($content -match '<body[^>]*>') {
                $content = $content -replace '(<body[^>]*>)', '$1`n    <!-- Динамический header -->`n    <div id="header-container"></div>'
                $changed = $true
                Write-Host "  ✓ Добавлен контейнер для динамического header" -ForegroundColor Cyan
            }
        }
        
        # 4. Ищем и заменяем статичный footer на динамический контейнер
        if ($content -match '<footer[^>]*>' -and $content -notmatch 'id="footer-container"') {
            # Удаляем старый footer
            $content = $content -replace '(?s)<footer[^>]*>.*?</footer>', ''
            $changed = $true
            Write-Host "  ✓ Удалён статичный footer" -ForegroundColor Cyan
        }
        
        # Добавляем контейнер для footer перед </body> если его нет
        if ($content -notmatch 'footer-container') {
            $content = $content -replace '</body>', '    <!-- Динамический footer -->`n    <div id="footer-container"></div>`n</body>'
            $changed = $true
            Write-Host "  ✓ Добавлен контейнер для динамического footer" -ForegroundColor Cyan
        }
        
        # 5. Удаляем старые скрипты загрузки header если есть
        if ($content -match 'fetch\([''"]header\.html[''"\)]') {
            $content = $content -replace '(?s)<script>.*?fetch\([''"]header\.html[''"\)].*?</script>', ''
            $changed = $true
            Write-Host "  ✓ Удалён старый скрипт загрузки header" -ForegroundColor Cyan
        }
        
        # Сохраняем изменения если они были
        if ($changed) {
            $content | Set-Content -Path $file.FullName -Encoding UTF8
            Write-Host "  ✅ Файл обновлён успешно" -ForegroundColor Green
        } else {
            Write-Host "  ⭕ Изменения не требуются" -ForegroundColor Gray
        }
        
        $processedFiles++
        
    } catch {
        $errorFiles += $file.FullName
        Write-Host "  ❌ Ошибка обработки: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== ОТЧЁТ О ВЫПОЛНЕНИИ ===" -ForegroundColor Magenta
Write-Host "Обработано файлов: $processedFiles" -ForegroundColor Green
Write-Host "Ошибок: $($errorFiles.Count)" -ForegroundColor $(if ($errorFiles.Count -eq 0) { "Green" } else { "Red" })

if ($errorFiles.Count -gt 0) {
    Write-Host "`nФайлы с ошибками:" -ForegroundColor Red
    foreach ($errorFile in $errorFiles) {
        Write-Host "  - $errorFile" -ForegroundColor Red
    }
}

Write-Host "`nМассовое исправление завершено!" -ForegroundColor Green
Write-Host "Теперь все страницы используют исправленные компоненты (common_fixed.css/js, header_simple.html, footer.html)" -ForegroundColor Cyan
