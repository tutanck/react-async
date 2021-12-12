import { useEffect } from 'react';

export default function useSync(refresh, deps = []) {
  useEffect(() => {
    if (deps.includes('done')) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
