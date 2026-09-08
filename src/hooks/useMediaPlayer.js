import { useState, useRef } from 'react';

export default function useMediaPlayer() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    playing ? ref.current.pause() : ref.current.play();
    setPlaying((p) => !p);
  };

  return { ref, playing, toggle };
}
