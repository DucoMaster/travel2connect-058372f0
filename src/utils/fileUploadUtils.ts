
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file: File, userId: string) => {
  try {
    // Generate a unique filename with user ID and original filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('promo-images')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('promo-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (fileUrl: string) => {
  try {
    // Extract the filename from the URL
    const filename = fileUrl.split('/').pop();
    
    const { error } = await supabase.storage
      .from('promo-images')
      .remove([filename || '']);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
