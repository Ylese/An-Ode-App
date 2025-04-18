const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djgpzblgl/image/upload';
const UPLOAD_PRESET = 'clothing_upload';

const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();

  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg', 
    name: 'upload.jpg',
  });
  data.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || 'Cloudinary upload failed');
    }

    return result.secure_url;
  } catch (err) {
    console.error('Upload error:', err.message);
    throw err;
  }
};

export default uploadToCloudinary;
