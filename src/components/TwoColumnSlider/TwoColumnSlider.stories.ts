import type { Meta, StoryObj } from '@storybook/react';
import TwoColumnSlider from '@/components/TwoColumnSlider/TwoColumnSlider';

// Mock data for TwoColumnSlider component
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

const mockUpdatedTwoColumnSliderContent = {
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
  icon: mockSanityImage,
  title: 'Our Services',
  body: 'Discover what we can do for you',
  slides: [
    {
      title: 'Web Development',
      subtitle: 'Full-Stack Solutions',
      desc: mockRichTextContent,
      image: mockSanityImage,
    },
    {
      title: 'UI/UX Design',
      subtitle: 'User-Centered Design',
      desc: mockRichTextContent,
      image: mockSanityImage,
    },
    {
      title: 'Mobile Apps',
      subtitle: 'Cross-Platform Development',
      desc: mockRichTextContent,
      image: mockSanityImage,
    },
    {
      title: 'Consulting',
      subtitle: 'Technical Strategy',
      desc: mockRichTextContent,
      image: mockSanityImage,
    },
  ],
};

const meta: Meta<typeof TwoColumnSlider> = {
  title: 'Components/Slider/TwoColumnSlider',
  component: TwoColumnSlider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A sophisticated two-column slider component with smooth transitions, custom navigation arrows, and responsive design. Features dynamic content with images and rich text descriptions.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'TwoColumnSlider component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockUpdatedTwoColumnSliderContent,
  },
};

export const SingleSlide: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      slides: [mockUpdatedTwoColumnSliderContent.slides[0]],
    },
  },
};

export const TwoSlides: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      slides: mockUpdatedTwoColumnSliderContent.slides.slice(0, 2),
    },
  },
};

export const ManySlides: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      slides: [
        ...mockUpdatedTwoColumnSliderContent.slides,
        {
          title: 'Additional Service',
          subtitle: 'Extra Solutions',
          desc: mockUpdatedTwoColumnSliderContent.slides[0].desc,
          image: mockSanityImage,
        },
        {
          title: 'Premium Support',
          subtitle: '24/7 Assistance',
          desc: mockUpdatedTwoColumnSliderContent.slides[1].desc,
          image: mockSanityImage,
        },
      ],
    },
  },
};

export const NoImages: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      slides: mockUpdatedTwoColumnSliderContent.slides.map(slide => ({
        ...slide,
        image: undefined,
      })),
    },
  },
};

export const DifferentColors: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      colors: ['#FF8A80', '#80CBC4', '#9FA8DA', '#C5E1A5'],
    },
  },
};

export const NoIcon: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      icon: undefined,
    },
  },
};

export const LongContent: Story = {
  args: {
    content: {
      ...mockUpdatedTwoColumnSliderContent,
      title: 'This is a very long title that demonstrates how the component handles extensive text content while maintaining proper layout and typography',
      body: 'This is also a longer body text that shows how the component adapts to different content lengths and ensures readability across various screen sizes.',
      slides: mockUpdatedTwoColumnSliderContent.slides.map(slide => ({
        ...slide,
        title: `${slide.title} - Extended Version with Much Longer Text`,
        subtitle: `${slide.subtitle} - With Additional Context and Information`,
      })),
    },
  },
};