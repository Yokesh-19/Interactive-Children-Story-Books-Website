import { clsx } from 'clsx';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { STORY_CATEGORIES, AGE_GROUPS } from '@/utils/constants';

export default function Sidebar({
  selectedCategory,
  selectedAge,
  onCategoryChange,
  onAgeChange,
}) {
  return (
    <aside className="w-full shrink-0 space-y-6 md:w-64">
      {/* Categories */}
      <div className="rounded-3xl bg-white p-5 shadow-card">
        <Typography variant="h4" className="mb-3 !text-lg">
          Categories
        </Typography>
        <div className="flex flex-col gap-1">
          <FilterButton
            label="All Stories"
            icon="Sparkles"
            active={!selectedCategory}
            onClick={() => onCategoryChange?.(null)}
          />
          {STORY_CATEGORIES.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              icon="Tag"
              active={selectedCategory === cat}
              onClick={() => onCategoryChange?.(cat)}
            />
          ))}
        </div>
      </div>

      {/* Age groups */}
      <div className="rounded-3xl bg-white p-5 shadow-card">
        <Typography variant="h4" className="mb-3 !text-lg">
          Age Group
        </Typography>
        <div className="flex flex-wrap gap-2">
          <AgePill
            label="All"
            active={!selectedAge}
            onClick={() => onAgeChange?.(null)}
          />
          {AGE_GROUPS.map((age) => (
            <AgePill
              key={age}
              label={age}
              active={selectedAge === age}
              onClick={() => onAgeChange?.(age)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function FilterButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 rounded-2xl px-4 py-2.5 font-body font-semibold text-left transition-colors',
        active
          ? 'bg-primary-100 text-primary-600'
          : 'text-ink/60 hover:bg-primary-50'
      )}
    >
      <Icon name={icon} size={18} />
      {label}
    </button>
  );
}

function AgePill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-full px-4 py-2 font-body font-semibold text-sm transition-colors',
        active
          ? 'bg-secondary-400 text-secondary-900'
          : 'bg-secondary-50 text-secondary-700 hover:bg-secondary-100'
      )}
    >
      {label}
    </button>
  );
}