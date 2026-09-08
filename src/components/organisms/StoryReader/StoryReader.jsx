import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import ProgressBar from '@/components/atoms/ProgressBar';
import Typography from '@/components/atoms/Typography';
import AudioPlayer from '@/components/molecules/AudioPlayer';
import VideoPlayer from '@/components/molecules/VideoPlayer';

/**
 * story.pages = [{ text, image, audio }]
 * story.video = optional full-story video url
 */
export default function StoryReader({ story, onFinish, onPageChange }) {
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState('read'); // 'read' | 'video'

  const pages = story?.pages || [];
  const total = pages.length;
  const current = pages[page] || {};
  const isLast = page === total - 1;

  useEffect(() => {
    if (total > 0) {
      const percent = Math.round(((page + 1) / total) * 100);
      onPageChange?.(percent, page + 1);
    }
  }, [page, total]); // eslint-disable-line

  const next = () => {
    if (isLast) onFinish?.();
    else setPage((p) => p + 1);
  };
  const prev = () => setPage((p) => Math.max(0, p - 1));

  return (
    <div className="mx-auto max-w-4xl">
      {/* Mode toggle */}
      {story?.video && (
        <div className="mb-4 flex justify-center gap-2">
          <Button
            variant={mode === 'read' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setMode('read')}
            leftIcon={<Icon name="BookOpen" size={18} />}
          >
            Read
          </Button>
          <Button
            variant={mode === 'video' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setMode('video')}
            leftIcon={<Icon name="Video" size={18} />}
          >
            Watch
          </Button>
        </div>
      )}

      {mode === 'video' && story?.video ? (
        <VideoPlayer src={story.video} poster={story.coverImage} title={story.title} />
      ) : (
        <>
          {/* Progress */}
          <div className="mb-4">
            <div className="mb-1 flex justify-between font-body text-sm font-semibold text-ink/60">
              <span>
                Page {page + 1} of {total}
              </span>
              <span>{Math.round(((page + 1) / total) * 100)}%</span>
            </div>
            <ProgressBar value={page + 1} max={total} color="mint" />
          </div>

          {/* Page content */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {current.image && (
                  <div className="aspect-video w-full overflow-hidden bg-primary-100">
                    <img
                      src={current.image}
                      alt={`Page ${page + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 md:p-10">
                  <Typography variant="h3" className="mb-6 text-center leading-relaxed">
                    {current.text}
                  </Typography>
                  {current.audio && (
                    <AudioPlayer src={current.audio} title="Listen to this page" />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prev}
              disabled={page === 0}
              leftIcon={<Icon name="ChevronLeft" size={20} />}
            >
              Previous
            </Button>

            <div className="flex gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === page ? 'w-6 bg-primary-500' : 'w-2.5 bg-primary-200'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={next}
              variant={isLast ? 'accent' : 'primary'}
              rightIcon={<Icon name={isLast ? 'PartyPopper' : 'ChevronRight'} size={20} />}
            >
              {isLast ? 'Finish' : 'Next'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
