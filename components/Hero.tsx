import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { Language } from '../types';
import Icon from './Icon';
import DarkVeil from './DarkVeil';

interface HeroProps {
  lang: Language;
}

// -----------------------------------------------------------------------------
// Sub-component: Smart Home Vector Network
// -----------------------------------------------------------------------------

const SmartHomeNetwork = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Device nodes configuration
  const devices = useMemo(() => [
    { id: 'hub', x: 50, y: 30, icon: 'Cpu', color: '#E82F89', label: 'CORE' },
    { id: 'cam', x: 15, y: 45, icon: 'Video', color: '#38bdf8', label: 'VISION' },
    { id: 'lock', x: 85, y: 45, icon: 'Lock', color: '#fbbf24', label: 'ENTRY' },
    { id: 'climate', x: 25, y: 75, icon: 'Thermometer', color: '#34d399', label: 'CLIMATE' },
    { id: 'light', x: 75, y: 75, icon: 'Zap', color: '#a78bfa', label: 'POWER' },
  ], []);

  // Connections between nodes
  const connections = useMemo(() => [
    { from: 'hub', to: 'cam' },
    { from: 'hub', to: 'lock' },
    { from: 'hub', to: 'climate' },
    { from: 'hub', to: 'light' },
    { from: 'cam', to: 'lock' },
    { from: 'climate', to: 'light' },
  ], []);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {/* SVG Layer for Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
        <defs>
          <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#243984" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#E82F89" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#243984" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {connections.map((conn, i) => {
          const start = devices.find(d => d.id === conn.from)!;
          const end = devices.find(d => d.id === conn.to)!;
          
          return (
            <React.Fragment key={`${conn.from}-${conn.to}`}>
              {/* Base Line */}
              <motion.line
                x1={`${start.x}%`} y1={`${start.y}%`}
                x2={`${end.x}%`} y2={`${end.y}%`}
                stroke="url(#vectorGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
              
              {/* Data Pulse Packet */}
              <motion.circle r="1.5" fill="#fff" filter="url(#glow)">
                <animateMotion 
                  dur={`${3 + i}s`} 
                  repeatCount="indefinite"
                  path={`M ${start.x * 10},${start.y * 10} L ${end.x * 10},${end.y * 10}`} 
                  // Note: simple SVG path approx for coordinate system percentages is tricky in pure SVG animateMotion 
                  // without viewBox transform.
                  // Switching to CSS animation on strokeDashoffset for reliable "flow" effect.
                />
              </motion.circle>
              {/* Alternative: Dashed Flow Line */}
              <motion.line
                x1={`${start.x}%`} y1={`${start.y}%`}
                x2={`${end.x}%`} y2={`${end.y}%`}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 120"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -124 }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "linear" }}
                className="opacity-60"
              />
            </React.Fragment>
          );
        })}
      </svg>

      {/* Device Nodes */}
      {devices.map((device, i) => (
        <motion.div
          key={device.id}
          className="absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center"
          style={{ 
            left: `${device.x}%`, 
            top: `${device.y}%`,
            x: useTransform(mouseX, [-1, 1], [-20 * (i % 2 ? 1 : -1), 20 * (i % 2 ? 1 : -1)]),
            y: useTransform(mouseY, [-1, 1], [-20 * (i % 2 ? -1 : 1), 20 * (i % 2 ? -1 : 1)]),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.5 + i * 0.1, 
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Node Visuals */}
          <div className="relative group cursor-default">
            {/* Ping Animation */}
            <div className={`absolute inset-0 rounded-full bg-[${device.color}] opacity-20 animate-ping`} />
            
            {/* Glass Core */}
            <div className="relative w-12 h-12 rounded-full bg-slate-900/40 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
              <Icon name={device.icon} size={20} color={device.color} />
            </div>

            {/* Label */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-slate-900/90 text-[10px] font-bold text-white px-2 py-1 rounded border border-white/10 tracking-widest uppercase whitespace-nowrap">
                {device.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Mouse parallax interaction
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll Parallax
  const contentY = useTransform(scrollY, [0, 1000], [0, 150]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Cinematic Entry Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.15, delayChildren: 0.2}
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950 perspective-1000">
      {/* 1. Deep Background with Veil */}
      <div className="absolute inset-0 z-0 opacity-60">
        <DarkVeil />
      </div>
      
      {/* 2. Gradient Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/40 to-slate-950 pointer-events-none z-0" />
      
      {/* 3. Smart Home Vector Network (Replaces Orbs) */}
      <SmartHomeNetwork mouseX={mouseX} mouseY={mouseY} />

      {/* 4. Main Content Layer */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ y: shouldReduceMotion ? 0 : contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge - Tech Pill Style */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E82F89] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E82F89]"></span>
            </span>
            <span className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.25em]">Next Generation Automation</span>
          </div>
        </motion.div>

        {/* Headline - "Billboard" Typography */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-[7rem] font-[800] text-white leading-[0.9] mb-8 tracking-tighter"
          variants={itemVariants}
        >
          {lang === 'en' ? (
            <>
              The Smart Building Platform <br/>
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-gradient-to-r from-[#243984] via-[#E82F89] to-[#243984] blur-2xl opacity-30 animate-pulse" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-gradient">
                  That Pays For Itself
                </span>
              </span>
            </>
          ) : (
            <>
              La plateforme intelligente <br/>
              <span className="relative inline-block mt-2">
                 <span className="absolute inset-0 bg-gradient-to-r from-[#243984] via-[#E82F89] to-[#243984] blur-2xl opacity-30 animate-pulse" />
                 <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-[length:200%_auto] animate-gradient">
                   qui s'autofinance
                 </span>
              </span>
            </>
          )}
        </motion.h1>

        {/* Subheadline - Clean Sans */}
        <motion.p
          className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-normal leading-relaxed tracking-wide"
          variants={itemVariants}
        >
          {lang === 'en'
            ? '128 devices. 14 categories. One seamless AI ecosystem for residential builders.'
            : '128 appareils. 14 catégories. Un écosystème IA fluide pour les promoteurs.'}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            className="group relative px-8 py-4 bg-[#E82F89] text-white rounded-xl font-bold text-lg overflow-hidden shadow-[0_0_40px_-10px_rgba(232,47,137,0.5)] hover:shadow-[0_0_60px_-15px_rgba(232,47,137,0.7)] transition-shadow duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">{lang === 'en' ? 'Explore catalog' : 'Explorer le catalogue'}</span>
          </motion.button>
          
          <motion.button
            className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{lang === 'en' ? 'Book a demo' : 'Réserver une démo'}</span>
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
        style={{ opacity: shouldReduceMotion ? 1 : scrollIndicatorOpacity }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">
          {lang === 'en' ? 'SCROLL' : 'DÉFILER'}
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
};

export default Hero;
