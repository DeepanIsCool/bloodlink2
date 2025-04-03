import { useState, useEffect } from 'react';

// Fade In Animation Hook
export const useFadeIn = (delay = 0, duration = 500) => {
  const [style, setStyle] = useState({
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out ${delay}ms`
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStyle({
        opacity: 1,
        transition: `opacity ${duration}ms ease-in-out ${delay}ms`
      });
    }, 10); // Small delay to ensure the initial state is applied

    return () => clearTimeout(timeoutId);
  }, [delay, duration]);

  return style;
};

// Slide In Animation Hook
export const useSlideIn = (direction = 'left', delay = 0, duration = 500) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-20px)';
      case 'right': return 'translateX(20px)';
      case 'up': return 'translateY(20px)';
      case 'down': return 'translateY(-20px)';
      default: return 'translateX(-20px)';
    }
  };

  const [style, setStyle] = useState({
    opacity: 0,
    transform: getInitialTransform(),
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStyle({
        opacity: 1,
        transform: 'translate(0)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
      });
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [delay, duration, direction]);

  return style;
};

// Pulse Animation Component
export const PulseAnimation = ({ children, duration = 2000 }) => {
  return (
    <div className={`animate-pulse`} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

// Stagger Children Animation Component
export const StaggerChildren = ({ children, staggerDelay = 100 }) => {
  return (
    <>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div key={index} style={{ animationDelay: `${index * staggerDelay}ms` }}>
              {child}
            </div>
          ))
        : children
      }
    </>
  );
};

// Page Transition Component
export const PageTransition = ({ children }) => {
  const style = useFadeIn(0, 300);
  
  return (
    <div style={style} className="w-full">
      {children}
    </div>
  );
};

// Button Animation Component
export const AnimatedButton = ({ children, onClick, className, isLoading = false }) => {
  return (
    <button 
      onClick={onClick}
      className={`${className} relative overflow-hidden transform transition-transform duration-200 active:scale-95`}
      disabled={isLoading}
    >
      <span className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-t-current border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </span>
      )}
    </button>
  );
};

// Card Hover Animation Component
export const AnimatedCard = ({ children, className }) => {
  return (
    <div 
      className={`${className} transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      {children}
    </div>
  );
};