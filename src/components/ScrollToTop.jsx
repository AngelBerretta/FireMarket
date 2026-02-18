import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ 
  behavior = "auto", 
  smoothOnMobile = true,
  delay = 0,
  ignoreRoutes = []
}) => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Si la ruta está en la lista de ignoradas, no hacer scroll
    if (ignoreRoutes.includes(pathname)) {
      prevPathname.current = pathname;
      return;
    }

    // Solo hacer scroll si realmente cambió la ruta
    if (prevPathname.current !== pathname) {
      const scrollToTop = () => {
        // Detectar si es dispositivo móvil
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;

        // Determinar comportamiento según dispositivo
        const scrollBehavior = smoothOnMobile && isMobile ? "smooth" : behavior;

        // Ejecutar scroll con posible delay
        if (delay > 0) {
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: scrollBehavior
            });
          }, delay);
        } else {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: scrollBehavior
          });
        }
      };

      
      requestAnimationFrame(scrollToTop);
      
      prevPathname.current = pathname;
    }
  }, [pathname, behavior, smoothOnMobile, delay, ignoreRoutes]);

  // Detectar cambios de orientación en móviles
  useEffect(() => {
    const handleOrientationChange = () => {
      // Pequeño delay para permitir que el navegador se ajuste
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto" 
        });
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return null;
};


export const SimpleScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantáneo en todos los dispositivos
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


export const MobileOptimizedScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; 
      
      // Forzar en el próximo frame también
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
