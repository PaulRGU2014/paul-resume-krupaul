import type { Meta, StoryObj } from '@storybook/react';
import TextImageButton from '@/components/TextImageButton/TextImageButton';

// Mock data for TextImageButton component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockRichTextContent = [
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
        text: 'You can customize this content in your stories to match your component needs. This paragraph demonstrates how rich text content appears in your components.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
];

const mockTextImageButtonContent = {
  title: 'Call to Action Section',
  body: mockRichTextContent,
  image: mockSanityImage,
  buttonText: 'Learn More',
  buttonUrl: '/about',
  theme: 'light',
};

const meta: Meta<typeof TextImageButton> = {
  title: 'Components/Media/TextImageButton',
  component: TextImageButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A component that combines text content, an image, and a call-to-action button. Perfect for feature sections and promotional content.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'TextImageButton component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockTextImageButtonContent,
  },
};

export const DarkTheme: Story = {
  args: {
    content: {
      ...mockTextImageButtonContent,
      theme: 'dark',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const AlternativeButton: Story = {
  args: {
    content: {
      title: 'Discover Our Services',
      body: mockRichTextContent,
      image: mockSanityImage,
      buttonText: 'Get Started',
      buttonUrl: '/services',
      theme: 'light',
    },
  },
};

export const LongTitle: Story = {
  args: {
    content: {
      title: 'Transform Your Digital Presence with Our Comprehensive Development Solutions',
      body: mockRichTextContent,
      image: mockSanityImage,
      buttonText: 'Schedule Consultation',
      buttonUrl: '/contact',
      theme: 'light',
    },
  },
};

export const ShortContent: Story = {
  args: {
    content: {
      title: 'Quick Solution',
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Brief description of our service.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      image: mockSanityImage,
      buttonText: 'Try Now',
      buttonUrl: '/trial',
      theme: 'light',
    },
  },
};

export const NoButton: Story = {
  args: {
    content: {
      title: 'Information Section',
      body: mockRichTextContent,
      image: mockSanityImage,
      buttonText: '',
      buttonUrl: '',
      theme: 'light',
    },
  },
};

export const ExternalLink: Story = {
  args: {
    content: {
      title: 'External Resource',
      body: mockRichTextContent,
      image: mockSanityImage,
      buttonText: 'Visit Website',
      buttonUrl: 'https://example.com',
      theme: 'light',
    },
  },
};