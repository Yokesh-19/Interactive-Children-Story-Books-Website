import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const colors = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-400',
  accent: 'bg-accent-400',
  mint: 'bg-mint-500',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  showLabel = false,
  size = 'md',
  className,
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const heights = { sm: 'h-2', md: 'h-3', lg: 'h-5' };

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full overflow-hidden rounded-full bg-primary-100',
          heights[size]
        )}
      >
        <motion.div
          className={clsx('h-full rounded-full', colors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-right font-body text-xs font-semibold text-ink/60">
          {Math.round(percent)}%
        </p>
      )}
    </div>
  );
}