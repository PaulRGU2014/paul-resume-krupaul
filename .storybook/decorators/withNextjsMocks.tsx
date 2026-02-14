import React from 'react';
import type { Decorator } from '@storybook/react';

// Mock Image component that handles Sanity images
const MockImage = ({ src, alt, fill, style, className, ...props }: any) => {
  // Handle Sanity image refs or regular URLs
  const imageSrc = typeof src === 'string' 
    ? src.includes('_ref') 
      ? '/placeholder-image.jpg' 
      : src
    : '/placeholder-image.jpg';

  const imageStyle = {
    ...style,
    ...(fill && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: style?.objectFit || 'cover',
    }),
  };

  return (
    <img 
      src={imageSrc}
      alt={alt || 'Mock image'} 
      className={className}
      style={imageStyle}
      {...props}
    />
  );
};

// Create a context for mocked Next.js hooks
const NextjsContext = React.createContext({
  pathname: '/',
  router: {
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
  },
});

// Mock hooks that use the context
export const usePathname = () => {
  const context = React.useContext(NextjsContext);
  return context.pathname;
};

export const useRouter = () => {
  const context = React.useContext(NextjsContext);
  return context.router;
};

export const useSearchParams = () => new URLSearchParams();

// Export the mock Image component
export { MockImage as Image };

export const withNextjsMocks: Decorator = (Story) => {
  return (
    <NextjsContext.Provider value={{
      pathname: '/',
      router: {
        push: () => {},
        replace: () => {},
        prefetch: () => {},
        back: () => {},
        forward: () => {},
        refresh: () => {},
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
      }
    }}>
      <Story />
    </NextjsContext.Provider>
  );
};