import type { Meta, StoryObj } from '@storybook/react';
import FullPageHero from '@/components/FullPageHero/FullPageHero';

// Mock data for FullPageHero component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockUpdatedFullPageHeroContent = {
  title: 'Immersive Full Page Experience',
  subtitle: 'Captivating visual storytelling',
  media_source: 'file',
  media_type: 'image',
  image: mockSanityImage,
  vdoID: '123456789',
  media_url: 'https://vimeo.com/123456789',
  gradient: 'dark',
  text_align: 'center',
  is_full_height: true,
};

const meta: Meta<typeof FullPageHero> = {
  title: 'Components/Hero/FullPageHero',
  component: FullPageHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-page immersive hero component with support for images, videos, and various media sources. Features dynamic content loading and customizable gradients.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'FullPageHero component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockUpdatedFullPageHeroContent,
  },
};

export const ImageFromFile: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      media_source: 'file',
      media_type: 'image',
      image: mockSanityImage,
    },
  },
};

export const VideoFromID: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      media_source: 'vdoID',
      vdoID: '123456789',
    },
  },
};

export const VideoFromURL: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      media_source: 'url',
      media_type: 'video',
      media_url: 'https://vimeo.com/123456789',
    },
  },
};

export const ImageFromURL: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      media_source: 'url',
      media_type: 'image',
      media_url: 'https://example.com/image.jpg',
    },
  },
};

export const LightGradient: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      gradient: 'light',
    },
  },
};

export const LeftAligned: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      text_align: 'left',
    },
  },
};

export const RightAligned: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      text_align: 'right',
    },
  },
};

export const HalfHeight: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      is_full_height: false,
    },
  },
};

export const LongContent: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      title: 'This is a much longer title that demonstrates how the component handles extensive text content',
      subtitle: 'This is also a longer subtitle that shows how the component adapts to different content lengths and maintains proper typography hierarchy',
    },
  },
};

export const MinimalContent: Story = {
  args: {
    content: {
      ...mockUpdatedFullPageHeroContent,
      title: 'Hero',
      subtitle: 'Simple',
    },
  },
};