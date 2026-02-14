import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const textImageButton = defineType({
  name: 'textImageButton',
  title: 'Text Image Button',
  type: 'document',
  components: {preview: ComponentName('Text Image Button')},
  preview: {
    select: {
      title: 'title',
    },
  },    
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'This component shows a button with text and an image.',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Title of the component, only for reference.',
    }),
    defineField({
      title: 'Text Body',
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        accept: 'image/webp',
      },
      description: 'Accept only .webp format image.',
      fields: [
        {
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
    }),
    defineField({
      name: 'mediaPosition',
      type: 'string',
      description: 'Description here',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        }),
        defineField({
          name: 'newTab',
          title: 'Open in new tab ?',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'theme',
      type: 'string',
      description: 'Description here',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
})