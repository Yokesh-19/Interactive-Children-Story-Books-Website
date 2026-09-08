import { motion } from 'framer-motion';
import Typography from '@/components/atoms/Typography';
import Spinner from '@/components/atoms/Spinner';
import ProgressDashboard from '@/components/organisms/ProgressDashboard';
import { useGetProgressQuery } from '@/features/progress/progressApi';

export default function ProgressPage() {
  const { data, isLoading, isError } = useGetProgressQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" label="Loading your progress..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <span className="text-6xl">😢</span>
        <Typography variant="h3">Could not load progress</Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl px-4 py-8"
    >
      <Typography variant="h2" className="mb-6">My Progress 🏆</Typography>
      <ProgressDashboard
        stats={data?.stats ?? {}}
        inProgress={data?.inProgress ?? []}
      />
    </motion.div>
  );
}
