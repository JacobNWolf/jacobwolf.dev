import { cn } from '~/utils/cn';
import useTypewriter from './hooks/useTypewriter';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBeforeType?: number;
  loop?: boolean;
  className?: string;
  cursor?: string;
  speedVariance?: number;
  randomizeDeleteSpeed?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = (props) => {
  const { text, phase } = useTypewriter(props);
  const cursor = props.cursor ?? '|';

  const isBlinking = phase === 'pausingAfterType' || phase === 'pausingAfterDelete';

  return (
    <span className={cn(props.className, 'font-mono inline-block gap-1')}>
      {text}
      <span
        className={cn('tw-caret inline-block text-accent-600 dark:text-accent-600', isBlinking && 'tw-caret--blink')}
        aria-hidden="true"
      >
        {cursor}
      </span>
    </span>
  );
};

export default Typewriter;
