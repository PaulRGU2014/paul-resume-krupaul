import type { Meta, StoryObj } from '@storybook/react';
import TextTwoImages from '@/components/TextTwoImages/TextTwoImages';

// Mock data for TextTwoImages component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockTextTwoImagesContent = {
  title: 'Two Image Layout',
  text: [
    {
      _key: 'text1',
      _type: 'block',
      children: [
        {
          _key: 'text1_1',
          _type: 'span',
          marks: [],
          text: 'Showcase your content with dual image presentation for maximum visual impact and enhanced storytelling capabilities.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
  image1: mockSanityImage,
  image2: { ...mockSanityImage, alt: 'Second mock image' },
  layout: 'side-by-side',
};

const meta: Meta<typeof TextTwoImages> = {
  title: 'Components/Media/TextTwoImages',
  component: TextTwoImages,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible component that displays text content alongside two images. Features customizable alignment, responsive layout, and support for rich text content.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'TextTwoImages component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockTextTwoImagesContent,
  },
};

export const LeftAligned: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      text_align: 'left',
    },
  },
};

export const CenterAligned: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      text_align: 'center',
    },
  },
};

export const RightAligned: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      text_align: 'right',
    },
  },
};

export const LongContent: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      title: 'This is a much longer title that demonstrates how the component handles extensive text content while maintaining proper typography and visual balance',
      text: [
        {
          _key: 'long1',
          _type: 'block',
          children: [
            {
              _key: 'long1_1',
              _type: 'span',
              marks: [],
              text: 'This is a significantly longer text block that showcases how the TextTwoImages component handles extensive content. The component should maintain proper spacing, readability, and visual hierarchy even with longer text passages.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
        {
          _key: 'long2',
          _type: 'block',
          children: [
            {
              _key: 'long2_1',
              _type: 'span',
              marks: [],
              text: 'Additional paragraphs help demonstrate how multiple text blocks are rendered and spaced within the component layout, ensuring that the two accompanying images complement rather than overwhelm the textual content.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
    },
  },
};

export const MinimalContent: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      title: 'Simple',
      text: [
        {
          _key: 'minimal',
          _type: 'block',
          children: [
            {
              _key: 'minimal_1',
              _type: 'span',
              marks: [],
              text: 'Brief content.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
    },
  },
};

export const DifferentImages: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      image1: {
        ...mockSanityImage,
        alt: 'First alternative image',
      },
      image2: {
        ...mockSanityImage,
        alt: 'Second alternative image',
      },
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    content: {
      ...mockTextTwoImagesContent,
      title: '',
    },
  },
};