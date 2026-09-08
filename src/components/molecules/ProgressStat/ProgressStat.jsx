import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import Icon from '@/components/atoms/Icon';

const themes = {
  primary: 'bg-primary-100 text-primary-600',
  secondary: 'bg-secondary-100 text-secondary-700',
  accent: 'bg-accent-100 text-accent-600',
  mint: 'bg-mint-400/20 text-mint-500',
};

export default function ProgressStat({
  icon = 'Trophy',
  value,
  label,
  theme = 'primary',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card"
    >
      <div
        className={clsx(
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
          themes[theme]
        )}
      >
        <Icon name={icon} size={26} />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-ink">{value}</p>
        <p className="font-body text-sm text-ink/60">{label}</p>
      </div>
    </motion.div>
  );
}