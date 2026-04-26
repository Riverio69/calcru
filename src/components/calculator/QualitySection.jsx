import React from 'react';
import { motion } from 'framer-motion';

export const QUALITY_LEVELS = [
  { id: 'mvp', label: 'MVP (быстро)', multiplier: 1 },
  { id: 'full', label: 'Полный продукт', multiplier: 1.4 },
  { id: 'premium', label: 'Премиум качество', multiplier: 1.8 },
];

export default function QualitySection({ selected, onSelect }) {
  return (
    <div className="rounded-2xl bg-black border border-[#2a2a2a] p-6 md:p-8">
      <h3 className="text-[#a3e635] font-mono text-xs tracking-[0.2em] uppercase mb-6">
        03 — Уровень качества
      </h3>
      <div className="flex flex-wrap gap-3">
        {QUALITY_LEVELS.map((level) => {
          const isActive = selected.id === level.id;
          return (
            <motion.button
              key={level.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(level)}
              className={`flex-1 min-w-[140px] px-5 py-4 rounded-xl text-center transition-all duration-200 border ${
                isActive
                  ? 'bg-[#a3e635]/10 border-[#a3e635]'
                  : 'bg-[#111] border-[#2a2a2a] hover:border-[#a3e635]/40'
              }`}
            >
              <span className={`block text-sm font-semibold ${isActive ? 'text-[#a3e635]' : 'text-white'}`}>
                {level.label}
              </span>
              <span className={`block text-xs mt-1 font-mono ${isActive ? 'text-[#a3e635]/70' : 'text-[#555]'}`}>
                ×{level.multiplier}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}