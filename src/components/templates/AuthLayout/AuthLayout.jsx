import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Typography from '@/components/atoms/Typography';

/**
 * Split-screen auth layout.
 * Left: friendly illustration panel (hidden on mobile).
 * Right: the form (children / <Outlet />).
 */
export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-cloud">
      {/* Decorative panel */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-12 lg:flex">
        {/* Floating decorations */}
        <div className="absolute left-10 top-16 text-6xl opacity-80 animate-float">⭐</div>
        <div className="absolute bottom-24 right-16 text-5xl opacity-70 animate-float" style={{ animationDelay: '0.5s' }}>🌙</div>
        <div className="absolute right-24 top-24 text-4xl opacity-60 animate-float" style={{ animationDelay: '1s' }}>🎈</div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="relative z-10 text-center"
        >
          <div className="mb-6 text-8xl animate-float">📚</div>
          <Typography variant="h1" className="!text-white">
            Welcome to StoryLand
          </Typography>
          <p className="mx-auto mt-4 max-w-sm font-body text-lg text-white/80">
            Where every story is an adventure and every child becomes a hero.
          </p>
        </motion.div>
      </div>

      {/* Form side */}
      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <Link to="/" className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <span className="text-4xl">📚</span>
            <span className="font-display text-3xl font-bold text-primary-600">
              StoryLand
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {children || <Outlet />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}