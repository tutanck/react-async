import { useState } from 'react';

export default function useAsync(asyncFn) {
  const [status, setStatus] = useState();

  const handle = async (...args) => {
    setStatus('loading');

    return asyncFn(...args)
      .then((data) => {
        setStatus('done');
        return data;
      })
      .catch((err) => {
        setStatus('error');
        throw err;
      })
      .finally(() => setStatus());
  };

  return [handle, status];
}
