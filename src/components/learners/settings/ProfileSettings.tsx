'use client';

import React from 'react';

import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import PasswordChangeForm from '@/components/learners/settings/PasswordChangeForm';
import ProfileForm from '@/components/learners/settings/ProfileForm';
import ProfilePhotoUploader from '@/components/learners/settings/ProfilePhotoUploader';

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
