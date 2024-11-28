import { PrismaClient } from '@prisma/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		let name = data.get('name');
		let user = locals.user;

		if (!user) {
			return fail(400, { title: 'Not logged in' });
		}

		if (!name) {
			return fail(400, { title: 'Name is required' });
		}

		if (typeof name !== 'string') {
			return fail(400, { title: 'Name must be a string' });
		}

		try {
			await prisma.$transaction(async (tx) => {
				// Nejprve vytvoříme test
				const test = await tx.test.create({
					data: {
						name
					}
				});

				// Poté vytvoříme Admin a spojíme ho s testem
				const admin = await tx.admin.create({
					data: {
						email: user.email,
						testId: test.id // Propojení s právě vytvořeným testem
					}
				});

				// A přidáme admina do pole admins testu
				await tx.test.update({
					where: {
						id: test.id
					},
					data: {
						admins: {
							connect: { id: admin.id }
						}
					}
				});
			});

			throw redirect(303, `/tests`);
		} catch (error) {
			console.error(error);
			return fail(500, { error: 'Error while creating test and admin.' });
		}
	}
} satisfies Actions;
