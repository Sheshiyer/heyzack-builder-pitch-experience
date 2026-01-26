import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { Check } from 'lucide-react';

type LockSequenceConfig = {
  steps: Array<{
    stage: string;
    duration: number;
    icon: string;
    label: string;
  }>;
  loopDelay: number;
  showProgress: boolean;
};

interface Props {
  config: LockSequenceConfig;
  language?: 'en' | 'fr';
}

type StepStatus = 'pending' | 'active' | 'complete';

export default function LockSequenceAnimation({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    config.steps.map(() => 'pending')
  );
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    const runSequence = () => {
      // Reset
      setStepStatuses(config.steps.map(() => 'pending'));
      setCurrentStep(-1);

      let cumulativeDelay = 0;

      config.steps.forEach((step, index) => {
        // Set to active
        const activeTimeout = setTimeout(() => {
          setCurrentStep(index);
          setStepStatuses(prev => {
            const newStatuses = [...prev];
            newStatuses[index] = 'active';
            return newStatuses;
          });
        }, cumulativeDelay);
        timeouts.push(activeTimeout);

        // Set to complete
        const completeTimeout = setTimeout(() => {
          setStepStatuses(prev => {
            const newStatuses = [...prev];
            newStatuses[index] = 'complete';
            return newStatuses;
          });
        }, cumulativeDelay + step.duration);
        timeouts.push(completeTimeout);

        cumulativeDelay += step.duration;
      });

      // Loop
      const loopTimeout = setTimeout(() => {
        runSequence();
      }, cumulativeDelay + config.loopDelay);
      timeouts.push(loopTimeout);
    };

    if (!prefersReducedMotion) {
      runSequence();
    } else {
      // Show completed state for reduced motion
      setStepStatuses(config.steps.map(() => 'complete'));
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [config.steps, config.loopDelay, prefersReducedMotion]);

  const getStepColor = (status: StepStatus) => {
    switch (status) {
      case 'pending':
        return '#6B7280';
      case 'active':
        return '#3B82F6';
      case 'complete':
        return '#10B981';
    }
  };

  return (
    <div
      className="w-full max-w-md space-y-6"
      role="status"
      aria-label="Lock sequence animation"
    >
      {/* Encrypted badge */}
      <motion.div
        className="flex items-center justify-end gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 w-fit ml-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Icons.ShieldCheck size={14} className="text-green-400" />
        <span className="text-xs font-semibold text-green-400">
          {language === 'en' ? 'ENCRYPTED' : 'CHIFFRÉ'}
        </span>
      </motion.div>

      {/* Steps */}
      <div className="relative flex items-center justify-between px-8">
        {/* Connection lines */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-700 -translate-y-1/2" />

        {config.steps.map((step, index) => {
          const status = stepStatuses[index];
          const Icon = (Icons as any)[step.icon] || Icons.Circle;
          const color = getStepColor(status);
          const isComplete = status === 'complete';
          const isActive = status === 'active';

          return (
            <div key={step.stage} className="relative flex flex-col items-center gap-3 z-10">
              {/* Circle */}
              <motion.div
                className="relative flex items-center justify-center w-16 h-16 rounded-full border-4"
                style={{
                  backgroundColor: `${color}20`,
                  borderColor: color,
                }}
                animate={
                  isActive && !prefersReducedMotion
                    ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          `0 0 0 0 ${color}00`,
                          `0 0 0 8px ${color}40`,
                          `0 0 0 0 ${color}00`,
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1,
                  repeat: isActive ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <Check size={28} style={{ color }} />
                  </motion.div>
                ) : (
                  <Icon size={28} style={{ color }} />
                )}
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-xs font-medium text-center whitespace-nowrap"
                style={{ color: status === 'pending' ? '#6B7280' : color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.label}
              </motion.div>
            </div>
          );
        })}

        {/* Animated connecting lines */}
        {config.steps.slice(0, -1).map((_, index) => {
          const isConnected = stepStatuses[index + 1] !== 'pending';

          return (
            <motion.div
              key={`line-${index}`}
              className="absolute top-1/2 h-0.5 -translate-y-1/2"
              style={{
                left: `${(index + 1) * (100 / config.steps.length)}%`,
                width: `${100 / config.steps.length}%`,
                backgroundColor: getStepColor(stepStatuses[index + 1]),
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isConnected ? 1 : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>

      {/* Progress indicator */}
      {config.showProgress && (
        <motion.div
          className="h-1.5 bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            animate={{
              width: `${((currentStep + 1) / config.steps.length) * 100}%`,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
