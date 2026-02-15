import type { Meta, StoryObj } from '@storybook/react';
import HeroBannerImg from '@/components/HeroBannerImg/HeroBannerImg';

// Mock data for HeroBannerImg component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockHeroBannerImgContent = {
  title: 'Hero Banner with Image',
  subtitle: 'Stunning visual impact',
  image: mockSanityImage,
  is_curved: true,
};

const meta: Meta<typeof HeroBannerImg> = {
  title: 'Components/Hero/HeroBannerImg',
  component: HeroBannerImg,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A hero banner component with image background and overlay text. Features customizable alignment, gradient overlays, and responsive text layout.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'HeroBannerImg component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockHeroBannerImgContent,
  },
};

export const CenterAligned: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      text_align: 'center',
    },
  },
};

export const RightAligned: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      text_align: 'right',
    },
  },
};

export const LongContent: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      title: 'This is a very long hero banner title that demonstrates how the component handles extensive text content and maintains proper typography hierarchy',
      subtitle: 'This is also a longer subtitle that shows how the component adapts to different content lengths while preserving the visual balance and readability of the hero section',
    },
  },
};

export const MinimalContent: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      title: 'Simple Hero',
      subtitle: 'Clean & Minimal',
    },
  },
};

export const NoSubtitle: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      subtitle: '',
    },
  },
};

export const DifferentImage: Story = {
  args: {
    content: {
      ...mockHeroBannerImgContent,
      image: {
        ...mockSanityImage,
        alt: 'Alternative hero background image',
      },
    },
  },
};