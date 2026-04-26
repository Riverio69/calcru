import React from 'react';
import { motion } from 'framer-motion';

export const PROJECT_TYPES = [
  { id: 'mobile', label: 'Мобильное приложение', price: 8000 },
  { id: 'web', label: 'Веб-сайт / лендинг', price: 2000 },
  { id: 'ecommerce', label: 'Интернет-магазин', price: 5000 },
  { id: 'platform', label: 'Онлайн-сервис / платформа', price: 8000 },
  { id: 'saas', label: 'SaaS-платформа', price: 9000 },
];

export default function ProjectTypeSection({ selected, onSelect }) {
  return (
    <div className="rounded-2xl bg-black border border-[#2a2a2a] p-6 md:p-8">
      <h3 className="text-[#a3e635] font-mono text-xs tracking-[0.2em] uppercase mb-6">
        01 — Тип проекта
      </h3>
      <div className="flex flex-wrap gap-3">
        {PROJECT_TYPES.map((type) => {
          const isActive = selected?.id === type.id;
          return (
            <motion.button
              key={type.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isActive ? null : type)}
              className={`relative px-5 py-3.5 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? 'bg-[#a3e635]/10 border-[#a3e635] text-white'
                  : 'bg-[#111] border-[#2a2a2a] hover:border-[#a3e635]/40 text-white'
              }`}
            >
              <span className="block text-sm font-medium">{type.label}</span>
              <span className={`block text-xs mt-0.5 ${isActive ? 'text-[#a3e635]' : 'text-[#555]'}`}>
                от €{type.price.toLocaleString()}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}