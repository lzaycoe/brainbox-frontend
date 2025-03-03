import { createClient } from '@/services/supabase/client';

const supabase = createClient();

export const deleteImage = async (imageUrl: string): Promise<void> => {
	try {
		const fileName = imageUrl.split('/').pop();
		if (!fileName) {
			throw new Error('Invalid image URL');
		}

		const { error } = await supabase.storage
			.from('course-thumbnails')
			.remove([fileName]);

		if (error) {
			console.error('Failed to delete old thumbnail:', error);
			throw new Error('Failed to delete old thumbnail');
		}
	} catch (error) {
		console.error('Error in deleteImage:', error);
		throw error;
	}
};

export const deleteAttachment = async (
	attachmentUrl: string,
): Promise<void> => {
	try {
		const fileName = attachmentUrl.split('/').pop();
		if (!fileName) {
			throw new Error('Invalid attachment URL');
		}

		const { error } = await supabase.storage
			.from('lecture-attachments')
			.remove([fileName]);

		if (error) {
			console.error('Failed to delete old attachment:', error);
			throw new Error('Failed to delete old attachment');
		}
	} catch (error) {
		console.error('Error in deleteAttachment:', error);
		throw error;
	}
};
