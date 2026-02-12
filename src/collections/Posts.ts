import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del Artículo',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL amigable (Slug)',
      required: true,
      unique: true,
      admin: {
        description: 'Ejemplo: que-es-ssr (se usa para la ruta en el navegador)',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Server Side Rendering (SSR)', value: 'ssr' },
        { label: 'Static Site Generation (SSG)', value: 'ssg' },
        { label: 'Incremental Static Regeneration (ISR)', value: 'isr' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido del Artículo',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Fecha de Publicación',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Principal',
    },
  ],
}
