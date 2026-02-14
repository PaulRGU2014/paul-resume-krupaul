import type { Meta, StoryObj } from '@storybook/react';
import ContactForm from '@/components/ContactForm/ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/Forms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive contact form component with reCAPTCHA integration. Features form validation, responsive design, and integration with Formspree for form handling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Interactive: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Interactive version of the contact form showing all form states and interactions.',
      },
    },
  },
};

export const WithMockData: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    // This would be used with Storybook interactions addon
    // to simulate user interactions with the form
  },
  parameters: {
    docs: {
      description: {
        story: 'Contact form with pre-filled mock data for testing purposes.',
      },
    },
  },
};