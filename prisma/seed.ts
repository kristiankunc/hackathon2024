import { LogAction, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const actions = ['SENT', 'READ', 'CLICKED'];

const main = async () => {
	const test = await prisma.test.create({
		data: {
			name: 'Test with logs',
			description: 'test that includes a few logs',
			messageContent: ''
		}
	});

	await prisma.employeeCategory.createMany({
		data: [
			{ name: 'IT', description: 'IT Department' },
			{ name: 'HR', description: 'HR Department' },
			{ name: 'Finance', description: 'Finance Department' },
			{ name: 'Marketing', description: 'Marketing Department' },
			{ name: 'Sales', description: 'Sales Department' }
		]
	});

	await prisma.employee.createMany({
		data: [
			{ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', employeeCategoryId: 1 },
			{ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', employeeCategoryId: 2 },
			{
				firstName: 'Alice',
				lastName: 'Smith',
				email: 'alice.smith@example.com',
				employeeCategoryId: 3
			},
			{
				firstName: 'Bob',
				lastName: 'Brown',
				email: 'bob.brown@example.com',
				employeeCategoryId: 4
			},
			{
				firstName: 'Charlie',
				lastName: 'White',
				email: 'charlie.white@example.com',
				employeeCategoryId: 5
			}
		]
	});

	const allEmployees = await prisma.employee.findMany();

	for (const employee of allEmployees) {
		const logCount = Math.floor(Math.random() * 3) + 1;

		for (let i = 0; i < logCount; i++) {
			await prisma.log.create({
				data: {
					action: actions[i] as LogAction,
					createdAt: new Date(),
					testId: test.id,
					employeeId: employee.id
				}
			});
		}
	}
};

main()
	.catch((e) => {
		console.error(e);
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
