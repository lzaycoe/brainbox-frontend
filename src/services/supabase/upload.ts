import { createClient } from '@/services/supabase/client';

const supabase = createClient();

export const uploadImage = async (file: File): Promise<string | null> => {
	const timestamp = Date.now();
	const fileName = `${timestamp}-${file.name}`;

	const { error } = await supabase.storage
		.from('course-thumbnails')
		.upload(fileName, file);

	if (error) {
		console.error('Failed to upload thumbnail:', error);
		return null;
	}

	const publicUrl = supabase.storage
		.from('course-thumbnails')
		.getPublicUrl(fileName).data.publicUrl;

	return publicUrl;
};

export const uploadAttachment = async (file: File): Promise<string | null> => {
	const timestamp = Date.now();
	const fileName = `${timestamp}-${file.name}`;

	const { error } = await supabase.storage
		.from('lecture-attachments')
		.upload(fileName, file);

	if (error) {
		console.error('Failed to upload attachment:', error);
		return null;
	}

	const publicUrl = supabase.storage
		.from('lecture-attachments')
		.getPublicUrl(fileName).data.publicUrl;

	return publicUrl;
};
