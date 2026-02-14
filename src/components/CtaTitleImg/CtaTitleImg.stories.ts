import type { Meta, StoryObj } from '@storybook/react';
import CtaTitleImg from '@/components/CtaTitleImg/CtaTitleImg';

// Mock data for CtaTitleImg component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockCtaTitleImgContent = {
  title: 'Get Started Today',
  subtitle: 'Join thousands of satisfied customers',
  image: mockSanityImage,
  ctaText: 'Start Now',
  ctaUrl: '/get-started',
  theme: 'light',
};

const meta: Meta<typeof CtaTitleImg> = {
  title: 'Components/Media/CtaTitleImg',
  component: CtaTitleImg,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A call-to-action component featuring a title, subtitle, image, and action button. Perfect for driving user engagement and conversions.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'CtaTitleImg component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockCtaTitleImgContent,
  },
};

export const DarkTheme: Story = {
  args: {
    content: {
      ...mockCtaTitleImgContent,
      theme: 'dark',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const LongTitle: Story = {
  args: {
    content: {
      title: 'Transform Your Business with Our Comprehensive Digital Solutions',
      subtitle: 'Join thousands of satisfied clients who have revolutionized their digital presence',
      image: mockSanityImage,
      ctaText: 'Schedule Free Consultation',
      ctaUrl: '/consultation',
      theme: 'light',
    },
  },
};

export const ShortContent: Story = {
  args: {
    content: {
      title: 'Ready?',
      subtitle: 'Let\'s go!',
      image: mockSanityImage,
      ctaText: 'Start',
      ctaUrl: '/start',
      theme: 'light',
    },
  },
};

export const NoSubtitle: Story = {
  args: {
    content: {
      title: 'Get Started Today',
      image: mockSanityImage,
      ctaText: 'Begin Journey',
      ctaUrl: '/begin',
      theme: 'light',
    },
  },
};

export const ExternalLink: Story = {
  args: {
    content: {
      title: 'Visit Our Main Site',
      subtitle: 'Explore more features and services',
      image: mockSanityImage,
      ctaText: 'Visit Website',
      ctaUrl: 'https://krupaul.com',
      theme: 'light',
    },
  },
};

export const AlternativeButton: Story = {
  args: {
    content: {
      title: 'Download Our App',
      subtitle: 'Available on all major platforms',
      image: mockSanityImage,
      ctaText: 'Download Now',
      ctaUrl: '/download',
      theme: 'light',
    },
  },
};

export const MarketingVariant: Story = {
  args: {
    content: {
      title: 'Limited Time Offer',
      subtitle: '50% off all premium features for the first 100 customers',
      image: mockSanityImage,
      ctaText: 'Claim Offer',
      ctaUrl: '/offer',
      theme: 'light',
    },
  },
};

export const NewsletterVariant: Story = {
  args: {
    content: {
      title: 'Stay Updated',
      subtitle: 'Get the latest news and updates delivered to your inbox',
      image: mockSanityImage,
      ctaText: 'Subscribe Now',
      ctaUrl: '/newsletter',
      theme: 'light',
    },
  },
};