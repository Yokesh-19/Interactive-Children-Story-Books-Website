import { useRef, useState } from 'react';
import Icon from '@/components/atoms/Icon';

export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause();
    else video.play();
    setPlaying(!playing);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-ink shadow-card">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={toggle}
        onEnded={() => setPlaying(false)}
        className="aspect-video w-full cursor-pointer"
      />

      {/* Play overlay when paused */}
      {!playing && (
        <button
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-opacity"
          aria-label="Play video"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-pop transition-transform hover:scale-110">
            <Icon name="Play" size={36} className="translate-x-0.5" />
          </span>
        </button>
      )}

      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
          <p className="font-display font-semibold text-white">{title}</p>
        </div>
      )}
    </div>
  );
}