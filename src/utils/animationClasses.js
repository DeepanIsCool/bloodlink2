/**
 * Animation utility classes for Tailwind CSS
 * 
 * This file contains animation class definitions that can be imported
 * and used with the @apply directive in CSS or directly in className props
 */

// Export animation classes that can be used with @apply in CSS
export const animationClasses = {
  // Fade animations
  'fade-in': 'animate-fadeIn',
  'fade-out': 'animate-fadeOut',
  
  // Slide animations
  'slide-in-left': 'animate-slideInLeft',
  'slide-in-right': 'animate-slideInRight',
  'slide-in-up': 'animate-slideInUp',
  'slide-in-down': 'animate-slideInDown',
  
  // Scale animations
  'scale-in': 'animate-scaleIn',
  'scale-out': 'animate-scaleOut',
  'pulse': 'animate-pulse',
  'bounce': 'animate-bounce',
  
  // Button animations
  'btn-hover': 'transform transition-all duration-200 hover:scale-105',
  'btn-active': 'active:scale-95',
  
  // Card animations
  'card-hover': 'transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
  
  // Page transitions
  'page-transition': 'animate-fadeIn',
  
  // Loading animations
  'spin': 'animate-spin',
  'ping': 'animate-ping',
};

// Helper function to combine multiple animation classes
export const combineAnimations = (...classNames) => {
  return classNames.map(className => animationClasses[className] || className).join(' ');
};