import React, { useState } from 'react';
import ProjectTypeSection from '../components/calculator/ProjectTypeSection';
import FeaturesSection from '../components/calculator/FeaturesSection';
import QualitySection, { QUALITY_LEVELS } from '../components/calculator/QualitySection';
import BudgetSidebar from '../components/calculator/BudgetSidebar';

export default function Calculator() {
  const [projectType, setProjectType] = useState(null);
  const [features, setFeatures] = useState([]);
  const [quality, setQuality] = useState(QUALITY_LEVELS[0]);

  const handleSelectProject = (type) => {
    setProjectType(type);
    setFeatures([]); // reset features when project changes
  };

  const handleToggleFeature = (feature) => {
    setFeatures(prev =>
      prev.some(f => f.id === feature.id)
        ? prev.filter(f => f.id !== feature.id)
        : [...prev, feature]
    );
  };

  const handleReset = () => {
    setProjectType(null);
    setFeatures([]);
    setQuality(QUALITY_LEVELS[0]);
  };

  const handleGetQuote = () => {
    const basePrice = projectType ? projectType.price : 0;
    const featuresPrice = features.reduce((sum, f) => sum + f.price, 0);
    const total = Math.round((basePrice + featuresPrice) * quality.multiplier);

    const message = [
      `Здравствуйте! Я хотел бы запросить расценки на проект.`,
      ``,
      `Тип проекта: ${projectType?.label || 'Не выбрано'}`,
      `Особенности: ${features.length > 0 ? features.map(f => f.label).join(', ') : 'Ничего'}`,
      `Качество: ${quality.label} (×${quality.multiplier})`,
      `Предполагаемый бюджет: €${total.toLocaleString()}`,
    ].join('\n');

    const phone = '358414994207';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black font-inter">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-6">
            <ProjectTypeSection selected={projectType} onSelect={handleSelectProject} />
            <FeaturesSection projectType={projectType} selected={features} onToggle={handleToggleFeature} />
            <QualitySection selected={quality} onSelect={setQuality} />
          </div>
          <BudgetSidebar
            projectType={projectType}
            features={features}
            quality={quality}
            onReset={handleReset}
            onGetQuote={handleGetQuote}
          />
        </div>
      </div>
    </div>
  );
}
