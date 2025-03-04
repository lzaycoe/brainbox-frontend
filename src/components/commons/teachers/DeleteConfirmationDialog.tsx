import { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteConfirmationDialogProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onConfirm: () => void;
	trigger: ReactNode;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
	isOpen,
	onOpenChange,
	onConfirm,
	trigger,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm Deletion</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<p>Are you sure you want to delete this section?</p>
					<div className="flex justify-end gap-2">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button variant="destructive" onClick={onConfirm}>
							Delete
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmationDialog;
