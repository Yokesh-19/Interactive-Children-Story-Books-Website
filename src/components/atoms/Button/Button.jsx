import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary-500 text-white shadow-pop hover:bg-primary-600 active:translate-y-1 active:shadow-none',
  secondary: 'bg-secondary-400 text-secondary-900 shadow-[0_6px_0_0_rgba(217,130,0,0.35)] hover:bg-secondary-500 active:translate-y-1 active:shadow-none',
  accent: 'bg-accent-400 text-white shadow-[0_6px_0_0_rgba(207,0,74,0.35)] hover:bg-accent-500 active:translate-y-1 active:shadow-none',
  outline: 'bg-white text-primary-600 border-2 border-primary-300 hover:border-primary-500 hover:bg-primary-50',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  leftIcon = null,
  rightIcon = null,
  className,
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-display font-semibold transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-primary-200',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </motion.button>
  );
}