import React from 'react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🇹🇯 TOCO Job Portal
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Портал рынка труда Республики Таджикистан
          </p>
          <p className="text-lg text-blue-600 font-medium">
            React 18 + TypeScript + Tailwind CSS
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">✅ Технологический стек</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• React 18 + TypeScript</li>
              <li>• Vite + Tailwind CSS</li>
              <li>• React Router v6</li>
              <li>• Zustand + i18next</li>
              <li>• Framer Motion</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">✅ Функциональность</h3>
            <ul className="text-purple-600 space-y-1">
              <li>• Мультиязычность (TAJ/RUS)</li>
              <li>• Поиск вакансий</li>
              <li>• Личные кабинеты</li>
              <li>• Система курсов</li>
              <li>• Responsive дизайн</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🔍</div>
            <h4 className="font-semibold text-green-800">Поиск вакансий</h4>
            <p className="text-green-600 text-sm">Умные фильтры и поиск</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-semibold text-yellow-800">Личный кабинет</h4>
            <p className="text-yellow-600 text-sm">Профили и аналитика</p>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">📚</div>
            <h4 className="font-semibold text-pink-800">Курсы</h4>
            <p className="text-pink-600 text-sm">Обучение и развитие</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            🚀 Статус проекта
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">✅ Завершено:</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Архитектура и структура</li>
                <li>• Конфигурация инструментов</li>
                <li>• Дизайн-система</li>
                <li>• Настройка деплоя</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">🔄 В разработке:</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Основные компоненты</li>
                <li>• Страницы приложения</li>
                <li>• Mock данные</li>
                <li>• Интерактивность</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-800 font-medium">Готов к разработке</span>
          </div>
        </div>
      </div>
    </div>
  )
}
