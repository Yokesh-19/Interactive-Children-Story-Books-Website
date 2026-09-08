import * as LucideIcons from 'lucide-react';
import { clsx } from 'clsx';

/**
 * Usage: <Icon name="Star" size={20} className="text-secondary-400" />
 * `name` is any lucide-react icon name (PascalCase).
 */
export default function Icon({ name, size = 24, className, ...props }) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      className={clsx('inline-block', className)}
      {...props}
    />
  );
}