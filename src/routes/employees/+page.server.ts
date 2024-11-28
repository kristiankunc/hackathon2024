import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const employees = await prisma.employee.findMany();
	return { employees };
};
