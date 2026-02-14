import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const textTwoImages = defineType({
  name: 'textTwoImages',
  title: 'Text Two Images',
  type: 'document',
  components: {preview: ComponentName('Text Two Images')},
  preview: {
    select: {
      title: 'title',
    },
  },    
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
    defineField({
      name: 'image1',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'image2',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
})