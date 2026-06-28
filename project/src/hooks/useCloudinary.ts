import { useState } from 'react';

export default function useCloudinary() {
  const [uploading, setUploading] = useState(false);

  async function uploadFiles(files: FileList | File[]) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary ist nicht konfiguriert.');
    }

    setUploading(true);
    try {
      const uploads = Array.from(files).map(async (file) => {
        const form = new FormData();
        form.append('file', file);
        form.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
          method: 'POST',
          body: form,
        });

        if (!response.ok) {
          throw new Error('Cloudinary Upload fehlgeschlagen.');
        }

        const data = await response.json();
        return data.secure_url as string;
      });

      return Promise.all(uploads);
    } finally {
      setUploading(false);
    }
  }

  return { uploading, uploadFiles };
}
