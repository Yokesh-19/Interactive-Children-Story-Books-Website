import { clsx } from 'clsx';

const styles = {
  h1: 'font-display font-bold text-4xl md:text-5xl text-ink leading-tight',
  h2: 'font-display font-bold text-3xl md:text-4xl text-ink leading-tight',
  h3: 'font-display font-semibold text-2xl md:text-3xl text-ink',
  h4: 'font-display font-semibold text-xl md:text-2xl text-ink',
  body: 'font-body text-base text-ink/80 leading-relaxed',
  small: 'font-body text-sm text-ink/60',
  caption: 'font-body text-xs uppercase tracking-wide text-ink/50',
};

const tagMap = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4',
  body: 'p', small: 'p', caption: 'span',
};

export default function Typography({
  variant = 'body',
  as,
  children,
  className,
  ...props
}) {
  const Tag = as || tagMap[variant] || 'p';
  return (
    <Tag className={clsx(styles[variant], className)} {...props}>
      {children}
    </Tag>
  );
}