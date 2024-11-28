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
	return { tests };
};
