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

	// Zaměstnanci spojené s testem a jejich nejnovější logy
	const employees = await prisma.employee.findMany({
		where: {
			tests: {
				some: {
					id: testId
				}
			}
		},
		include: {
			logs: {
				where: { testId },
				orderBy: { createdAt: 'desc' }, // Seřadí logy podle nejnovějších
				take: 1 // Vrátí pouze nejnovější log
			}
		}
	});

	// Získání nejnovějších logů
	const latestLogs = employees
		.map((employee: { logs: any[] }) => employee.logs[0]) // Získá první log pro každého zaměstnance
		.filter((log: undefined) => log !== undefined); // Filtruje pouze existující logy

	// Výpočet úspěšnosti
	const successRate =
		latestLogs.length > 0
			? 100 -
				Math.round(
					(latestLogs.filter((log: { action: string }) => log.action === 'CLICKED').length /
						latestLogs.length) *
						100
				)
			: 100; // Pokud nejsou žádné logy, úspěšnost je 100 %

	// Strukturování podrobností o logách
	const detailedLogs = employees.map((employee: { logs: any[] }) => ({
		employee,
		latestLog: employee.logs[0] || null // Pokud není log, vrátí null
	}));

	console.log(successRate, test, detailedLogs);

	// Návrat dat
	return { successRate, test, logs: detailedLogs };
};
