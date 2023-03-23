import {useState, useEffect} from 'react'

export default function useIsOnMobile() {
    const [onMobile, setOnMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setOnMobile(window.innerWidth < 768)
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return onMobile;
}
