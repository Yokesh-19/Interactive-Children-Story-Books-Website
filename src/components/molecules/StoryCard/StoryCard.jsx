import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Typography from '@/components/atoms/Typography';
import RatingStars from '@/components/molecules/RatingStars';

export default function StoryCard({ story, onClick }) {
  const {
    title,
    coverImage,
    category,
    ageGroup,
    rating = 0,
    duration,
    progress = 0,
    hasAudio,
    hasVideo,
  } = story;

  return (
    <motion.button
      onClick={() => onClick?.(story)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-card focus:outline-none focus:ring-4 focus:ring-primary-200"
    >
      {/* Cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">📖</div>
        )}

        {/* Media indicators */}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {hasAudio && (
            <span className="rounded-full bg-white/90 p-1.5 text-primary-500 shadow-soft">
              <Icon name="Volume2" size={16} />
            </span>
          )}
          {hasVideo && (
            <span className="rounded-full bg-white/90 p-1.5 text-accent-500 shadow-soft">
              <Icon name="Video" size={16} />
            </span>
          )}
        </div>

        {/* Age badge */}
        <div className="absolute left-3 top-3">
          <Badge variant="secondary">Age {ageGroup}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <Badge variant="primary">{category}</Badge>
          {duration && (
            <span className="flex items-center gap-1 font-body text-xs text-ink/50">
              <Icon name="Clock" size={14} /> {duration} min
            </span>
          )}
        </div>

        <Typography variant="h4" className="line-clamp-2 !text-lg">
          {title}
        </Typography>

        <div className="mt-auto flex items-center justify-between pt-2">
          <RatingStars value={rating} size={16} />
          <span className="font-body text-xs font-semibold text-ink/50">
            {rating.toFixed(1)}
          </span>
        </div>

        {progress > 0 && (
          <div className="pt-1">
            <ProgressBar value={progress} color="mint" size="sm" />
            <span className="mt-1 block font-body text-xs text-mint-500 font-semibold">
              {progress}% complete
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}