import type { Preview } from '@storybook/react';
import '../src/scss/global.scss';
import 'normalize.css/normalize.css';
import { withNextjsMocks } from './decorators/withNextjsMocks';
import { withSanityMocks } from './decorators/withSanityMocks';
import { withFonts } from './decorators/withFonts';

// Load Google Fonts
import '@fontsource/lato/100.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F6F4EF', // Your lt-yellow color
        },
        {
          name: 'dark',
          value: '#0d1b2a', // Your neutral-black color
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    viewport: {
      viewports: {
        xs: {
          name: 'Extra Small (≤360px)',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        sm: {
          name: 'Small (361px-480px)',
          styles: {
            width: '480px',
            height: '640px',
          },
        },
        md: {
          name: 'Medium (481px-768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        lg: {
          name: 'Large (769px-920px)',
          styles: {
            width: '920px',
            height: '1024px',
          },
        },
        xl: {
          name: 'Extra Large (921px-1100px)',
          styles: {
            width: '1100px',
            height: '1024px',
          },
        },
        xxl: {
          name: 'Extra Extra Large (≥1101px)',
          styles: {
            width: '1240px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop (1440px)',
          styles: {
            width: '1440px',
            height: '1024px',
          },
        },
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withFonts,
    withNextjsMocks,
    withSanityMocks,
  ],
};

export default preview;