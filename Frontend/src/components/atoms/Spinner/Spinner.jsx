import { clsx } from 'clsx';

const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

export default function Spinner({ size = 'md', className, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        role="status"
        aria-label="Loading"
        className={clsx(
          'animate-spin rounded-full border-primary-200 border-t-primary-500',
          sizes[size],
          className
        )}
      />
      {label && <p className="font-body text-sm text-ink/60">{label}</p>}
    </div>
  );
}