import { motion } from 'framer-motion';
import StoryCard from '@/components/molecules/StoryCard';
import Spinner from '@/components/atoms/Spinner';
import Typography from '@/components/atoms/Typography';

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      <div className="aspect-[4/3] animate-pulse bg-primary-100" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-1/3 animate-pulse rounded-full bg-primary-100" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-primary-100" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-primary-100" />
      </div>
    </div>
  );
}

export default function StoryGrid({
  stories = [],
  isLoading = false,
  isError = false,
  onStoryClick,
  emptyMessage = 'No stories found. Try a different search!',
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <span className="text-6xl">😢</span>
        <Typography variant="h3">Oops! Something went wrong</Typography>
        <Typography variant="body">
          We couldn't load the stories. Please try again.
        </Typography>
      </div>
    );
  }

  if (!stories.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <span className="text-6xl animate-float">🔍</span>
        <Typography variant="h3">Nothing here yet</Typography>
        <Typography variant="body">{emptyMessage}</Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stories.map((story, i) => (
        <motion.div
          key={story.id || story._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <StoryCard story={story} onClick={onStoryClick} />
        </motion.div>
      ))}
    </div>
  );
}