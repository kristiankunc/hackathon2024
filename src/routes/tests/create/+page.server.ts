import { fail, redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { LogAction, Prisma } from '@prisma/client';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface Employee {
	id: number;
	email: string;
	employeeCategoryId: number;
}

export const load = async () => {
	const groups = await prisma.employeeCategory.findMany({
		distinct: ['name'] // unique values
	});
	console.log(groups);

	return { groups };
};

export const actions = {
	createTest: async ({ request, locals }) => {
		const data = await request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const category = data.get('category');
		const employeeGroup = data.get('employeeGroup');
		const messageContent = data.get('content');
		const subject = data.get('subject');

		if (!name) {
			return fail(400, { title: 'Name is required' });
		}

		if (!subject) {
			return fail(400, { title: 'Subject is required' });
		}

		if (!description) {
			return fail(400, { title: 'Description is required' });
		}

		if (!messageContent) {
			return fail(400, { title: 'Message content is required' });
		}

		if (!category) {
			return fail(400, { title: 'Category is required' });
		}

		if (!employeeGroup) {
			return fail(400, { title: 'Employee group is required' });
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

		let testId: number = 0;

		await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			const test = await tx.test.create({
				data: {
					name,
					description: description,
					messageContent: messageContent as string,
					employees: {
						connect: employees.map((employee: Employee) => ({ id: employee.id }))
					}
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

			testId = test.id;
		});

		const sendEmail = async (email: string, testId: number, employeeId: number) => {
			try {
				// Nastavení Nodemailer transportu
				const transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.EMAIL_USER, // Váš Gmail
						pass: process.env.EMAIL_PASS // Heslo aplikace
					}
				});

				// Odeslání e-mailu
				await transporter.sendMail({
					from: process.env.EMAIL_USER, // Výchozí odesílatel

					to: email,
					subject: subject as string,
					html: messageContent as string
				});

				await prisma.log.create({
					data: {
						action: 'SENT' as LogAction,
						testId: testId,
						employeeId: employeeId,
						createdAt: new Date()
					}
				});

				return new Response(JSON.stringify({ message: 'E-mail odeslán!' }), {
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				});
			} catch (error) {
				console.error('Chyba při odesílání e-mailu:', error);

				return new Response(JSON.stringify({ error: 'Chyba při odesílání e-mailu.' }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		};

		if (category === 'email') {
			for (let employee of employees) {
				sendEmail(employee.email, testId, employee.id);
				console.log(employee.email, testId, employee.id);
			}
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
