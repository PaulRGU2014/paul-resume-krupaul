import type { Meta, StoryObj } from '@storybook/react';
import CtasCarousel from '@/components/CtasCarousel/CtasCarousel';

// Mock data for CtasCarousel component
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
];

const mockCtasCarouselContent = {
  title: 'Featured Services',
  ctas: [
    {
      title: 'Web Development',
      subtitle: 'Custom Solutions',
      date: '2024',
      body: mockRichTextContent,
      link: {
        title: 'Learn More',
        url: '/web-development',
        newTab: false,
      },
    },
    {
      title: 'UI/UX Design',
      subtitle: 'User-Centered',
      date: '2024',
      body: mockRichTextContent,
      link: {
        title: 'View Portfolio',
        url: '/design',
        newTab: true,
      },
    },
    {
      title: 'Consulting',
      subtitle: 'Strategic Guidance',
      date: '2024',
      body: mockRichTextContent,
      link: {
        title: 'Get Started',
        url: '/consulting',
        newTab: false,
      },
    },
  ],
};

const meta: Meta<typeof CtasCarousel> = {
  title: 'Components/Carousel/CtasCarousel',
  component: CtasCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A carousel component for displaying multiple call-to-action items. Features navigation controls, responsive design, and customizable CTA cards with images and links.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'CtasCarousel component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockCtasCarouselContent,
  },
};

const mockCtaItem = mockCtasCarouselContent.ctas[0];

export const SingleItem: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [mockCtaItem],
    },
  },
};

export const TwoItems: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [mockCtaItem, { ...mockCtaItem, title: 'Second CTA', _key: 'cta2' }],
    },
  },
};

export const ManyItems: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [
        mockCtaItem,
        { ...mockCtaItem, title: 'Explore Projects', _key: 'cta2' },
        { ...mockCtaItem, title: 'View Portfolio', _key: 'cta3' },
        { ...mockCtaItem, title: 'Contact Me', _key: 'cta4' },
        { ...mockCtaItem, title: 'Read Blog', _key: 'cta5' },
        { ...mockCtaItem, title: 'Download Resume', _key: 'cta6' },
      ],
    },
  },
};

export const LongTitles: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [
        {
          ...mockCtaItem,
          title: 'This is a very long call-to-action title that demonstrates text wrapping',
          _key: 'cta1',
        },
        {
          ...mockCtaItem,
          title: 'Another lengthy CTA title showing responsive design',
          _key: 'cta2',
        },
        {
          ...mockCtaItem,
          title: 'Short CTA',
          _key: 'cta3',
        },
      ],
    },
  },
};

export const ExternalLinks: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [
        {
          ...mockCtaItem,
          title: 'Visit GitHub',
          link: { ...mockCtaItem.link, url: 'https://github.com' },
          _key: 'cta1',
        },
        {
          ...mockCtaItem,
          title: 'View LinkedIn',
          link: { ...mockCtaItem.link, url: 'https://linkedin.com' },
          _key: 'cta2',
        },
        {
          ...mockCtaItem,
          title: 'Check Portfolio',
          link: { ...mockCtaItem.link, url: 'https://portfolio.com' },
          _key: 'cta3',
        },
      ],
    },
  },
};

export const MixedLinkTypes: Story = {
  args: {
    content: {
      ...mockCtasCarouselContent,
      ctas: [
        mockCtaItem, // Internal URL
        {
          ...mockCtaItem,
          title: 'External Link',
          link: { ...mockCtaItem.link, url: 'https://example.com' },
          _key: 'cta2',
        },
        {
          ...mockCtaItem,
          title: 'Another Internal',
          link: { ...mockCtaItem.link, url: '/another-page' },
          _key: 'cta3',
        },
      ],
    },
  },
};