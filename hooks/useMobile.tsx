import { useState, useEffect } from 'react';
import { BreakPointsInNumber } from '@/styles';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    if (window.innerWidth <= BreakPointsInNumber.general) setIsMobile(true);
    else setIsMobile(false);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};
