import type { Meta, StoryObj } from '@storybook/react';
import GalleryCollage from '@/components/GalleryCollage/GalleryCollage';

// Mock data for GalleryCollage component
const mockSanityImage = {
  asset: {
    _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    _type: 'reference',
  },
  alt: 'Mock image alt text',
  title: 'Mock image title',
};

const mockUpdatedGalleryCollageContent = {
  for_component: 'galleryCollage',
  images: [
    { ...mockSanityImage, alt: 'Gallery image 1' },
    { ...mockSanityImage, alt: 'Gallery image 2' },
    { ...mockSanityImage, alt: 'Gallery image 3' },
    { ...mockSanityImage, alt: 'Gallery image 4' },
    { ...mockSanityImage, alt: 'Gallery image 5' },
    { ...mockSanityImage, alt: 'Gallery image 6' },
  ],
};

const mockUpdatedSquareLogosContent = {
  for_component: 'squareLogos',
  logos: [
    { ...mockSanityImage, alt: 'Company logo 1' },
    { ...mockSanityImage, alt: 'Company logo 2' },
    { ...mockSanityImage, alt: 'Company logo 3' },
    { ...mockSanityImage, alt: 'Company logo 4' },
  ],
};

const meta: Meta<typeof GalleryCollage> = {
  title: 'Components/Gallery/GalleryCollage',
  component: GalleryCollage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A versatile gallery component that can display images in collage format or square logos. Supports different layouts and configurations based on the component type.',
      },
    },
  },
  argTypes: {
    for_component: {
      control: 'select',
      options: ['galleryCollage', 'squareLogos'],
      description: 'Component variant to render',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCollage: Story = {
  args: mockUpdatedGalleryCollageContent,
};

export const SquareLogos: Story = {
  args: mockUpdatedSquareLogosContent,
};

export const FewImages: Story = {
  args: {
    ...mockUpdatedGalleryCollageContent,
    images: mockUpdatedGalleryCollageContent.images.slice(0, 3),
  },
};

export const ManyImages: Story = {
  args: {
    ...mockUpdatedGalleryCollageContent,
    images: [
      ...mockUpdatedGalleryCollageContent.images,
      ...mockUpdatedGalleryCollageContent.images.map((img, index) => ({
        ...img,
        alt: `Gallery image ${index + 7}`,
      })),
    ],
  },
};

export const FewLogos: Story = {
  args: {
    ...mockUpdatedSquareLogosContent,
    logos: mockUpdatedSquareLogosContent.logos.slice(0, 2),
  },
};

export const ManyLogos: Story = {
  args: {
    ...mockUpdatedSquareLogosContent,
    logos: [
      ...mockUpdatedSquareLogosContent.logos,
      ...mockUpdatedSquareLogosContent.logos.map((logo, index) => ({
        ...logo,
        alt: `Company logo ${index + 5}`,
      })),
      ...mockUpdatedSquareLogosContent.logos.map((logo, index) => ({
        ...logo,
        alt: `Partner logo ${index + 1}`,
      })),
    ],
  },
};

export const InvalidComponent: Story = {
  args: {
    for_component: 'unknown',
  },
};