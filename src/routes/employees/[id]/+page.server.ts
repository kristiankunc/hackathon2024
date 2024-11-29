import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	if (isNaN(Number(id))) {
		return {
			employee: null
		};
	}

	const employee = await prisma.employee.findUnique({
		where: {
			id: Number(id)
		},
		include: {
			category: true,
			tests: true
		}
	});

	// Fetch all logs for the employee grouped by unique testId
	const logs = await prisma.log.findMany({
		where: {
			employeeId: Number(id)
		},
		orderBy: {
			createdAt: 'asc' // Assuming `createdAt` determines the "first" log
		}
	});

	const uniqueLogs = Array.from(
		logs
			.reduce((map, log) => {
				if (!map.has(log.testId)) {
					map.set(log.testId, log);
				}
				return map;
			}, new Map())
			.values()
	);

	const successRate =
		100 -
		(uniqueLogs.length > 0
			? Math.round(
					(uniqueLogs.filter((log) => log.action === 'CLICKED').length / uniqueLogs.length) * 100
				)
			: 0);

	return {
		employee: {
			...employee
		},
		logs: uniqueLogs,
		successRate: successRate
	};
};
