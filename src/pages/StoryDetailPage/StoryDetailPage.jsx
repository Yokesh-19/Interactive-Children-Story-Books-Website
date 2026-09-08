import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import StoryReader from '@/components/organisms/StoryReader';
import Spinner from '@/components/atoms/Spinner';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import Badge from '@/components/atoms/Badge';
import RatingStars from '@/components/molecules/RatingStars';
import { useGetStoryByIdQuery } from '@/features/stories/storiesApi';
import {
  useUpdateStoryProgressMutation,
  useMarkStoryCompleteMutation,
} from '@/features/progress/progressApi';

export default function StoryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: story, isLoading, isError } = useGetStoryByIdQuery(id);
  const [updateProgress] = useUpdateStoryProgressMutation();
  const [markComplete] = useMarkStoryCompleteMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" label="Loading your story..." />
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <span className="text-6xl">😢</span>
        <Typography variant="h3">Story not found</Typography>
        <Button onClick={() => navigate('/stories')}>Back to Stories</Button>
      </div>
    );
  }

  const handleFinish = async () => {
    try {
      await markComplete(id).unwrap();
      toast.success('Story finished! 🎉');
      // If the story has a quiz, head there next
      if (story.hasQuiz) {
        navigate(`/stories/${id}/quiz`);
      } else {
        navigate('/progress');
      }
    } catch {
      toast.error('Could not save your progress');
    }
  };

  // Save reading progress as pages turn (called by StoryReader indirectly)
  const handlePageProgress = (progressPercent, currentPage) => {
    updateProgress({ storyId: id, progress: progressPercent, currentPage });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/stories')}
          leftIcon={<Icon name="ArrowLeft" size={18} />}
          className="mb-4"
        >
          Back to Stories
        </Button>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Typography variant="h2">{story.title}</Typography>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="primary">{story.category}</Badge>
              <Badge variant="secondary">Age {story.ageGroup}</Badge>
              {story.duration && (
                <span className="flex items-center gap-1 font-body text-sm text-ink/50">
                  <Icon name="Clock" size={15} /> {story.duration} min
                </span>
              )}
            </div>
          </div>
          <RatingStars value={story.rating || 0} />
        </div>
      </div>

      {/* Reader */}
      <StoryReader
        story={story}
        onFinish={handleFinish}
        onPageChange={handlePageProgress}
      />
    </div>
  );
}