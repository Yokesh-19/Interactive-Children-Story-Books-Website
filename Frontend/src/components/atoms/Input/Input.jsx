import { forwardRef } from 'react';
import { clsx } from 'clsx';

/**
 * forwardRef so it plugs straight into react-hook-form's register().
 */
const Input = forwardRef(function Input(
  { label, error, leftIcon, type = 'text', className, id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block font-body font-semibold text-sm text-ink/70"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={clsx(
            'w-full rounded-2xl border-2 bg-white px-4 py-3 font-body text-ink placeholder:text-ink/40',
            'focus:outline-none focus:ring-4 transition-all duration-150',
            leftIcon && 'pl-11',
            error
              ? 'border-accent-400 focus:ring-accent-100'
              : 'border-primary-100 focus:border-primary-400 focus:ring-primary-100',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 font-body text-sm text-accent-500">{error}</p>
      )}
    </div>
  );
});

export default Input;