import { prisma } from '$lib/prisma';

export const load = async ({ params }: { params: { id: string } }) => {
	const testId = parseInt(params.id, 10);

	if (isNaN(testId)) {
		throw new Error('Invalid test ID');
	}

	// Načtení celkového počtu logů
	const totalLogs = await prisma.log.count({
		where: {
			testId
		}
	});

	// Načtení úspěšných logů
	const unsuccessfulLogs = await prisma.log.count({
		where: {
			testId,
			action: {
				in: ['CLICKED']
			}
		}
	});

	// Výpočet úspěšnosti
	const successRate = totalLogs > 0 ? Math.round((unsuccessfulLogs / totalLogs) * 100) : 0;

	// Načtení dat o testu
	const test = await prisma.test.findUnique({
		where: { id: testId },
		include: {
			admins: true, // Pokud chcete zahrnout i administrátory testu
			employees: true // Pokud chcete zahrnout i zaměstnance spojené s testem
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

	const detailedLogs = employees.map((employee) => ({
		employee,
		latestLog: employee.logs[0] || null // Handle case where no log exists
	}));
	// Návrat dat
	return { successRate, test, logs: detailedLogs };
};
