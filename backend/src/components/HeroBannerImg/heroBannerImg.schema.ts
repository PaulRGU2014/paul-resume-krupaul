import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const heroBannerImg = defineType({
  name: 'heroBannerImg',
  title: 'HeroBannerImg',
  type: 'document',
  components: {preview: ComponentName('Hero Banner Image')},
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
      initialValue: 'This component is used to display a hero banner image.',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        accept: 'image/webp, image/svg+xml',
      },
      description: 'Accept only .webp and .svg format image.',
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
      name: 'is_curved',
      type: 'boolean',
      title: 'Is the banner curved?',
      description: 'Check to curve the image.',
    }),
    // defineField({
    //   name: 'theme',
    //   type: 'string',
    //   description: 'Description here',
    //   options: {
    //     list: ['light', 'dark'],
    //     layout: 'radio',
    //   },
    //   initialValue: 'light',
    // }),
  ],
})