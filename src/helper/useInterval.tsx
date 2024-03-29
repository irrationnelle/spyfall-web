import { useEffect, useRef } from 'react';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const useInterval = (callback: ((...args: any[]) => any) | undefined, delay: number): void => {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const savedCallback = useRef<((...args: any[]) => any) | undefined>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
