import { prisma } from '$lib/prisma';

export const load = async ({ id }: { id: number }) => {
	const totalLogs = await prisma.log.count({
		where: {
			testId: id
		}
	});

	const successfulLogs = await prisma.log.count({
		where: {
			testId: id,
			action: {
				in: ['READ', 'CLICKED']
			}
		}
	});

	const successRate = totalLogs > 0 ? (successfulLogs / totalLogs) * 100 : 0;

	console.log(successRate);
	return { successRate };
};
