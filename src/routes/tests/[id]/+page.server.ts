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
	const successfulLogs = await prisma.log.count({
		where: {
			testId,
			action: {
				in: ['READ', 'CLICKED']
			}
		}
	});

	// Výpočet úspěšnosti
	const successRate = totalLogs > 0 ? Math.round((successfulLogs / totalLogs) * 100) : 0;

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

	// Návrat dat
	return { successRate, test };
};
