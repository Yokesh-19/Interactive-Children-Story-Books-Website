import { clsx } from 'clsx';

const sizes = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-3xl',
};

// Deterministic fun color based on name
const bgColors = [
  'bg-primary-300', 'bg-secondary-300', 'bg-accent-300', 'bg-mint-400',
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({ src, name = 'User', size = 'md', className }) {
  const colorIndex = name.charCodeAt(0) % bgColors.length;

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-display font-bold text-white overflow-hidden ring-2 ring-white shadow-soft',
        sizes[size],
        !src && bgColors[colorIndex],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}