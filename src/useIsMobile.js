import { useEffect, useState } from 'react';

const QUERY = '(max-width: 720px)';

export default function useIsMobile() {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY).matches : false);
  const [v, setV] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return v;
}
