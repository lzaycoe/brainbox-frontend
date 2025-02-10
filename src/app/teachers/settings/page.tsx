'use client';

import FormChangePass from '@/components/teachers/setting/FormChangePass';
import FormInfo from '@/components/teachers/setting/FormInfo';
import FormNoti from '@/components/teachers/setting/FormNoti';
import FormSocial from '@/components/teachers/setting/FormSocial';

export default function Setting() {
	return (
		<div className="bg-slate-100 my-6">
			<FormInfo />
			<div className="h-6"></div>
			<FormSocial />
			<div className="h-6"></div>
			<div className="flex max-md:px-5 max-w-[1240px] mx-auto space-x-4">
				<FormNoti />
				<FormChangePass />
			</div>
		</div>
	);
}
