import { useState } from 'react';
import { clsx } from 'clsx';
import Icon from '@/components/atoms/Icon';

export default function RatingStars({
  value = 0,
  max = 5,
  size = 20,
  readOnly = true,
  onChange,
}) {
  const [hover, setHover] = useState(null);

  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const active = (hover ?? value) >= starValue;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={clsx(
              'transition-transform',
              !readOnly && 'hover:scale-125 cursor-pointer'
            )}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Icon
              name="Star"
              size={size}
              className={clsx(
                active ? 'text-secondary-400 fill-secondary-400' : 'text-ink/20'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}