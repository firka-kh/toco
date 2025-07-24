# Как использовать заголовок на страницах сайта

Для использования общего заголовка на всех страницах сайта, следуйте инструкциям ниже:

## 1. Включение заголовка на страницах

Для включения общего заголовка на страницах сайта используйте один из следующих методов:

### Вариант 1: Использование JavaScript

Добавьте следующий код в начало тега `<body>` каждой страницы:

```html
<div id="header-container"></div>

<script>
    // Загрузка общего заголовка
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            // Извлекаем только содержимое body из header.html
            const parser = new DOMParser();
            const headerDoc = parser.parseFromString(data, 'text/html');
            const headerContent = headerDoc.querySelector('body').innerHTML;
            
            // Вставляем заголовок в контейнер
            document.getElementById('header-container').innerHTML = headerContent;
            
            // Выполняем скрипты из заголовка (если есть)
            const scripts = headerDoc.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });
        })
        .catch(error => console.error('Ошибка загрузки заголовка:', error));
</script>
```

### Вариант 2: Серверное включение

Если ваш сайт работает на сервере с поддержкой серверных включений (например, PHP):

В PHP-страницах:
```php
<?php include('header.html'); ?>
<!-- Остальное содержимое страницы -->
```

В ASP.NET:
```aspx
<!-- #include file="header.html" -->
<!-- Остальное содержимое страницы -->
```

## 2. Обновление заголовка

При необходимости внести изменения в меню или другие элементы заголовка:

1. Откройте файл `header.html`
2. Внесите необходимые изменения
3. Сохраните файл

Изменения автоматически применятся ко всем страницам, использующим этот заголовок.

## 3. Примечания

- Убедитесь, что пути к CSS и JavaScript файлам в `header.html` указаны корректно
- Для страниц в подпапках может потребоваться скорректировать путь к header.html в коде включения
- При использовании JavaScript-метода убедитесь, что контейнер `header-container` размещен в начале страницы

## 4. Пример корректного использования

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Название страницы</title>
    <!-- Подключение стилей страницы -->
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <!-- Контейнер для заголовка -->
    <div id="header-container"></div>
    
    <!-- Скрипт для загрузки заголовка -->
    <script>
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const headerDoc = parser.parseFromString(data, 'text/html');
                const headerContent = headerDoc.querySelector('body').innerHTML;
                document.getElementById('header-container').innerHTML = headerContent;
            });
    </script>
    
    <!-- Содержимое страницы -->
    <main>
        <h1>Содержимое страницы</h1>
        <!-- ... -->
    </main>
    
    <!-- Подвал и другие элементы страницы -->
</body>
</html>
```
