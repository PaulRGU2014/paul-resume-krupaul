import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Menus',
  type: 'document',
  fields: [
    defineField({
      name: 'menu_name',
      title: 'Menu Version',
      type: 'string',
    }),
    defineField({
      name: 'menu_list',
      title: 'Menu List',
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
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
                defineField({
                  name: 'is_external',
                  title: 'External Link?',
                  type: 'boolean',
                  initialValue: false,
                  hidden: ({parent}) => !parent?.url,
                }),
              ],
            }),
            defineField({
              name: 'sub_menus_1',
              title: 'Sub Menus Level 1',
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
                      name: 'link',
                      title: 'Link',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'url',
                          title: 'URL',
                          type: 'string',
                        }),
                        defineField({
                          name: 'is_external',
                          title: 'External Link?',
                          type: 'boolean',
                          initialValue: false,
                          hidden: ({parent}) => !parent?.url,
                        }),
                      ],
                    }),
                    defineField({
                      name: 'sub_menus_2',
                      title: 'Sub Menus Level 2',
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
                              name: 'link',
                              title: 'Link',
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'url',
                                  title: 'URL',
                                  type: 'string',
                                }),
                                defineField({
                                  name: 'is_external',
                                  title: 'External Link?',
                                  type: 'boolean',
                                  initialValue: false,
                                  hidden: ({parent}) => !parent?.url,
                                }),
                              ],
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                }
              ],
            }),
          ],
        }
      ],
    }),
    defineField({
      name: 'menu_btn',
      title: 'Menu Button',
      type: 'object',
      fields: [
        defineField({
          name: 'btn_text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'btn_url',
          title: 'Button URL',
          type: 'string',
        }),
        defineField({
          name: 'is_external',
          title: 'External Link?',
          type: 'boolean',
          initialValue: false,
          hidden: ({parent}) => !parent?.btn_url,
        })
      ],
    }),
  ],
})