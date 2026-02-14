import {defineField, defineType} from 'sanity'
import {ComponentName} from '../../sanity/schemaTypes/preview/ComponentName'

export const textAndImage = defineType({
  name: 'textAndImage',
  title: 'TextAndImage',
  type: 'document',
  components: {preview: ComponentName('TextAndImage')},
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
      rows: 2,
      readOnly: true,
      initialValue: 'ส่วนประกอบนี้ มี 1 รูปภาพ และ 1 ข้อความ',
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Reference Only | ใช้อ้างอิงเท่านั้น'
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
      name: 'imgPosition',
      type: 'string',
      description: 'Description here',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      title: 'Content',
      description: 'Content here | ข้อความที่ต้องการแสดง',
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'theme',
      type: 'string',
      description: 'Description here',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    // defineField({
    //   // should match 'languageField' plugin configuration setting, if customized
    //   name: 'language',
    //   type: 'string',
    //   readOnly: true,
    //   hidden: true,
    // })
  ],
})