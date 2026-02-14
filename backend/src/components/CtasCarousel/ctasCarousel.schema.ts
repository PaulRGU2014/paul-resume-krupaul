import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const ctasCarousel = defineType({
  name: 'ctasCarousel',
  title: 'CTAs Carousel',
  type: 'document',
  components: {preview: ComponentName('CTAs Carousel')},
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
      initialValue: 'This component is used to create a carousel of CTAs (Call to Actions) with a title, description, and link.',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'hasSubtitle',
              title: 'Has subtitle ?',
              type: 'boolean',
              initialValue: false,  
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              hidden: ({ parent }) => !parent?.hasSubtitle,
            }),
            defineField({
              name: 'hasDate',
              title: 'Has date ?',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              hidden: ({ parent }) => !parent?.hasDate,
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                {type: 'block'},
                {type: 'image', options: {accept: 'image/webp'}},
              ],
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
          ],
        },
      ],
    }),
    // defineField({
    //   name: 'theme',
    //   type: 'string',
    //   options: {
    //     list: ['light', 'dark'],
    //     layout: 'radio',
    //   },
    //   initialValue: 'light',
    // }),
  ],
})