import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Typography from '@/components/atoms/Typography';
import QuizOption from '@/components/molecules/QuizOption';

/**
 * questions = [{ id, question, options: [{key, label}], correctKey }]
 * Calls onComplete(score, total) at the end.
 */
export default function QuizPanel({ questions = [], onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const total = questions.length;
  const q = questions[index] || {};
  const isLast = index === total - 1;
  const isCorrect = selected === q.correctKey;

  const check = () => {
    if (selected == null) return;
    setChecked(true);
    if (selected === q.correctKey) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      onComplete?.(score, total);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setChecked(false);
    }
  };

  const getState = (key) => {
    if (!checked) return selected === key ? 'selected' : 'default';
    if (key === q.correctKey) return 'correct';
    if (key === selected) return 'incorrect';
    return 'default';
  };

  if (!total) {
    return (
      <div className="py-20 text-center">
        <Typography variant="h3">No quiz available for this story yet.</Typography>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display font-semibold text-primary-600">
            Question {index + 1} of {total}
          </span>
          <span className="flex items-center gap-1 font-body text-sm font-semibold text-secondary-600">
            <Icon name="Star" size={16} className="fill-secondary-400 text-secondary-400" />
            {score} correct
          </span>
        </div>
        <ProgressBar value={index + 1} max={total} color="primary" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-3xl bg-white p-6 shadow-card md:p-8"
        >
          <Typography variant="h3" className="mb-6">
            {q.question}
          </Typography>

          <div className="flex flex-col gap-3">
            {q.options?.map((opt) => (
              <QuizOption
                key={opt.key}
                optionKey={opt.key}
                label={opt.label}
                state={getState(opt.key)}
                disabled={checked}
                onSelect={setSelected}
              />
            ))}
          </div>

          {/* Feedback */}
          {checked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-5 flex items-center gap-3 rounded-2xl p-4 font-body font-semibold ${
                isCorrect
                  ? 'bg-mint-400/15 text-mint-500'
                  : 'bg-accent-100 text-accent-600'
              }`}
            >
              <Icon name={isCorrect ? 'PartyPopper' : 'Lightbulb'} size={24} />
              {isCorrect
                ? 'Awesome! That’s correct! 🎉'
                : `Good try! The correct answer was ${q.correctKey?.toUpperCase()}.`}
            </motion.div>
          )}

          {/* Action */}
          <div className="mt-6 flex justify-end">
            {!checked ? (
              <Button onClick={check} disabled={selected == null}>
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={next}
                variant={isLast ? 'accent' : 'primary'}
                rightIcon={<Icon name={isLast ? 'Flag' : 'ChevronRight'} size={20} />}
              >
                {isLast ? 'See Results' : 'Next Question'}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}