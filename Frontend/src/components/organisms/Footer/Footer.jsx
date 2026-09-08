import { Link } from 'react-router-dom';
import Icon from '@/components/atoms/Icon';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'All Stories', to: '/stories' },
      { label: 'My Progress', to: '/progress' },
      { label: 'Categories', to: '/stories' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Profile', to: '/profile' },
      { label: 'Log In', to: '/login' },
      { label: 'Sign Up', to: '/register' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">📚</span>
              <span className="font-display text-2xl font-bold text-primary-600">
                StoryLand
              </span>
            </Link>
            <p className="mt-3 max-w-sm font-body text-ink/60">
              Magical interactive stories, quizzes, and adventures that make
              reading a joy for every child.
            </p>
            <div className="mt-4 flex gap-3">
              {['Facebook', 'Instagram', 'Youtube', 'Twitter'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-500 hover:bg-primary-200 transition-colors"
                  aria-label={s}
                >
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-ink">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-ink/60 hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-primary-100 pt-6 text-center font-body text-sm text-ink/50">
          © {new Date().getFullYear()} StoryLand. Made with{' '}
          <Icon name="Heart" size={14} className="inline text-accent-400 fill-accent-400" />{' '}
          for little readers.
        </div>
      </div>
    </footer>
  );
}
