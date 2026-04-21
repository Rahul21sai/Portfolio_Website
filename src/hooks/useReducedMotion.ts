import { useMediaQuery } from './useMediaQuery';

export const useReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

// Made with Bob
