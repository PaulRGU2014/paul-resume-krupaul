import type { Meta, StoryObj } from '@storybook/react';
import TextAndImage from '@/components/TextAndImage/TextAndImage';

// Mock data for TextAndImage component
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
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is a third paragraph with some ',
      },
      {
        _type: 'span',
        text: 'bold text',
        marks: ['strong'],
      },
      {
        _type: 'span',
        text: ' and some ',
      },
      {
        _type: 'span',
        text: 'italic text',
        marks: ['em'],
      },
      {
        _type: 'span',
        text: ' to show text formatting.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
];

const mockTextAndImageContent = {
  body: mockRichTextContent,
  image: mockSanityImage,
  theme: 'light',
  imgPosition: 'left',
};

const mockTextAndImageContentRight = {
  body: mockRichTextContent,
  image: mockSanityImage,
  theme: 'light',
  imgPosition: 'right',
};

const mockTextAndImageContentDark = {
  body: mockRichTextContent,
  image: mockSanityImage,
  theme: 'dark',
  imgPosition: 'left',
};

const meta: Meta<typeof TextAndImage> = {
  title: 'Components/Media/TextAndImage',
  component: TextAndImage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible component that displays rich text content alongside an image. Supports different themes and image positioning.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'TextAndImage component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockTextAndImageContent,
  },
};

export const ImageRight: Story = {
  args: {
    content: mockTextAndImageContentRight,
  },
};

export const DarkTheme: Story = {
  args: {
    content: mockTextAndImageContentDark,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const DarkThemeImageRight: Story = {
  args: {
    content: {
      body: mockRichTextContent,
      image: mockSanityImage,
      theme: 'dark',
      imgPosition: 'right',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const ShortContent: Story = {
  args: {
    content: {
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'This is a shorter text content example to show how the component adapts to different content lengths.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      image: mockSanityImage,
      theme: 'light',
      imgPosition: 'left',
    },
  },
};

export const LongContent: Story = {
  args: {
    content: {
      body: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'This is a much longer text content example that demonstrates how the TextAndImage component handles extensive content.',
            },
          ],
          markDefs: [],
          style: 'h2',
        },
        ...mockRichTextContent,
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Additional paragraph to show extended content capabilities. This helps demonstrate the component\'s flexibility in handling various content lengths and formatting options.',
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
              text: 'Final paragraph with concluding thoughts and call-to-action elements.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      image: mockSanityImage,
      theme: 'light',
      imgPosition: 'left',
    },
  },
};

export const NoImage: Story = {
  args: {
    content: {
      body: mockRichTextContent,
      image: {
        asset: null,
      },
      theme: 'light',
      imgPosition: 'left',
    },
  },
};