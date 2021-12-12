import { useEffect } from 'react';

export default function useOnDone(fn, deps = []) {
  useEffect(() => {
    if (deps.includes('done')) {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
