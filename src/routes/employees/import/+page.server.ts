import { prisma } from '$lib/prisma';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const employees = await prisma.employee.findMany({
		take: 10
	});

	const categories = await prisma.employeeCategory.findMany();

	return {
		employees,
		categories
	};
};

export const actions = {
	importFle: async ({ request, locals }) => {
		console.log('locals', locals);

		if (!locals.user) {
			return fail(401, {
				title: 'Unauthorized',
				detail: 'You must be logged in to upload a file'
			});
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file || file.name.endsWith('.csv') === false) {
			return fail(400, {
				title: 'Invalid file',
				detail: 'Please upload a valid CSV file'
			});
		}

		const fileContent = await file.text();

		const employees: {
			firstName: string;
			lastName: string;
			email: string;
			employeeCategoryId: number;
		}[] = [];

		const lines = fileContent.split('\n');
		for (let i = 1; i < lines.length; i++) {
			const [firstName, lastName, email, employeeCategoryId] = lines[i].split(',');
			console.log(firstName, lastName, email, employeeCategoryId);
			employees.push({
				firstName,
				lastName,
				email,
				employeeCategoryId: parseInt(employeeCategoryId, 10)
			});
		}

		await prisma.employee.createMany({
			data: employees
		});
	}
} satisfies Actions;
