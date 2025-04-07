import { useEffect, useState } from 'react';

export function useDeviceDetect() {
   const [isMobile, setMobile] = useState(false);

   useEffect(() => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobile = Boolean(
         userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i)
      );
      setMobile(mobile);
   }, []);

   return { isMobile };
}
