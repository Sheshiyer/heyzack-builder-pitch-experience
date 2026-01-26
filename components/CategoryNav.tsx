import React from 'react';
import { CATEGORIES } from '../constants';
import Icon from './Icon';

interface CategoryNavProps {
  activeCategoryId: string | null;
  onNavigate: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategoryId, onNavigate }) => {
  const handleClick = (categoryId: string) => {
    onNavigate(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div 
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-3 shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
        style={{ 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex flex-col gap-3">
          {CATEGORIES.map((category, index) => {
            const isActive = activeCategoryId === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleClick(category.id)}
                className={`
                  group relative w-12 h-12 rounded-2xl transition-all duration-300
                  flex items-center justify-center overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-br from-[#243984] to-[#E82F89] shadow-lg scale-110' 
                    : 'bg-white/5 hover:bg-white/10 hover:scale-105'
                  }
                `}
                aria-label={category.name.en}
              >
                {/* Glow effect on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-[#243984] to-[#E82F89] opacity-0 
                  group-hover:opacity-20 transition-opacity duration-300
                  ${isActive ? 'opacity-100' : ''}
                `} />
                
                {/* Category icon */}
                <div className={`relative z-10 transition-transform duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}>
                  {getCategoryIcon(category.id)}
                </div>

                {/* Tooltip */}
                <div className={`
                  absolute right-full mr-4 px-4 py-2 rounded-xl
                  bg-slate-900 text-white text-sm font-semibold whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  pointer-events-none shadow-xl
                `}>
                  {category.name.en}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900" />
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Product count indicator */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <div className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">
            Categories
          </div>
          <div className="text-lg font-bold text-white">
            {CATEGORIES.length}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate icon for each category
const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, string> = {
    'camera-doorbell': 'Camera',
    'sensors': 'Activity',
    'climatisation': 'Thermometer',
    'lighting': 'Lightbulb',
    'curtain-shutter': 'Blinds',
    'circuit-breaker': 'Zap',
    'door-lock': 'Lock',
    'control-panel': 'Monitor',
    'gateway': 'Wifi',
    'diy-breaker': 'Settings',
    'music-control': 'Music',
    'switch': 'ToggleRight',
    'accessories': 'Plug',
    'pet-accessories': 'PawPrint'
  };

  const iconName = iconMap[categoryId] || 'Box';
  return <Icon name={iconName} size={20} />;
};

export default CategoryNav;
