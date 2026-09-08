import { useRef, useState } from 'react';
import Icon from '@/components/atoms/Icon';

function formatTime(sec = 0) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function AudioPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrent(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const onSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = (e.target.value / 100) * audio.duration;
    audio.currentTime = time;
    setProgress(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-50 p-4 shadow-soft">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setPlaying(false)}
      />

      <button
        onClick={toggle}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-pop transition-transform hover:scale-105 active:scale-95"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <Icon name={playing ? 'Pause' : 'Play'} size={22} />
      </button>

      <div className="flex-1">
        {title && (
          <p className="mb-1 font-display font-semibold text-sm text-ink">
            {title}
          </p>
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={onSeek}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-200 accent-primary-500"
        />
        <div className="mt-1 flex justify-between font-body text-xs text-ink/50">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}