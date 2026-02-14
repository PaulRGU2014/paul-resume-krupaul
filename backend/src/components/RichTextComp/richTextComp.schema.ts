import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const richTextComp = defineType({
  name: 'richTextComp',
  title: 'Rich-Text Component',
  type: 'document',
  components: {preview: ComponentName('Rich-Text Component')},
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
      name: 'maxWidth',
      title: 'Max Width',
      type: 'number',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'text_align',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'isFullHeight',
      title: 'Full Height',
      type: 'boolean',
      initialValue: false,
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