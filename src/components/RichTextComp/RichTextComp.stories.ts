import type { Meta, StoryObj } from '@storybook/react';
import RichTextComp from '@/components/RichTextComp/RichTextComp';

// Mock data for RichTextComp component
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

const meta: Meta<typeof RichTextComp> = {
  title: 'Components/Other/RichTextComp',
  component: RichTextComp,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for rendering rich text content from Sanity with proper styling and formatting.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Rich text component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: {
      content: mockRichTextContent,
      theme: 'light',
      text_align: 'left',
      isFullHeight: false,
    },
  },
};

export const DarkTheme: Story = {
  args: {
    content: {
      content: mockRichTextContent,
      theme: 'dark',
      text_align: 'left',
      isFullHeight: false,
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const CenterAligned: Story = {
  args: {
    content: {
      content: mockRichTextContent,
      theme: 'light',
      text_align: 'center',
      isFullHeight: false,
    },
  },
};

export const WithMaxWidth: Story = {
  args: {
    content: {
      content: mockRichTextContent,
      theme: 'light',
      text_align: 'left',
      isFullHeight: false,
      maxWidth: 600,
    },
  },
};

export const FullHeight: Story = {
  args: {
    content: {
      content: mockRichTextContent,
      theme: 'light',
      text_align: 'center',
      isFullHeight: true,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MinimalContent: Story = {
  args: {
    content: {
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Just a simple paragraph of text.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      theme: 'light',
      text_align: 'left',
      isFullHeight: false,
    },
  },
};