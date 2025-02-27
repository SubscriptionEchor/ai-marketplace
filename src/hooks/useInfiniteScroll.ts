import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  disabled?: boolean;
}

export function useInfiniteScroll(
  callback: () => void,
  { disabled = false, ...options }: UseInfiniteScrollOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && !disabled) {
      setIsLoading(true);
      await callback();
      setIsLoading(false);
    }
  }, [callback, isLoading, disabled]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
      ...options
    });

    const currentTarget = targetRef.current;
    if (currentTarget && !disabled && observerRef.current) {
      observerRef.current.observe(currentTarget);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, disabled, options]);

  return { targetRef, isLoading };
}