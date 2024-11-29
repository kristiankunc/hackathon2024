import { LogAction, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const actions = ['SENT', 'READ', 'CLICKED'];

const main = async () => {
	await prisma.$transaction(async (prisma) => {
		for (let i = 0; i < 10; i++) {
			await prisma.test.create({
				data: {
					name: faker.lorem.words(3),
					description: faker.lorem.sentence(),
					messageContent: `<h1>${faker.lorem.words(3)}</h1><p>${faker.lorem.paragraph()}</p>`
				}
			});
		}
	});

	await prisma.$transaction(async (prisma) => {
		for (let i = 0; i < 5; i++) {
			await prisma.employeeCategory.create({
				data: {
					name: faker.person.jobArea(),
					description: faker.lorem.sentence()
				}
			});
		}
	});
	const allCategories = await prisma.employeeCategory.findMany();

	await prisma.$transaction(async (prisma) => {
		for (const category of allCategories) {
			for (let i = 0; i < 10; i++) {
				await prisma.employee.create({
					data: {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						email: faker.internet.email(),
						employeeCategoryId: category.id
					}
				});
			}
		}
	});

	const allEmployees = await prisma.employee.findMany();
	const allTests = await prisma.test.findMany();

	await prisma.$transaction(async (prisma) => {
		for (const employee of allEmployees) {
			const logCount = Math.floor(Math.random() * 3) + 1;

			for (const test of allTests) {
				for (let i = 0; i < logCount; i++) {
					await prisma.log.create({
						data: {
							action: actions[i % actions.length] as LogAction,
							createdAt: new Date(),
							testId: test.id,
							employeeId: employee.id
						}
					});
				}
			}
		}
	});

	await prisma.$transaction(async (prisma) => {
		for (const test of allTests) {
			await prisma.test.update({
				where: {
					id: test.id
				},
				data: {
					employees: {
						connect: allEmployees.map((employee) => ({ id: employee.id }))
					}
				}
			});
		}
	});
};

main()
	.catch((e) => {
		console.error(e);
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
