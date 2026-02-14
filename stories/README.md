# Storybook Integration Guide

This document provides a comprehensive guide to the Storybook integration for the KruPaul website project.

## Overview

Storybook has been integrated to provide:
- **Component Development**: Isolated component development and testing
- **Design System**: Visual showcase of all components with variations
- **Content Preview**: Preview components with different Sanity data configurations
- **Documentation**: Automatic component documentation with controls and examples

## Getting Started

### Running Storybook

```bash
# Make sure you're using the correct Node version
nvm use

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

Storybook will be available at `http://localhost:6006`

## Project Structure

```
frontend/
├── .storybook/
│   ├── main.ts                 # Main Storybook configuration
│   ├── preview.ts              # Global preview settings
│   └── decorators/
│       ├── withNextjsMocks.tsx # Next.js feature mocking
│       └── withSanityMocks.tsx # Sanity CMS mocking
├── stories/
│   ├── mock-data/
│   │   └── index.ts            # Mock data for all components
│   └── components/
│       ├── RichTextComp.stories.ts
│       ├── Hero.stories.ts
│       ├── TextAndImage.stories.ts
│       ├── TextImageButton.stories.ts
│       ├── GridLinksCarousel.stories.ts
│       └── CtaTitleImg.stories.ts
```

## Configuration Features

### Next.js Integration

- **Path Aliases**: `@/*` paths work exactly like in your main app
- **SCSS Modules**: Full support for your existing `.module.scss` files
- **Image Optimization**: Mock implementation of `next/image` component
- **Router Mocking**: `usePathname`, `useRouter`, and other Next.js hooks are mocked

### Sanity Integration

- **Mock Data**: Realistic mock data that matches your Sanity schema types
- **Image Handling**: Automatic conversion of Sanity image refs to placeholder images
- **Rich Text**: Full support for Sanity's portable text format
- **Schema Alignment**: Mock data structure matches your actual Sanity configuration

### Styling Integration

- **Global Styles**: Your `global.scss` and `normalize.css` are automatically loaded
- **SCSS Variables**: All your color variables and mixins are available
- **Responsive Testing**: Built-in viewport controls matching your breakpoints:
  - `xs`: ≤360px
  - `sm`: 361px-480px
  - `md`: 481px-768px
  - `lg`: 769px-920px
  - `xl`: 921px-1100px
  - `xxl`: ≥1101px
  - `desktop`: 1440px

## Component Stories

### Story Organization

Stories are organized by component category:

- **`Components/Hero/`**: Hero components (Hero, HeroBannerImg, FullPageHero, etc.)
- **`Components/Media/`**: Media components (TextAndImage, TextImageButton, etc.)
- **`Components/Carousel/`**: Carousel components (GridLinksCarousel, CtasCarousel)
- **`Components/Other/`**: Utility components (RichTextComp, Resume, etc.)

### Story Variations

Each component includes multiple story variations:

- **Default**: Standard component with typical content
- **Theme Variations**: Light and dark theme examples
- **Content Variations**: Different content lengths and types
- **Layout Variations**: Different positioning and layout options
- **Edge Cases**: Empty content, missing data, extreme values

### Controls and Interactions

- **Automatic Controls**: Storybook automatically generates controls for component props
- **Custom Controls**: Enhanced controls for complex Sanity data structures
- **Actions**: Interactive elements (buttons, links) are logged in the Actions panel
- **Documentation**: Auto-generated docs with prop tables and examples

## Mock Data System

### Available Mock Data

The mock data system provides realistic content for all components:

```typescript
// Basic building blocks
mockSanityImage          // Standard image object
mockRichTextContent      // Rich text with formatting
themeVariations         // Light/dark theme options
layoutVariations        // Layout position options

// Component-specific mock data
mockHeroContent
mockTextAndImageContent
mockTextImageButtonContent
mockGridLinksCarouselContent
mockCtaTitleImgContent
// ... and more
```

### Creating Custom Mock Data

To create mock data for new components:

```typescript
// In stories/mock-data/index.ts
export const mockYourComponentContent = {
  // Match your component's prop structure
  title: 'Your Component Title',
  content: mockRichTextContent,
  image: mockSanityImage,
  theme: 'light',
  // ... other props
};
```

### Using Mock Data in Stories

```typescript
import { mockYourComponentContent } from '../mock-data';

export const Default: Story = {
  args: {
    content: mockYourComponentContent,
  },
};

export const CustomVariation: Story = {
  args: {
    content: {
      ...mockYourComponentContent,
      theme: 'dark',
      // Override specific properties
    },
  },
};
```

## Creating New Stories

### Basic Story Template

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from '@/components/YourComponent/YourComponent';
import { mockYourComponentContent } from '../mock-data';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'fullscreen', // or 'padded', 'centered'
    docs: {
      description: {
        component: 'Description of your component functionality.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Component configuration object',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: mockYourComponentContent,
  },
};
```

### Advanced Story Features

```typescript
// Dark theme with background
export const DarkTheme: Story = {
  args: {
    content: { ...mockYourComponentContent, theme: 'dark' },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Custom viewport
export const MobileView: Story = {
  args: {
    content: mockYourComponentContent,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// With play function for interactions
export const WithInteractions: Story = {
  args: {
    content: mockYourComponentContent,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

## Best Practices

### Story Naming

- Use descriptive names that explain the variation
- Start with `Default` for the standard implementation
- Use `DarkTheme`, `LightTheme` for theme variations
- Use descriptive names like `LongContent`, `ShortContent`, `NoImage`

### Mock Data Guidelines

- Keep mock data realistic and representative
- Include edge cases (empty, null, very long content)
- Match your actual Sanity schema structure
- Use consistent naming conventions

### Component Testing

- Test all theme variations
- Test different content lengths
- Test responsive behavior across viewports
- Test interactive elements (buttons, links)
- Test edge cases and error states

### Documentation

- Add component descriptions to meta configuration
- Use story descriptions for complex variations
- Document any special setup or considerations
- Include usage examples in story descriptions

## Troubleshooting

### Common Issues

1. **Module Not Found Errors**
   - Ensure path aliases are correctly configured in `.storybook/main.ts`
   - Check that the component imports use the correct paths

2. **SCSS Not Loading**
   - Verify SCSS loader configuration in webpack settings
   - Check that global styles are imported in `preview.ts`

3. **Images Not Displaying**
   - Mock images use placeholder URLs by default
   - Update `mockSanityImage` objects for custom placeholder images

4. **Component Not Rendering**
   - Check that all required props are provided in story args
   - Verify mock data structure matches component expectations

### Development Tips

- Use the **Controls** panel to experiment with different prop values
- Use the **Actions** panel to monitor component interactions
- Use the **Viewport** toolbar to test responsive behavior
- Use the **Backgrounds** toolbar to test theme variations

## Integration with Sanity

The Storybook setup is designed to work seamlessly with your Sanity CMS configuration:

- Mock data structure matches your Sanity schema types
- Image handling mimics your actual Sanity image pipeline
- Rich text content uses the same portable text format
- Component variations reflect your actual Sanity field configurations

This allows content creators and designers to preview how components will look with different data configurations before publishing content.

## Future Enhancements

Potential improvements to consider:

- **Visual Regression Testing**: Add Chromatic or similar for visual testing
- **A11y Testing**: Enhanced accessibility testing with addon-a11y
- **Performance Testing**: Monitor component performance with addon-performance
- **Real Data Integration**: Optional connection to actual Sanity data for testing
- **Design Tokens**: Integration with design token system
- **Component Generator**: Automated story generation for new components

## Contributing

When adding new components to the project:

1. Create corresponding stories in the appropriate category
2. Add necessary mock data to `stories/mock-data/index.ts`
3. Include multiple variations (theme, content, layout)
4. Test across different viewports
5. Add comprehensive documentation
6. Update this README if adding new patterns or conventions