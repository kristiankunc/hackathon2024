import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { Prisma } from '@prisma/client';

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
			await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
				const test = await tx.test.create({
					data: {
						name
					}
				});

				const admin = await tx.admin.create({
					data: {
						email: user.email,
						testId: test.id // Propojení s právě vytvořeným testem
					}
				});

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
