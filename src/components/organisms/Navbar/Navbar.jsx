import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/atoms/Icon';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';

const links = [
  { to: '/', label: 'Home', icon: 'Home' },
  { to: '/stories', label: 'Stories', icon: 'BookOpen' },
  { to: '/progress', label: 'My Progress', icon: 'TrendingUp' },
];

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-soft">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl animate-float">📚</span>
          <span className="font-display text-2xl font-bold text-primary-600">
            StoryLand
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-4 py-2 font-body font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-ink/60 hover:bg-primary-50 hover:text-primary-500'
                }`
              }
            >
              <Icon name={link.icon} size={18} />
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* User area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-primary-50 transition-colors"
              >
                <Avatar name={user.name} src={user.avatar} size="sm" />
                <span className="font-body font-semibold text-sm text-ink">
                  {user.name?.split(' ')[0]}
                </span>
              </button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <Icon name="LogOut" size={18} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full p-2 text-primary-600 hover:bg-primary-50 md:hidden"
          aria-label="Toggle menu"
        >
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-primary-100 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 font-body font-semibold ${
                      isActive
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-ink/70 hover:bg-primary-50'
                    }`
                  }
                >
                  <Icon name={link.icon} size={20} />
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-primary-100 pt-3">
                {user ? (
                  <Button variant="outline" fullWidth onClick={onLogout}>
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" fullWidth onClick={() => navigate('/login')}>
                      Log In
                    </Button>
                    <Button fullWidth onClick={() => navigate('/register')}>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}