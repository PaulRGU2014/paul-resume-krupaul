import {defineField, defineType} from 'sanity'
import {ComponentName} from './preview/ComponentName'

export const hardcodedBlocks = defineType({
  name: 'hardcodedBlocks',
  title: 'Hardcoded Blocks',
  type: 'document',
  components: {preview: ComponentName('Hardcoded Blocks')},
  preview: {
    select: {
      title: 'block_title',
    },
  },      
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'Hardcoded blocks are components that are not created in the CMS, but are hardcoded into the frontend. This document type is used to render these components.',
    }),
    defineField({
      title: 'Block Name',
      description: 'The name of the hardcoded block will be provided by the frontend team.',
      name: 'block_title',
      type: 'string',
    }),
  ],
})
  