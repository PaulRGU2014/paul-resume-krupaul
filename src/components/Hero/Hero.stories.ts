import type { Meta, StoryObj } from '@storybook/react';
import Hero from '@/components/Hero/Hero';

// Mock data for Hero component
const mockHeroContent = {
  title: 'Welcome to KruPaul',
  subtitle: 'Full-Stack Developer & Creative Professional',
};

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main Hero component with animated bricks background and content display. Features dynamic brick animations and responsive design.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Hero content configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockHeroContent,
  },
};

export const LongTitle: Story = {
  args: {
    content: {
      title: 'Welcome to KruPaul - Full-Stack Developer & Creative Professional',
      subtitle: 'Crafting digital experiences with modern technologies',
    },
  },
};

export const ShortContent: Story = {
  args: {
    content: {
      title: 'KruPaul',
      subtitle: 'Developer',
    },
  },
};

export const NoSubtitle: Story = {
  args: {
    content: {
      title: 'Welcome to KruPaul',
    },
  },
};

export const MultiWordTitle: Story = {
  args: {
    content: {
      title: 'Paul Kru Software Engineer Creative Director Design Specialist',
      subtitle: 'Building innovative solutions for the digital world',
    },
  },
};

export const EmptyContent: Story = {
  args: {
    content: {},
  },
};

// Story to demonstrate the animation states
export const AnimationPreview: Story = {
  args: {
    content: {
      title: 'Animation Demo',
      subtitle: 'Watch the bricks animate into view',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the brick animation effect that occurs when the component comes into view.',
      },
    },
  },
};