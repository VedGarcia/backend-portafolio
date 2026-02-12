import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'center',
      },
      {
        name: 'medium',
        width: 800,
        height: 800,
        position: 'center',
      },
      {
        name: 'large',
        width: 1200,
        height: 1200,
        position: 'center',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/*',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo (Alt)',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
}
