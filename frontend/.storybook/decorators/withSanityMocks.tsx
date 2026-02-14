import React from 'react';
import type { Decorator } from '@storybook/react';

// Mock Sanity client
const mockSanityClient = {
  fetch: async (query: string) => {
    console.log('Mock Sanity query:', query);
    return [];
  },
  config: () => mockSanityClient,
  withConfig: () => mockSanityClient,
};

// Mock urlForImage function
export const mockUrlForImage = (source: any) => ({
  url: () => {
    if (typeof source === 'string') {
      // Handle Sanity image refs
      if (source.includes('_ref')) {
        return '/placeholder-image.jpg';
      }
      return source;
    }
    if (source?.asset?._ref) {
      return '/placeholder-image.jpg';
    }
    return '/placeholder-image.jpg';
  },
  width: (width: number) => ({ url: () => '/placeholder-image.jpg' }),
  height: (height: number) => ({ url: () => '/placeholder-image.jpg' }),
  fit: (fit: string) => ({ url: () => '/placeholder-image.jpg' }),
  format: (format: string) => ({ url: () => '/placeholder-image.jpg' }),
  quality: (quality: number) => ({ url: () => '/placeholder-image.jpg' }),
});

// Create Sanity context
const SanityContext = React.createContext({
  client: mockSanityClient,
  urlForImage: mockUrlForImage,
});

// Common mock data generators
export const mockSanityImage = {
  asset: {
    _ref: 'image-mock-ref',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

export const mockRichTextContent = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is mock rich text content for Storybook preview.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'You can customize this content in your stories to match your component needs.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
];

export const withSanityMocks: Decorator = (Story) => {
  return (
    <SanityContext.Provider value={{
      client: mockSanityClient,
      urlForImage: mockUrlForImage,
    }}>
      <Story />
    </SanityContext.Provider>
  );
};