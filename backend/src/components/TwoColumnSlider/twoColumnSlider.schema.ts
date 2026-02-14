import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const twoColumnSlider = defineType({
  name: 'twoColumnSlider',
  title: 'TwoColumnSlider',
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
      initialValue: 'This component consists of two columns. The left column contains image of slides. The right column contains body text of the slide.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This title is for referencr only. It will not be displayed on the website.',
    }),
    // defineField({
    //   name: 'icon',
    //   title: 'Icon',
    //   type: 'image',
    //   options: {
    //     accept: 'image/webp, image/svg+xml',
    //   },
    //   description: 'Accept only .webp or .svg format image.',
    //   fields: [
    //     {
    //       name: 'alt',
    //       title: 'Image Alt Text',
    //       type: 'string',
    //       validation: Rule => Rule.required(),
    //       initialValue: 'Image alt text',
    //     },
    //   ],
    // }),
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'array',
    //   of: [{type: 'block'}],
    // }),
    defineField({
      name: 'slides',
      title: 'Slides',
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
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
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
    // defineField({
    //   name: 'colors',
    //   title: 'Colors',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   initialValue: ['#6c757d', '#03071E', '#FFBA08', '#370617', '#F48C06', '#6A040F', '#370617'],
    //   validation: Rule => Rule.length(7),
    // }),
  ],
})