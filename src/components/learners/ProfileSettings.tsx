/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
'use client';

import NavigationBar from '../commons/learners/NavigationBar';
import Profile from '../commons/learners/Profile';

import PasswordChangeForm from './PasswordChangeForm';
import ProfileForm from './ProfileForm';
import ProfilePhotoUploader from './ProfilePhotoUploader';

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

export default function StudentSettings() {
	return (
		<div className="bg-white min-h-screen">
			<div className="w-full mx-auto px-4">
				<Profile />
				<NavigationBar />
				<main className="max-w-4xl mx-auto pb-16">
					<h2 className="text-2xl font-semibold mb-8">Account settings</h2>
					<div className="grid grid-cols-[300px,1fr] gap-8">
						<ProfilePhotoUploader />
						<div>
							<ProfileForm />
							<div className="my-12 border-t border-gray-200"></div>
							<h2 className="text-2xl font-semibold mb-8">Change password</h2>
							<PasswordChangeForm />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
