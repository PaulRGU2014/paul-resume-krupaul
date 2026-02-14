import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const hero = defineType({
  name: 'hero',
  title: 'Basic Hero',
  type: 'document',
  components: {preview: ComponentName('Basic Hero')},
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
      name: 'subtitle',
      type: 'string',
    }),
  ],
})