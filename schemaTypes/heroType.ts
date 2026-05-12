import {defineType, defineField} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})