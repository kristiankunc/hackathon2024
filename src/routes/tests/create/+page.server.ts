import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { Prisma } from '@prisma/client';

interface Employee {
	id: number;
	email: string;
	employeeCategoryId: number;
}

export const actions = {
	createTest: async ({ request, locals }) => {
		const data = await request.formData();

		const domain = request.url.split('/').at(2);

		const name = data.get('name');
		const description = data.get('description');
		const category = data.get('category');
		const employeeGroup = data.get('employeeGroup');
		const messageContent = data.get('content');

		console.log(messageContent);

		if (!name) {
			return fail(400, { title: 'Name is required' });
		}

		if (!description) {
			return fail(400, { title: 'Description is required' });
		}

		if (!messageContent) {
			return fail(400, { title: 'Message content is required' });
		}

		if (typeof name !== 'string') {
			return fail(400, { title: 'Name must be a string' });
		}

		if (typeof description !== 'string') {
			return fail(400, { title: 'Description must be a string' });
		}

		const groupId = await prisma.employeeCategory.findFirst({
			where: {
				name: employeeGroup
			},
			select: {
				id: true
			}
		});

		const employees = await prisma.employee.findMany({
			where: {
				employeeCategoryId: groupId?.id
			}
		});

		await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			const test = await tx.test.create({
				data: {
					name,
					description,
					messageContent: messageContent as string
				}
			});

			const admin = await tx.admin.create({
				data: {
					email: locals.user!.email,
					testId: test.id
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

		const sendEmail = async (email: string) => {
			const emailData = {
				to: email,
				subject: name,
				text: messageContent
			};

			try {
				console.log('Sending email:', emailData);
				const response = await fetch('http://' + domain + '/send-email', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(emailData)
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				console.log('Email sent:', emailData);
			} catch (error) {
				console.error('Error sending email:', error);
			}
		};

		console.log('Category:', category);

		if (category === 'email') {
			console.log(employees);
			for (let employee of employees) {
				sendEmail(employee.email);
			}
			await prisma.test.create({
				data: {
					name,
					description,
					employees: {
						connect: employees.map((employee: Employee) => ({ id: employee.id }))
					}
				}
			});
		} else if (category === 'sms') {
			console.log('Sending SMS');
		} else if (category === 'telephone') {
			console.log('Calling');
		} else {
			console.log('Unknown category');
		}

		throw redirect(303, `/tests`);
	}
} satisfies Actions;
