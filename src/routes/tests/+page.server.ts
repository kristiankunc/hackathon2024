import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tests = await prisma.test.findMany({
		include: {
			admins: true,
			employees: true,
			logs: true
		}
	});

	// calculate success rate of each test, all test that have action === "CLICKED" are considered unsuccessful
	tests.forEach((test: { logs: any[]; successRate: number }) => {
		const clickedLogs = test.logs.filter((log: { action: string }) => log.action === 'CLICKED');
		const successRate = clickedLogs.length / test.logs.length;
		test.successRate = successRate * 100;
	});

	return {
		tests
	};
};
