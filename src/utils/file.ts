import { createClient } from '@/services/supabase/client';

const supabase = createClient();

interface FileMetadata {
	url: string;
	name: string;
	size: number | null;
}

export const fetchFileMetadata = async (url: string): Promise<FileMetadata> => {
	try {
		const path = url.split('/storage/v1/object/public/lecture-attachments/')[1];
		if (!path) throw new Error('Invalid URL format');

		const { data, error } = await supabase.storage
			.from('lecture-attachments')
			.download(path);

		if (error) throw error;

		const fileNameParts = path.split('-');
		const fileName = fileNameParts.slice(1).join('-') ?? path;
		return {
			url,
			name: fileName,
			size: data?.size ?? null,
		};
	} catch (error) {
		console.error(`Failed to fetch metadata for ${url}:`, error);
		return { url, name: url.split('/').pop() ?? 'Unknown file', size: null };
	}
};

export const formatFileSize = (bytes: number | null): string => {
	if (!bytes) return 'Unknown size';
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
