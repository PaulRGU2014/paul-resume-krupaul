import type { Meta, StoryObj } from '@storybook/react';
import FullPageZoom from '@/components/FullPageZoom/FullPageZoom';

// Mock data for FullPageZoom component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockFullPageZoomContent = {
  media_url: 'https://vimeo.com/123456789',
  theme: 'dark',
  is_video_muted: true,
};

const meta: Meta<typeof FullPageZoom> = {
  title: 'Components/Media/FullPageZoom',
  component: FullPageZoom,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-page zoom component that displays an image with zoom and pan functionality. Features responsive design and smooth interaction controls.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'FullPageZoom component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockFullPageZoomContent,
  },
};

export const DifferentImage: Story = {
  args: {
    content: {
      ...mockFullPageZoomContent,
      image: {
        ...mockSanityImage,
        alt: 'Alternative zoomable image',
      },
    },
  },
};

export const PortraitImage: Story = {
  args: {
    content: {
      ...mockFullPageZoomContent,
      image: {
        ...mockSanityImage,
        alt: 'Portrait orientation image',
        // Simulating portrait dimensions in the alt for demonstration
      },
    },
  },
};

export const LandscapeImage: Story = {
  args: {
    content: {
      ...mockFullPageZoomContent,
      image: {
        ...mockSanityImage,
        alt: 'Landscape orientation image',
        // Simulating landscape dimensions in the alt for demonstration
      },
    },
  },
};

export const HighResolutionImage: Story = {
  args: {
    content: {
      ...mockFullPageZoomContent,
      image: {
        ...mockSanityImage,
        alt: 'High resolution image for detailed zoom',
      },
    },
  },
};