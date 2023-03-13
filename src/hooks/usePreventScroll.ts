import { useEffect } from 'react';

export const usePreventScroll = (isPrevented: boolean) => {
  return useEffect(() => {
    if (isPrevented) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPrevented]);
};
