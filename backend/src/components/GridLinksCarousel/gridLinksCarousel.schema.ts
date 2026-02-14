import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const gridLinksCarousel = defineType({
  name: 'gridLinksCarousel',
  title: 'Grid Links Carousel',
  type: 'document',
  components: {preview: ComponentName('Grid Links Carousel')},
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
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              type: 'text',
            }),
            defineField({
              name: 'link',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
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
          ],
        },
      ],
    }),
  ],
})