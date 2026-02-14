import type { Meta, StoryObj } from '@storybook/react';
import GridLinksCarousel from '@/components/GridLinksCarousel/GridLinksCarousel';

// Mock data for GridLinksCarousel component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockGridLinksCarouselContent = {
  title: 'Featured Projects',
  items: [
    {
      title: 'Project One',
      description: 'A comprehensive web application',
      image: mockSanityImage,
      link: '/project-one',
    },
    {
      title: 'Project Two',
      description: 'Mobile-first responsive design',
      image: mockSanityImage,
      link: '/project-two',
    },
    {
      title: 'Project Three',
      description: 'E-commerce platform solution',
      image: mockSanityImage,
      link: '/project-three',
    },
  ],
};

const meta: Meta<typeof GridLinksCarousel> = {
  title: 'Components/Carousel/GridLinksCarousel',
  component: GridLinksCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A carousel component that displays a grid of linked items with images, titles, and descriptions. Perfect for showcasing projects, services, or featured content.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'GridLinksCarousel component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockGridLinksCarouselContent,
  },
};

export const ManyItems: Story = {
  args: {
    content: {
      title: 'Extensive Project Portfolio',
      items: [
        {
          title: 'E-commerce Platform',
          description: 'Full-featured online shopping experience',
          image: mockSanityImage,
          link: '/project-ecommerce',
        },
        {
          title: 'Mobile App',
          description: 'Cross-platform mobile application',
          image: mockSanityImage,
          link: '/project-mobile',
        },
        {
          title: 'Dashboard UI',
          description: 'Analytics and reporting dashboard',
          image: mockSanityImage,
          link: '/project-dashboard',
        },
        {
          title: 'Landing Page',
          description: 'High-converting marketing page',
          image: mockSanityImage,
          link: '/project-landing',
        },
        {
          title: 'Blog System',
          description: 'Content management and publishing',
          image: mockSanityImage,
          link: '/project-blog',
        },
        {
          title: 'API Integration',
          description: 'Third-party service integration',
          image: mockSanityImage,
          link: '/project-api',
        },
      ],
    },
  },
};

export const FewItems: Story = {
  args: {
    content: {
      title: 'Key Services',
      items: [
        {
          title: 'Web Development',
          description: 'Modern web applications',
          image: mockSanityImage,
          link: '/web-dev',
        },
        {
          title: 'UI/UX Design',
          description: 'User-centered design',
          image: mockSanityImage,
          link: '/design',
        },
      ],
    },
  },
};

export const LongTitles: Story = {
  args: {
    content: {
      title: 'Complex Enterprise Solutions and Services',
      items: [
        {
          title: 'Enterprise Resource Planning System Implementation',
          description: 'Comprehensive business process management and optimization solution',
          image: mockSanityImage,
          link: '/project-erp',
        },
        {
          title: 'Customer Relationship Management Platform',
          description: 'Advanced CRM with analytics and automation capabilities',
          image: mockSanityImage,
          link: '/project-crm',
        },
        {
          title: 'Business Intelligence and Data Visualization Suite',
          description: 'Real-time reporting and predictive analytics dashboard',
          image: mockSanityImage,
          link: '/project-bi',
        },
      ],
    },
  },
};

export const NoTitle: Story = {
  args: {
    content: {
      items: mockGridLinksCarouselContent.items,
    },
  },
};

export const ShortDescriptions: Story = {
  args: {
    content: {
      title: 'Quick Links',
      items: [
        {
          title: 'Portfolio',
          description: 'View work',
          image: mockSanityImage,
          link: '/portfolio',
        },
        {
          title: 'About',
          description: 'Learn more',
          image: mockSanityImage,
          link: '/about',
        },
        {
          title: 'Contact',
          description: 'Get in touch',
          image: mockSanityImage,
          link: '/contact',
        },
      ],
    },
  },
};

export const ExternalLinks: Story = {
  args: {
    content: {
      title: 'External Resources',
      items: [
        {
          title: 'GitHub Profile',
          description: 'View open source contributions',
          image: mockSanityImage,
          link: 'https://github.com/krupaul',
        },
        {
          title: 'LinkedIn Profile',
          description: 'Professional networking',
          image: mockSanityImage,
          link: 'https://linkedin.com/in/krupaul',
        },
        {
          title: 'Design Portfolio',
          description: 'Creative work showcase',
          image: mockSanityImage,
          link: 'https://dribbble.com/krupaul',
        },
      ],
    },
  },
};