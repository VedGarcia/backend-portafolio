import { GlobalConfig } from "payload";

export const Profile: GlobalConfig = {
    slug: 'profile',
    fields: [
       {
      name: 'name',
      type: 'text',
      label: 'Nombre Completo',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografía corta',
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de Perfil',
    },
    {
      name: 'socialLinks',
      type: 'group', // Agrupamos campos relacionados
      label: 'Redes Sociales',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'github', type: 'text', label: 'GitHub URL' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp Number' },
        ],
    },
    ],
    access: {
        read: () => true,
    },
}
