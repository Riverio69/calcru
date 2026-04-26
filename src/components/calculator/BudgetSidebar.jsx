import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function BudgetSidebar({ projectType, features, quality, onReset, onGetQuote }) {
  const basePrice = projectType ? projectType.price : 0;
  const featuresPrice = features.reduce((sum, f) => sum + f.price, 0);
  const subtotal = basePrice + featuresPrice;
  const total = Math.round(subtotal * quality.multiplier);
  const rangeMax = Math.round(total * 1.35);

  return (
    <div className="rounded-2xl bg-black border border-[#2a2a2a] p-6 md:p-8 h-fit sticky top-6">
      <h3 className="text-[#a3e635] font-mono text-xs tracking-[0.2em] uppercase mb-6">
        Примерный бюджет
      </h3>

      <motion.div
        key={total}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="mb-2"
      >
        <span className="text-4xl md:text-5xl font-extrabold text-[#a3e635] font-inter tracking-tight">
          €{total.toLocaleString()}
        </span>
      </motion.div>

      <p className="text-[#555] text-sm mb-6 font-mono">
        — €{rangeMax.toLocaleString()}
      </p>

      <div className="space-y-3 mb-6 border-t border-[#2a2a2a] pt-4">
        <AnimatePresence mode="popLayout">
          {projectType && (
            <motion.div
              key="project"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex justify-between text-sm"
            >
              <span className="text-[#555]">{projectType.label}</span>
              <span className="text-white font-medium">€{projectType.price.toLocaleString()}</span>
            </motion.div>
          )}
          {features.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex justify-between text-sm"
            >
              <span className="text-[#555]">{f.label}</span>
              <span className="text-white font-medium">€{f.price.toLocaleString()}</span>
            </motion.div>
          ))}
          {quality.multiplier !== 1 && (
            <motion.div
              key="quality"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex justify-between text-sm"
            >
              <span className="text-[#555]">Качество ×{quality.multiplier}</span>
              <span className="text-white font-medium">{quality.label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-[#555] mb-6">
        * Приблизительная оценка. Точная стоимость после бесплатной консультации.
      </p>

      <div className="space-y-3">
        <button
          onClick={onGetQuote}
          className="w-full bg-[#a3e635] hover:bg-[#b5ec5a] text-black font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          Получить точную смету <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="w-full bg-[#111] hover:bg-[#1a1a1a] text-[#777] font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-[#2a2a2a]"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Сбросить
        </button>
      </div>
    </div>
  );
}