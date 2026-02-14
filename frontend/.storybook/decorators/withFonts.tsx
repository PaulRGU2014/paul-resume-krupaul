import { Decorator } from '@storybook/react';
import { useEffect } from 'react';

export const withFonts: Decorator = (Story) => {
  useEffect(() => {
    // Set up CSS custom properties for fonts that match Next.js behavior
    const root = document.documentElement;
    
    // Set the Lato font as the CSS custom property that global.scss expects
    root.style.setProperty('--font-lato', '"Lato", sans-serif');
    
    // Also apply font-family directly to ensure proper rendering
    document.body.style.fontFamily = '"Lato", sans-serif';
    
    return () => {
      // Cleanup on unmount
      root.style.removeProperty('--font-lato');
      document.body.style.fontFamily = '';
    };
  }, []);

  return <Story />;
};