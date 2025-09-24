import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBeforeType?: number;
  loop?: boolean;
  speedVariance?: number;
  randomizeDeleteSpeed?: boolean;
}

type Phase = 'typing' | 'pausingAfterType' | 'deleting' | 'pausingAfterDelete';

interface TypewriterReturn {
  text: string;
  isDeleting: boolean;
  index: number;
  phase: Phase;
}

const useTypewriter = ({
  texts,
  speed = 110,
  deleteSpeed = 55,
  pauseBeforeDelete = 1100,
  pauseBeforeType = 350,
  loop = true,
  speedVariance = 0.25,
  randomizeDeleteSpeed = true,
}: TypewriterProps): TypewriterReturn => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');

  const charPosRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const phaseRef = useRef<Phase>('typing');

  const setPhaseSafely = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const clear = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const schedule = (fn: () => void, delay: number) => {
    clear();
    timeoutRef.current = window.setTimeout(fn, delay);
  };

  const jitter = (base: number, apply: boolean) => {
    if (!apply || speedVariance <= 0) return base;
    const variance = base * speedVariance;
    const min = Math.max(10, base - variance);
    const max = base + variance;
    return Math.round(Math.random() * (max - min) + min);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: We do not want this to run on every prop change as several are stable values
  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentWord = texts[index] || '';
    const isLastCycle = !loop && index === texts.length - 1;

    const run = () => {
      switch (phaseRef.current) {
        case 'typing': {
          if (charPosRef.current < currentWord.length) {
            const next = currentWord.slice(0, charPosRef.current + 1);
            setText(next);
            charPosRef.current += 1;
            schedule(run, jitter(speed, true));
          } else {
            setPhaseSafely('pausingAfterType');
            schedule(run, isLastCycle ? 0 : pauseBeforeDelete);
          }
          break;
        }
        case 'pausingAfterType': {
          if (isLastCycle) {
            clear();
            return;
          }
          setPhaseSafely('deleting');
          setIsDeleting(true);
          schedule(run, jitter(deleteSpeed, randomizeDeleteSpeed));
          break;
        }
        case 'deleting': {
          if (charPosRef.current > 0) {
            charPosRef.current -= 1;
            const next = currentWord.slice(0, charPosRef.current);
            setText(next);
            schedule(run, jitter(deleteSpeed, randomizeDeleteSpeed));
          } else {
            setPhaseSafely('pausingAfterDelete');
            setIsDeleting(false);
            schedule(run, pauseBeforeType);
          }
          break;
        }
        case 'pausingAfterDelete': {
          const nextIndex = (index + 1) % texts.length;
          setIndex(nextIndex);
          charPosRef.current = 0;
          setPhaseSafely('typing');
          schedule(run, jitter(speed, true));
          break;
        }
      }
    };

    run();
    return clear;
  }, [texts, index, speed, deleteSpeed, pauseBeforeDelete, pauseBeforeType, loop, speedVariance, randomizeDeleteSpeed]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only want to reset when texts change
  useEffect(() => {
    setText('');
    setIsDeleting(false);
    setIndex(0);
    charPosRef.current = 0;
    phaseRef.current = 'typing';
    setPhase('typing');
  }, [JSON.stringify(texts)]);

  return { text, isDeleting, index, phase };
};

export default useTypewriter;
