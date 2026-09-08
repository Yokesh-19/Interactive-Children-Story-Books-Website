import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import QuizPanel from '@/components/organisms/QuizPanel';
import Spinner from '@/components/atoms/Spinner';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import { useGetQuizByStoryQuery, useSubmitQuizMutation } from '@/features/quiz/quizApi';
import { useDispatch } from 'react-redux';
import { completeQuiz } from '@/features/quiz/quizSlice';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: quiz, isLoading, isError } = useGetQuizByStoryQuery(id);
  const [submitQuiz] = useSubmitQuizMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" label="Loading quiz..." />
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <span className="text-6xl">😢</span>
        <Typography variant="h3">Quiz not found</Typography>
        <Button onClick={() => navigate('/stories')}>Back to Stories</Button>
      </div>
    );
  }

  const handleComplete = async (score, total) => {
    dispatch(completeQuiz({ correct: score, total }));
    try {
      await submitQuiz({ storyId: id, answers: {} }).unwrap();
    } catch {
      // score is already stored locally
    }
    toast.success(`You scored ${score}/${total}! 🎉`);
    navigate('/progress');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          leftIcon={<Icon name="ArrowLeft" size={18} />}
        >
          Back
        </Button>
        <Typography variant="h2">Story Quiz</Typography>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <QuizPanel questions={quiz.questions ?? []} onComplete={handleComplete} />
      </motion.div>
    </div>
  );
}
