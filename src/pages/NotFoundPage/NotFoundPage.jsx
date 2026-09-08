import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <div className="mb-4 text-8xl animate-float">🔍</div>
        <Typography variant="h1" className="!text-6xl text-primary-500">404</Typography>
        <Typography variant="h3" className="mt-2">Oops! Page not found</Typography>
        <Typography variant="body" className="mt-2 max-w-sm mx-auto">
          Looks like this page wandered off on its own adventure. Let's get you back!
        </Typography>
        <div className="mt-8">
          <Link to="/">
            <Button leftIcon={<Icon name="Home" size={18} />}>Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
