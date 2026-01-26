import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants';
import Icon from './Icon';

interface CategoryNavProps {
  activeCategoryId: string | null;
  onNavigate: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategoryId, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Combine static and dynamic items
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'pillars', label: 'Pillars', icon: 'Layers' },
    ...CATEGORIES.map(c => ({
      id: c.id,
      label: c.name.en,
      icon: getCategoryIconName(c.id)
    }))
  ];

  useEffect(() => {
    // Determine active index
    const index = navItems.findIndex(item => item.id === activeCategoryId);
    setActiveIndex(index >= 0 ? index : 0);
  }, [activeCategoryId]);

  const handleClick = (categoryId: string) => {
    onNavigate(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`
      fixed z-50 transition-all duration-500
      /* Mobile: Bottom center, Horizontal, scaled down */
      bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px]
      /* Desktop: Right side, Vertical, auto width */
      md:bottom-auto md:left-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:w-auto md:max-w-none
    `}>
      <div 
        className={`
          backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.15)] relative
          /* Mobile shape */
          rounded-2xl p-2 flex overflow-x-auto no-scrollbar items-center gap-1
          /* Desktop shape */
          md:flex-col md:rounded-3xl md:p-3 md:overflow-visible md:gap-3 md:justify-start
        `}
        style={{ 
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        {/* Animated gradient glow follower - Desktop Only for simplicity & clean alignment */}
        {activeIndex >= 0 && (
          <div
            className="absolute transition-all duration-500 ease-out pointer-events-none rounded-xl md:rounded-2xl hidden md:block"
            style={{
              background: 'linear-gradient(135deg, rgba(36, 57, 132, 0.4) 0%, rgba(232, 47, 137, 0.4) 100%)',
              boxShadow: '0 0 20px rgba(232, 47, 137, 0.5), 0 0 40px rgba(36, 57, 132, 0.3)',
              filter: 'blur(8px)',
              left: '12px',
              top: `${12 + activeIndex * 60}px`, // 12px padding + index * (48px height + 12px gap)
              width: '48px',
              height: '48px',
              transform: 'scale(1.3)',
            }}
          />
        )}

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                group relative transition-all duration-300
                flex items-center justify-center overflow-hidden shrink-0
                /* Mobile Size */
                w-10 h-10 rounded-xl
                /* Desktop Size */
                md:w-12 md:h-12 md:rounded-2xl
                ${isActive 
                  ? 'bg-gradient-to-br from-[#243984] to-[#E82F89] shadow-lg md:scale-110' 
                  : 'bg-white/5 hover:bg-white/10 md:hover:scale-105'
                }
              `}
              aria-label={item.label}
            >
              {/* Glow effect on hover/active */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-[#243984] to-[#E82F89] opacity-0 
                group-hover:opacity-20 transition-opacity duration-300
                ${isActive ? 'opacity-100' : ''}
              `} />
              
              {/* Icon */}
              <div className={`relative z-10 transition-transform duration-300 ${
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
              }`}>
                <Icon name={item.icon} size={20} />
              </div>

              {/* Tooltip (Desktop Only) */}
              <div className={`
                hidden md:block
                absolute right-full mr-4 px-4 py-2 rounded-xl
                bg-slate-900 text-white text-sm font-semibold whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none shadow-xl
                z-50
              `}>
                {item.label}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900" />
                </div>
              </div>

              {/* Active indicator dot (Mobile only) */}
              {isActive && (
                <div className="md:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full bg-opacity-50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to get appropriate icon name for each category
const getCategoryIconName = (categoryId: string) => {
  const iconMap: Record<string, string> = {
    'camera-doorbell': 'Camera',
    'sensors': 'Activity',
    'climatisation': 'Thermometer',
    'lighting': 'Lightbulb',
    'curtain-shutter': 'Blinds', // Verify if Blinds exists in standard sets, usually Blinds or VenetianMask? Assuming Blinds or similar if used before.
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

  return iconMap[categoryId] || 'Box';
};

export default CategoryNav;
