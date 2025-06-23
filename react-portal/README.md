# TOCO - Портал рынка труда Республики Таджикистан

Современный, полностью функциональный демонстрационный портал рынка труда для Республики Таджикистан, созданный с использованием React, TypeScript и Tailwind CSS.

## 🚀 Особенности

- **Мультиязычность**: Полная поддержка таджикского и русского языков
- **Современный дизайн**: Responsive UI с использованием Tailwind CSS
- **Анимации**: Плавные переходы с Framer Motion
- **Типизация**: Полная типизация с TypeScript
- **Быстрая разработка**: Vite для молниеносной сборки
- **Управление состоянием**: Zustand для эффективного state management
- **Симуляция API**: Реалистичная имитация всех функций
- **Доступность**: Поддержка a11y стандартов

## 🛠️ Технологический стек

- **Frontend**: React 18, TypeScript
- **Стилизация**: Tailwind CSS
- **Анимации**: Framer Motion
- **Маршрутизация**: React Router v6
- **Состояние**: Zustand
- **Формы**: React Hook Form
- **Иконки**: Lucide React
- **Сборка**: Vite
- **Уведомления**: React Hot Toast
- **Интернационализация**: React i18next

## 📦 Установка

### Системные требования
- Node.js 18.0.0 или выше
- npm 8.0.0 или выше
- Git

### Быстрый старт

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/your-username/toco-job-portal.git
cd toco-job-portal/react-portal
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Запустите проект в режиме разработки:**
```bash
npm run dev
```

4. **Откройте браузер:**
   - Перейдите по адресу [http://localhost:3000](http://localhost:3000)
   - Проект автоматически перезагрузится при изменении файлов

### Альтернативные способы запуска

**Через VS Code:**
1. Откройте папку проекта в VS Code
2. Нажмите `Ctrl+Shift+P` (или `Cmd+Shift+P` на Mac)
3. Выберите "Tasks: Run Task"
4. Выберите "Start React Portal Development"

**Через терминал VS Code:**
1. Откройте терминал (`Ctrl+` или View → Terminal)
2. Выполните команды:
```bash
cd react-portal
npm install
npm run dev
```

## 🏗️ Структура проекта

\`\`\`
src/
├── components/          # Переиспользуемые компоненты
│   ├── ui/             # UI компоненты (кнопки, инпуты, карточки)
│   ├── Header.tsx      # Шапка сайта
│   ├── Footer.tsx      # Подвал сайта
│   └── Layout.tsx      # Основной макет
├── pages/              # Страницы приложения
│   └── HomePage.tsx    # Главная страница
├── hooks/              # Custom React hooks
│   └── useLocale.ts    # Хук для локализации
├── store/              # Zustand stores
│   ├── authStore.ts    # Авторизация
│   └── jobsStore.ts    # Вакансии
├── types/              # TypeScript типы
│   └── index.ts        # Основные типы
├── utils/              # Утилиты
│   └── index.ts        # Вспомогательные функции
├── locales/            # Переводы
│   ├── i18n.ts         # Конфигурация i18next
│   ├── taj.json        # Таджикский язык
│   └── rus.json        # Русский язык
└── assets/             # Статические файлы
\`\`\`

## 🌐 Мультиязычность

Проект поддерживает два языка:
- **Таджикский (TAJ)**: Основной язык
- **Русский (RUS)**: Дополнительный язык

Переключение языка происходит мгновенно через кнопку в шапке сайта. Настройки языка сохраняются в localStorage.

## 📱 Адаптивность

Сайт полностью адаптивен и работает на всех устройствах:
- **Desktop**: 1280px+
- **Laptop**: 1024px+
- **Tablet**: 768px+
- **Mobile**: 475px+

## 🎨 Дизайн-система

### Цветовая палитра
- **Primary**: Синие оттенки (#3B82F6)
- **Secondary**: Фиолетовые оттенки (#8B5CF6)
- **Success**: Зеленые оттенки (#10B981)
- **Warning**: Желтые оттенки (#F59E0B)
- **Error**: Красные оттенки (#EF4444)

### Типографика
- **Основной шрифт**: Inter
- **Заголовки**: Poppins

## 🔧 Доступные команды

```bash
npm run dev          # Запуск в режиме разработки (http://localhost:3000)
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр собранного проекта
npm run lint         # Проверка кода ESLint
npm run lint:fix     # Исправление ошибок ESLint
npm run type-check   # Проверка типов TypeScript
```

## 🛠️ Разработка

### Структура компонентов
```
src/components/
├── ui/                 # Базовые UI компоненты
│   ├── Button.tsx     # Кнопки разных типов
│   ├── Input.tsx      # Поля ввода
│   ├── Card.tsx       # Карточки
│   └── Modal.tsx      # Модальные окна
├── layout/            # Layout компоненты
│   ├── Header.tsx     # Шапка сайта
│   ├── Footer.tsx     # Подвал
│   └── Layout.tsx     # Основной layout
└── features/          # Функциональные компоненты
    ├── JobSearch/     # Поиск вакансий
    ├── Profile/       # Профили пользователей
    └── Auth/          # Авторизация
```

### Добавление новой страницы
1. Создайте компонент в `src/pages/`
2. Добавьте маршрут в `App.tsx`
3. Добавьте переводы в `locales/`
4. Обновите навигацию в `Header.tsx`

### Работа с переводами
```typescript
// Использование переводов в компонентах
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}
```

## 🐛 Troubleshooting

### Частые проблемы

**1. Не устанавливаются зависимости**
```bash
# Очистите кэш npm
npm cache clean --force
# Удалите node_modules и установите заново
rm -rf node_modules package-lock.json
npm install
```

**2. Ошибки TypeScript**
```bash
# Проверьте типы
npm run type-check
# Перезапустите TypeScript сервер в VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**3. Проблемы с Tailwind CSS**
```bash
# Перезапустите dev сервер
npm run dev
# Проверьте tailwind.config.js
```

**4. Порт уже занят**
```bash
# Используйте другой порт
npm run dev -- --port 3001
```

### Полезные расширения VS Code
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense  
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Thunder Client (для API тестирования)

## 📊 Функциональность

### ✅ Реализовано
- **Архитектура проекта**: Современная структура с TypeScript
- **Конфигурация**: Vite, Tailwind CSS, ESLint настроены
- **Мультиязычность**: Система i18next для TAJ/RUS языков
- **State Management**: Zustand stores для данных
- **Маршрутизация**: React Router v6 готов
- **UI System**: Базовые компоненты и дизайн-система
- **Mock Data**: Структуры данных для вакансий и резюме

### 🔄 В разработке
- **Главная страница**: Hero секция, поиск, статистика
- **Поиск вакансий**: Фильтры, результаты, пагинация
- **Детальные страницы**: Вакансии, резюме, компании
- **Личный кабинет**: Для соискателей и работодателей
- **Формы**: Создание резюме и вакансий
- **Аналитика**: Графики и статистика

### 📋 План развития
1. **Фаза 1**: Основные страницы и навигация
2. **Фаза 2**: Поиск и фильтрация
3. **Фаза 3**: Личные кабинеты и формы
4. **Фаза 4**: Дополнительные функции и оптимизация

## 🤝 Вклад в проект

1. Сделайте fork проекта
2. Создайте ветку для новой функции (\`git checkout -b feature/amazing-feature\`)
3. Зафиксируйте изменения (\`git commit -m 'Add amazing feature'\`)
4. Отправьте в ветку (\`git push origin feature/amazing-feature\`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Команда

- **Frontend разработка**: React, TypeScript, Tailwind CSS
- **UI/UX дизайн**: Figma, Adobe XD
- **Локализация**: Таджикский, Русский языки
- **Тестирование**: Jest, Testing Library

## 📞 Контакты

- **Email**: info@toco.tj
- **Телефон**: +992 37 224-45-67
- **Адрес**: г. Душанбе, ул. Рудаки 34

---

Сделано с ❤️ для Республики Таджикистан
