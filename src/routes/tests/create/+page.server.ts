import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { Prisma } from '@prisma/client';

export const actions = {
	createTest: async ({ request, locals }) => {
		const data = await request.formData();

		let name = data.get('name');
		let description = data.get('description');

		let user = locals.user;

		let category = data.get('category');
		let employeeGroup = data.get('employeeGroup');
		const groupId = await prisma.employeeCategory.findMany({
			where: {
				name: employeeGroup
			},
			select: {
				id: true
			}
		});
		console.log("=====")
		console.log(groupId);

		if (!user) {
			return fail(400, { title: 'Not logged in' });
		}

		if (!name) {
			return fail(400, { title: 'Name is required' });
		}

		if (!description) {
			return fail(400, { title: 'Description is required' });
		}

		if (typeof name !== 'string') {
			return fail(400, { title: 'Name must be a string' });
		}

		if (typeof description !== 'string') {
			return fail(400, { title: 'Description must be a string' });
		}

		await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			const test = await tx.test.create({
				data: {
					name,
					description
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

		console.log(await prisma.employee.findMany())
	

		throw redirect(303, `/tests`);
	}
} satisfies Actions;
