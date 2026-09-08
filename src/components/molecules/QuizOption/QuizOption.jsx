import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import Icon from '@/components/atoms/Icon';

/**
 * States: default | selected | correct | incorrect | disabled
 * The parent (QuizPanel) decides the state after an answer is checked.
 */
export default function QuizOption({
  label,
  optionKey,
  state = 'default',
  onSelect,
  disabled = false,
}) {
  const styleByState = {
    default: 'bg-white border-primary-100 hover:border-primary-400 text-ink',
    selected: 'bg-primary-50 border-primary-500 text-primary-700',
    correct: 'bg-mint-400/15 border-mint-500 text-mint-500',
    incorrect: 'bg-accent-100 border-accent-400 text-accent-600',
  };

  const iconByState = {
    correct: 'CheckCircle2',
    incorrect: 'XCircle',
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(optionKey)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(
        'flex w-full items-center gap-3 rounded-2xl border-2 p-4 font-body font-semibold text-left transition-colors',
        styleByState[state],
        disabled && state === 'default' && 'opacity-60 cursor-not-allowed'
      )}
    >
      <span
        className={clsx(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display font-bold',
          state === 'default' || state === 'selected'
            ? 'bg-primary-100 text-primary-600'
            : 'bg-white/60'
        )}
      >
        {optionKey?.toUpperCase()}
      </span>
      <span className="flex-1">{label}</span>
      {iconByState[state] && (
        <Icon name={iconByState[state]} size={22} />
      )}
    </motion.button>
  );
}