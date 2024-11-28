import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export const actions = {
	createEmployee: async ({ request }) => {
		const data = await request.formData();

		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const email = data.get('email');
		const employeeCategoryId = data.get('employeeCategoryId');

		// Validace vstupů
		if (!firstName || typeof firstName !== 'string') {
			return fail(400, { title: 'First name is required and must be a string' });
		}
		if (!lastName || typeof lastName !== 'string') {
			return fail(400, { title: 'Last name is required and must be a string' });
		}
		if (!email || typeof email !== 'string') {
			return fail(400, { title: 'Email is required and must be a string' });
		}
		if (!employeeCategoryId || typeof employeeCategoryId !== 'string') {
			return fail(400, { title: 'Employee category is required and must be a string' });
		}

		try {
			// Vytvoření nového zaměstnance
			await prisma.employee.create({
				data: {
					firstName,
					lastName,
					email,
					employeeCategoryId: parseInt(employeeCategoryId, 10)
				}
			});

			throw redirect(303, '/employees');
		} catch (error) {
			console.error('Error creating employee:', error);
			return fail(500, { error: 'An error occurred while creating the employee.' });
		}
	}
} satisfies Actions;
