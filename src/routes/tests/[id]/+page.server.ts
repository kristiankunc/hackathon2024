import { prisma } from '$lib/prisma';

export const load = async ({ params }: { params: { id: string } }) => {
	const testId = parseInt(params.id, 10);

	if (isNaN(testId)) {
		throw new Error('Invalid test ID');
	}

	// Načtení dat o testu
	const test = await prisma.test.findUnique({
		where: { id: testId },
		include: {
			admins: true,
			employees: true
		}
	});

	if (!test) {
		throw new Error(`Test with ID ${testId} not found`);
	}
	const employees = await prisma.employee.findMany({
		include: {
			logs: {
				where: { testId },
				orderBy: { createdAt: 'desc' },
				take: 1
			}
		}
	});

	const latestLogs = employees.map((employee) => employee.logs[0]);
	const successRate =
		100 -
		Math.round(
			(latestLogs.filter((log) => log.action === 'CLICKED').length / latestLogs.length) * 100
		);

	const detailedLogs = employees.map((employee) => ({
		employee,
		latestLog: employee.logs[0] || null // Handle case where no log exists
	}));
	// Návrat dat
	return { successRate, test, logs: detailedLogs };
};
