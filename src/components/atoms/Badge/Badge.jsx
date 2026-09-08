import { clsx } from 'clsx';

const variants = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-800',
  accent: 'bg-accent-100 text-accent-700',
  mint: 'bg-mint-400/20 text-mint-500',
  neutral: 'bg-ink/10 text-ink/70',
};

export default function Badge({
  children,
  variant = 'primary',
  icon = null,
  className,
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 font-body font-semibold text-xs',
        variants[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}