import React from 'react';
import { motion } from 'framer-motion';

export const FEATURES_BY_PROJECT = {
  mobile: [
    { id: 'auth', label: 'Авторизация / аккаунты', price: 1500 },
    { id: 'social_login', label: 'Соц. вход (Google, Apple)', price: 1000 },
    { id: 'payment', label: 'Платёжная интеграция', price: 2500 },
    { id: 'push', label: 'Push-уведомления', price: 1500 },
    { id: 'chat', label: 'Чат / мессенджер', price: 3000 },
    { id: 'geo', label: 'Геолокация / карты', price: 1800 },
    { id: 'offline', label: 'Офлайн режим', price: 3000 },
    { id: 'admin', label: 'Админ-панель', price: 4000 },
    { id: 'api', label: 'API интеграции', price: 1000 },
    { id: 'publish', label: 'Публикация в сторы', price: 800 },
  ],
  web: [
    { id: 'pages', label: 'Доп. страницы', price: 200 },
    { id: 'animations', label: 'Анимации / интерактив', price: 1000 },
    { id: 'multilang', label: 'Мультиязычность', price: 2000 },
    { id: 'seo', label: 'SEO оптимизация', price: 1500 },
    { id: 'crm', label: 'Интеграция с CRM', price: 1500 },
    { id: 'forms', label: 'Формы / квизы', price: 1000 },
  ],
  ecommerce: [
    { id: 'payment', label: 'Платёжная система', price: 2500 },
    { id: 'delivery', label: 'Доставка / логистика', price: 2000 },
    { id: 'cabinet', label: 'Личный кабинет', price: 2500 },
    { id: 'filters', label: 'Фильтры и поиск', price: 2000 },
    { id: 'erp', label: 'Интеграция с ERP / складом', price: 3500 },
    { id: 'multilang', label: 'Мультиязычность / валюта', price: 2000 },
    { id: 'subscriptions', label: 'Подписки (recurring)', price: 3000 },
    { id: 'reviews', label: 'Отзывы / рейтинги', price: 1000 },
    { id: 'recommendations', label: 'Рекомендации товаров', price: 2000 },
  ],
  platform: [
    { id: 'roles', label: 'Регистрация + роли пользователей', price: 3000 },
    { id: 'payments', label: 'Платежи между пользователями', price: 4000 },
    { id: 'commission', label: 'Комиссия платформы', price: 1500 },
    { id: 'chat', label: 'Чат / коммуникация', price: 3000 },
    { id: 'reviews', label: 'Отзывы и рейтинги', price: 1500 },
    { id: 'search', label: 'Поиск и фильтры', price: 2500 },
    { id: 'admin', label: 'Админ-панель', price: 5000 },
    { id: 'moderation', label: 'Модерация контента', price: 2500 },
    { id: 'notifications', label: 'Уведомления (email / push)', price: 2500 },
  ],
  saas: [
    { id: 'subscriptions', label: 'Подписочная система', price: 3000 },
    { id: 'plans', label: 'Тарифные планы', price: 1500 },
    { id: 'teams', label: 'Командные аккаунты', price: 3000 },
    { id: 'api', label: 'API для клиентов', price: 5000 },
    { id: 'integrations', label: 'Интеграции (CRM, Slack и тд)', price: 1500 },
    { id: 'dashboards', label: 'Дашборды / аналитика', price: 4000 },
    { id: 'security', label: 'Безопасность (2FA, роли)', price: 4000 },
    { id: 'architecture', label: 'Масштабируемая архитектура', price: 5000 },
    { id: 'monitoring', label: 'Мониторинг / логи', price: 1500 },
  ],
};

export default function FeaturesSection({ projectType, selected, onToggle }) {
  const features = projectType ? FEATURES_BY_PROJECT[projectType.id] || [] : [];

  if (!projectType) {
    return (
      <div className="rounded-2xl bg-black border border-[#2a2a2a] p-6 md:p-8">
        <h3 className="text-[#a3e635] font-mono text-xs tracking-[0.2em] uppercase mb-4">
          02 — Дополнения
        </h3>
        <p className="text-[#555] text-sm">Выберите тип проекта, чтобы увидеть доступные дополнения.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-black border border-[#2a2a2a] p-6 md:p-8">
      <h3 className="text-[#a3e635] font-mono text-xs tracking-[0.2em] uppercase mb-6">
        02 — Дополнения
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature) => {
          const isActive = selected.some(f => f.id === feature.id);
          return (
            <motion.button
              key={feature.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onToggle(feature)}
              className={`flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-200 border text-left ${
                isActive
                  ? 'bg-[#a3e635]/10 border-[#a3e635]'
                  : 'bg-[#111] border-[#2a2a2a] hover:border-[#a3e635]/40'
              }`}
            >
              <span className="text-sm font-medium text-white">{feature.label}</span>
              <span className={`text-xs font-mono ml-3 shrink-0 ${isActive ? 'text-[#a3e635]' : 'text-[#555]'}`}>
                +€{feature.price.toLocaleString()}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}