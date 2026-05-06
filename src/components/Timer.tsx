import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const Timer = () => {
  const { timeLeft, timerActive, tick } = useGameStore();

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timerActive, tick]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 60;
  const isCritical = timeLeft <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg transition-colors ${
        isCritical
          ? 'bg-red-500/20 text-red-300 border border-red-500/50 animate-pulse'
          : isWarning
          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
          : 'bg-slate-700/50 text-white border border-slate-600'
      }`}
    >
      <span>⏱</span>
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
