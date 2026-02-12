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
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría',
      required: true,
      hasMany: false,
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
