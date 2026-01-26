import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Check } from 'lucide-react';

// Types
type StepStatus = 'pending' | 'active' | 'complete' | 'error';

interface LockSequenceStep {
  stage: string;
  label: string;
  duration: number;
  icon: keyof typeof Icons;
}

interface LockSequenceConfig {
  steps: LockSequenceStep[];
  showProgress: boolean;
  autoPlay: boolean;
  loopDelay: number;
}

interface LockSequenceAnimationProps {
  config?: LockSequenceConfig;
  language?: 'en' | 'fr';
  onComplete?: () => void;
}

const DEFAULT_CONFIG: LockSequenceConfig = {
  steps: [
    { stage: 'detect', label: 'Detect', duration: 1500, icon: 'Wifi' },
    { stage: 'verify', label: 'Verify', duration: 2000, icon: 'ShieldCheck' },
    { stage: 'unlock', label: 'Unlock', duration: 1000, icon: 'LockOpen' },
  ],
  showProgress: true,
  autoPlay: true,
  loopDelay: 3000,
};

export default function LockSequenceAnimation({
  config = DEFAULT_CONFIG,
  language = 'en',
  onComplete,
}: LockSequenceAnimationProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    new Array(config.steps.length).fill('pending')
  );
  
  const prefersReducedMotion = useReducedMotion();

  // Spring physics for progress
  const progressSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  const getStepColor = (status: StepStatus) => {
    switch (status) {
      case 'active':
        return '#3B82F6'; // blue-500
      case 'complete':
        return '#10B981'; // green-500
      case 'error':
        return '#EF4444'; // red-500
      default:
        return '#4B5563'; // gray-600
    }
  };

  useEffect(() => {
    if (!config.autoPlay) return;

    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const runSequence = async () => {
      // Reset
      setCurrentStep(-1);
      setStepStatuses(new Array(config.steps.length).fill('pending'));
      progressSpring.set(0); 

      // Wait a bit before starting
      await new Promise(r => setTimeout(r, 500));
      if (!mounted) return;

      // Iterate through steps
      for (let i = 0; i < config.steps.length; i++) {
        setCurrentStep(i);
        
        // Update statuses
        setStepStatuses(prev => {
          const next = [...prev];
          next[i] = 'active';
          if (i > 0) next[i - 1] = 'complete';
          return next;
        });

        // Animate progress to this step
        progressSpring.set(((i + 0.5) / config.steps.length) * 100);

        // Simulate step duration
        await new Promise(r => setTimeout(r, config.steps[i].duration));
        if (!mounted) return;
      }

      // Final completion state
      setStepStatuses(prev => prev.map(() => 'complete'));
      progressSpring.set(100);
      
      if (onComplete) onComplete();

      // Loop
      timeoutId = setTimeout(runSequence, config.loopDelay);
    };

    runSequence();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [config, progressSpring, onComplete]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6 w-full max-w-md space-y-8 select-none shadow-2xl">
      {/* Header with Encrypted Status */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          {language === 'en' ? 'Security Protocol' : 'Protocole de Sécurité'}
        </h3>
        
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Icons.ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 tracking-wide">
            {language === 'en' ? 'ENCRYPTED' : 'CHIFFRÉ'}
          </span>
        </motion.div>
      </div>

      {/* Steps Visualization */}
      <div className="relative flex items-center justify-between px-4 py-2">
         {/* Background Line */}
        <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-slate-800 -translate-y-1/2 rounded-full" />
        
        {/* Active Progress Line */}
        <div className="absolute left-6 right-6 top-1/2 h-0.5 -translate-y-1/2 pointer-events-none">
             <motion.div 
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] rounded-full"
                style={{ width: useTransform(progressSpring, value => `${value}%`) }}
             />
        </div>

        {config.steps.map((step, index) => {
          const status = stepStatuses[index];
          const Icon = (Icons as any)[step.icon] || Icons.Circle;
          const isActive = status === 'active';
          const isComplete = status === 'complete';
          const isPending = status === 'pending';
          
          return (
            <div key={step.stage} className="relative z-10 flex flex-col items-center gap-4">
              {/* Step Circle */}
              <motion.div
                className={`
                  relative flex items-center justify-center w-14 h-14 rounded-full border-2 
                  backdrop-blur-sm transition-colors duration-500
                  ${isActive ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 
                    isComplete ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                    'bg-slate-900 border-slate-700'}
                `}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              >
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Check size={24} className="text-emerald-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                             <Icon 
                                size={24} 
                                className={`transition-colors duration-300 ${
                                    isActive ? 'text-blue-400' : 'text-slate-500'
                                }`} 
                             />
                        </motion.div>
                    )}
                  </AnimatePresence>
              </motion.div>

              {/* Label */}
              <div className="text-center">
                  <div className={`text-xs font-semibold tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-blue-400' : 
                      isComplete ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    {step.label}
                  </div>
                  {isActive && (
                      <motion.div 
                        layoutId="active-dot"
                        className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"
                      />
                  )}
              </div>
            </div>
          );
        })}
      </div>

       {/* System Status Text */}
      <div className="bg-slate-950/30 rounded-lg p-3 border border-white/5 text-center">
        <AnimatePresence mode="wait">
             <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-slate-400 font-mono"
             >
                {currentStep === -1 ? 'Ready for initiation...' : 
                 currentStep >= config.steps.length ? 'Sequence complete.' :
                 `Executing phase ${currentStep + 1}/${config.steps.length}: ${config.steps[currentStep].label}...`}
             </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
