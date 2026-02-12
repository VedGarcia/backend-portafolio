import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
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
        label: 'Título del Proyecto',
        required: true,
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Imagen del Proyecto',
        required: true,
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Descripción breve',
    },
    {
        name: 'link',
        type: 'text',
        label: 'Enlace del Proyecto (github o pagina web)',
    },
  ]
}