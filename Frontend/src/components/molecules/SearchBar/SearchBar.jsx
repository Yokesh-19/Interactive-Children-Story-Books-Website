import { useState } from 'react';
import Icon from '@/components/atoms/Icon';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for stories...',
}) {
  const [internal, setInternal] = useState('');
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const handleChange = (e) => {
    const v = e.target.value;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(current);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
        <Icon name="Search" size={20} />
      </span>
      <input
        type="text"
        value={current}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-full border-2 border-primary-100 bg-white py-3 pl-12 pr-28 font-body text-ink placeholder:text-ink/40 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary-500 px-5 py-2 font-display font-semibold text-sm text-white hover:bg-primary-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
}