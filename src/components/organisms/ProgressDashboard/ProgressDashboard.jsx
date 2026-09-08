import { motion } from 'framer-motion';
import ProgressStat from '@/components/molecules/ProgressStat';
import ProgressBar from '@/components/atoms/ProgressBar';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';

/**
 * stats = { storiesRead, quizzesPassed, badgesEarned, minutesRead }
 * inProgress = [{ id, title, category, progress }]
 */
export default function ProgressDashboard({ stats = {}, inProgress = [] }) {
  const tiles = [
    { icon: 'BookOpen', value: stats.storiesRead ?? 0, label: 'Stories Read', theme: 'primary' },
    { icon: 'CheckCircle2', value: stats.quizzesPassed ?? 0, label: 'Quizzes Passed', theme: 'mint' },
    { icon: 'Award', value: stats.badgesEarned ?? 0, label: 'Badges Earned', theme: 'secondary' },
    { icon: 'Clock', value: stats.minutesRead ?? 0, label: 'Minutes Read', theme: 'accent' },
  ];

  return (
    <div className="space-y-8">
      {/* Stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <ProgressStat {...tile} />
          </motion.div>
        ))}
      </div>

      {/* Continue reading */}
      <div>
        <Typography variant="h3" className="mb-4">
          Continue Reading
        </Typography>

        {inProgress.length ? (
          <div className="space-y-3">
            {inProgress.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-2xl">
                  📖
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Typography variant="h4" className="!text-base">
                      {story.title}
                    </Typography>
                    <Badge variant="primary">{story.category}</Badge>
                  </div>
                  <ProgressBar value={story.progress} color="mint" size="sm" />
                </div>
                <span className="font-display font-bold text-mint-500">
                  {story.progress}%
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-3xl bg-white py-12 text-center shadow-card">
            <span className="text-5xl animate-float">🚀</span>
            <Typography variant="body">
              You haven't started any stories yet. Let's begin an adventure!
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}