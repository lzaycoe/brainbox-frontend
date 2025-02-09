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

import NavigationBar from '../../commons/learners/NavigationBar';
import Profile from '../../commons/learners/Profile';
import React from 'react';

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

export default function ProfileSettings() {
	return (
		<div className="bg-white min-h-screen">
			{/* Profile Header */}
			<Profile />

			{/* Navigation */}
			<NavigationBar />

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 py-8">
				<h2 className="text-xl font-medium mb-8">Account settings</h2>

				<div className="grid grid-cols-[280px,1fr] gap-8">
					{/* Left Column - Photo Uploader */}
					<ProfilePhotoUploader />

					{/* Right Column - Forms */}
					<div className="space-y-8">
						<ProfileForm />

						{/* Password Change Section */}
						<div className="mt-12">
							<h2 className="text-xl font-medium mb-8">Change password</h2>
							<PasswordChangeForm />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
