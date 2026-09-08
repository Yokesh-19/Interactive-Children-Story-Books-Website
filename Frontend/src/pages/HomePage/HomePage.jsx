import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import Badge from '@/components/atoms/Badge';
import StoryGrid from '@/components/organisms/StoryGrid';
import { useGetFeaturedStoriesQuery } from '@/features/stories/storiesApi';

const features = [
  { icon: 'BookOpen', title: 'Interactive Stories', desc: 'Beautifully illustrated tales that come alive.', theme: 'primary' },
  { icon: 'Volume2', title: 'Audio & Video', desc: 'Listen and watch stories narrated with love.', theme: 'accent' },
  { icon: 'Brain', title: 'Fun Quizzes', desc: 'Test what you learned and earn rewards.', theme: 'mint' },
  { icon: 'TrendingUp', title: 'Track Progress', desc: 'Watch your reading journey grow every day.', theme: 'secondary' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: featured, isLoading, isError } = useGetFeaturedStoriesQuery();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-100 via-cloud to-accent-50 px-6 py-16 md:py-24">
        <div className="absolute left-8 top-12 text-5xl opacity-60 animate-float">⭐</div>
        <div className="absolute right-12 top-20 text-4xl opacity-50 animate-float" style={{ animationDelay: '0.7s' }}>🎈</div>
        <div className="absolute bottom-10 left-1/4 text-4xl opacity-40 animate-float" style={{ animationDelay: '1.2s' }}>🦋</div>

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="secondary" className="mb-4">
              ✨ Where reading is magic
            </Badge>
            <Typography variant="h1" className="!text-5xl md:!text-6xl">
              Every Story is an{' '}
              <span className="text-primary-600">Adventure</span>
            </Typography>
            <Typography variant="body" className="mx-auto mt-4 max-w-xl !text-lg">
              Dive into a world of interactive storybooks with audio, video, and
              playful quizzes designed to make every child fall in love with reading.
            </Typography>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => navigate('/stories')} leftIcon={<Icon name="Rocket" size={20} />}>
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
                Join for Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-white p-6 text-center shadow-card"
            >
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-${f.theme}-100 text-${f.theme}-600`}>
                <Icon name={f.icon} size={30} />
              </div>
              <Typography variant="h4" className="!text-lg">{f.title}</Typography>
              <Typography variant="small" className="mt-2 block">{f.desc}</Typography>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured stories */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <Typography variant="h2">Featured Stories 🌈</Typography>
          <Button variant="ghost" onClick={() => navigate('/stories')} rightIcon={<Icon name="ArrowRight" size={18} />}>
            View all
          </Button>
        </div>
        <StoryGrid
          stories={featured || []}
          isLoading={isLoading}
          isError={isError}
          onStoryClick={(story) => navigate(`/stories/${story.id || story._id}`)}
        />
      </section>
    </div>
  );
}