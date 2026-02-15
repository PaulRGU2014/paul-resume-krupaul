import type { Meta, StoryObj } from '@storybook/react';
import SubscriptionForm from '@/components/SubscriptionForm/SubscriptionForm';

// Mock data for SubscriptionForm component
const mockSubscriptionFormContent = {
  title: 'Stay Updated',
  subtitle: 'Subscribe to our newsletter for the latest updates',
  placeholder: 'Enter your email address',
  submit_text: 'Subscribe',
};

const meta: Meta<typeof SubscriptionForm> = {
  title: 'Components/Forms/SubscriptionForm',
  component: SubscriptionForm,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A newsletter subscription form component with reCAPTCHA integration. Features email validation, multiple status states, and API integration for subscription management.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'SubscriptionForm content configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockSubscriptionFormContent,
  },
};

export const WithoutContent: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    content: {
      ...mockSubscriptionFormContent,
      title: 'Join Our Community',
      subtitle: 'Get exclusive updates and insights delivered to your inbox',
      placeholder: 'Your email address',
      submit_text: 'Join Now',
    },
  },
};

export const MinimalVersion: Story = {
  args: {
    content: {
      title: 'Newsletter',
      subtitle: 'Stay updated',
      placeholder: 'Email',
      submit_text: 'Subscribe',
    },
  },
};