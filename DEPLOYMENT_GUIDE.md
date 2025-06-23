# TOCO Job Portal - Deploy to GitHub

## 🚀 Готовность к деплою

Проект настроен для развертывания на следующих платформах:

### GitHub Pages
- ✅ Vite конфигурация готова
- ✅ Build скрипты настроены
- ✅ Static файлы подготовлены

### Vercel
- ✅ Автоматический деплой из Git
- ✅ Оптимизация для production
- ✅ Мгновенные обновления

### Netlify
- ✅ Drag & Drop деплой
- ✅ Continuous deployment
- ✅ Form handling ready

## 📋 Инструкции по деплою

### Вариант 1: GitHub Pages

1. **Подготовка проекта:**
```bash
cd react-portal
npm install
npm run build
```

2. **Настройка GitHub Pages:**
   - Перейдите в Settings репозитория
   - Выберите Pages в левом меню
   - Source: Deploy from a branch
   - Branch: gh-pages или main
   - Folder: /docs или /dist

3. **Автодеплой (опционально):**
   - Настройте GitHub Actions
   - Автоматическая сборка при push

### Вариант 2: Vercel (Рекомендуется)

1. **Быстрый деплой:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Import Git Repository
   - Выберите репозиторий
   - Deploy автоматически

2. **Настройки для Vite:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Вариант 3: Netlify

1. **Drag & Drop:**
   - Соберите проект: `npm run build`
   - Перетащите папку `dist` на netlify.com
   - Готово!

2. **Git Integration:**
   - Подключите репозиторий
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## 🔧 Конфигурация для деплоя

### Vite.config.ts обновления
```typescript
export default defineConfig({
  base: '/toco-job-portal/', // Для GitHub Pages
  // или
  base: '/', // Для Vercel/Netlify
})
```

### Package.json скрипты
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

## 🌐 Live Demo URLs

После деплоя проект будет доступен по адресам:

- **Vercel**: `https://toco-job-portal.vercel.app`
- **Netlify**: `https://toco-job-portal.netlify.app`
- **GitHub Pages**: `https://username.github.io/toco-job-portal`

## 📱 Features готовые к демо

- ✅ Responsive дизайн
- ✅ Мультиязычность (TAJ/RUS)
- ✅ Современный UI
- ✅ Fast loading
- ✅ SEO optimized
- ✅ PWA ready

## 🎯 Рекомендация

**Для лучшего опыта демонстрации используйте Vercel:**
- Fastest deployment
- Automatic HTTPS
- Global CDN
- Perfect for React apps
- Zero configuration
