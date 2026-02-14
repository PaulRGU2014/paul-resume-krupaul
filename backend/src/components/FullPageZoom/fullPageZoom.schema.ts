import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const fullPageZoom = defineType({
  name: 'fullPageZoom',
  title: 'FullPageZoom',
  type: 'document',
  components: {preview: ComponentName('Full Page Zoom')},
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'media_source',
      title: 'Media Source',
      type: 'string',
      options: {
        list: [
          { title: 'URL', value: 'url' },
          { title: 'File', value: 'file' }
        ]
      }
    }),
    defineField({
      name: 'media_type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ]
      },
      hidden: ({ parent }) => parent?.media_source !== 'url',
    }),
    defineField({
      name: 'media_url',
      title: 'Media URL',
      type: 'url',
      description: 'For the best experience, use a video with a 16:9 aspect ratio',
      hidden: ({ parent }) => parent?.media_source !== 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'is_video_muted',
      title: 'Mute Video',
      type: 'boolean',
      hidden: ({ parent }) => parent?.media_source !== 'url' || parent?.media_type !== 'video',
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      description: 'For the best experience, use an image with a 16:9 aspect ratio',
      fields: [
        {
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
      hidden: ({ parent }) => parent?.media_source !== 'file',
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