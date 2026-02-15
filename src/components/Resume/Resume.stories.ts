import type { Meta, StoryObj } from '@storybook/react';
import Resume from '@/components/Resume/Resume';

// Mock data for Resume component
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

const mockUpdatedResumeContent = {
  image: mockSanityImage,
  profile_desc: 'Experienced full-stack developer with a passion for creating innovative digital solutions. Skilled in modern web technologies, UI/UX design, and project management.',
  skills: [
    { skill: 'JavaScript', level: 95, is_featured: true },
    { skill: 'React', level: 90, is_featured: true },
    { skill: 'TypeScript', level: 85, is_featured: true },
    { skill: 'Node.js', level: 80, is_featured: true },
    { skill: 'Python', level: 75, is_featured: false },
    { skill: 'CSS/SCSS', level: 90, is_featured: false },
    { skill: 'HTML', level: 95, is_featured: false },
    { skill: 'Git', level: 85, is_featured: false },
    { skill: 'Docker', level: 70, is_featured: false },
    { skill: 'AWS', level: 65, is_featured: false },
  ],
  career: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      start_date: '2022',
      end_date: 'Present',
      description: mockRichTextContent,
    },
    {
      company: 'Digital Agency',
      position: 'Full Stack Developer',
      start_date: '2020',
      end_date: '2022',
      description: mockRichTextContent,
    },
    {
      company: 'Startup Ventures',
      position: 'Junior Developer',
      start_date: '2018',
      end_date: '2020',
      description: mockRichTextContent,
    },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      start_date: '2014',
      graduation_date: '2018',
    },
    {
      school: 'Tech Bootcamp',
      degree: 'Full Stack Web Development Certificate',
      start_date: '2017',
      graduation_date: '2018',
    },
  ],
  resume_file: {
    asset: {
      _ref: 'file-resume-example-pdf',
      _type: 'reference',
    },
  },
};

const meta: Meta<typeof Resume> = {
  title: 'Components/Other/Resume',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive resume component with interactive accordions, skill bars, and download functionality. Features responsive design, collapsible sections, and detailed career information.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Resume component configuration',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockUpdatedResumeContent,
  },
};

export const FeaturedSkillsOnly: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      skills: mockUpdatedResumeContent.skills.filter(skill => skill.is_featured),
    },
  },
};

export const ExtensiveCareer: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      career: [
        ...mockUpdatedResumeContent.career,
        {
          company: 'Previous Company',
          position: 'Junior Frontend Developer',
          start_date: '2016',
          end_date: '2018',
          description: mockUpdatedResumeContent.career[0].description,
        },
        {
          company: 'First Job',
          position: 'Web Developer Intern',
          start_date: '2015',
          end_date: '2016',
          description: mockUpdatedResumeContent.career[1].description,
        },
      ],
    },
  },
};

export const MinimalExperience: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      career: [mockUpdatedResumeContent.career[0]],
      skills: mockUpdatedResumeContent.skills.slice(0, 5),
      education: [mockUpdatedResumeContent.education[0]],
    },
  },
};

export const DifferentProfile: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      image: {
        ...mockSanityImage,
        alt: 'Alternative profile picture',
      },
      profile_desc: 'Creative UI/UX designer and frontend developer with a passion for creating beautiful, functional digital experiences. Experienced in design systems, user research, and modern web technologies.',
    },
  },
};

export const LongProfile: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      profile_desc: 'Highly experienced full-stack developer with over 8 years in the industry, specializing in modern web technologies including React, Node.js, TypeScript, and cloud infrastructure. Proven track record of delivering scalable applications, leading development teams, and implementing best practices for code quality and performance optimization. Strong background in both frontend and backend development with expertise in database design, API development, and DevOps practices.',
    },
  },
};

export const HighSkillLevels: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      skills: mockUpdatedResumeContent.skills.map(skill => ({
        ...skill,
        level: Math.max(skill.level, 85), // Boost all skills to at least 85%
      })),
    },
  },
};

export const MixedSkillLevels: Story = {
  args: {
    content: {
      ...mockUpdatedResumeContent,
      skills: [
        { skill: 'Expert Level', level: 95, is_featured: true },
        { skill: 'Advanced Level', level: 80, is_featured: true },
        { skill: 'Intermediate Level', level: 65, is_featured: false },
        { skill: 'Beginner Level', level: 35, is_featured: false },
        { skill: 'Learning', level: 15, is_featured: false },
      ],
    },
  },
};