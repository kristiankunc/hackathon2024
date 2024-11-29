import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const employees = await prisma.employee.findMany({
		include: {
			category: true
		}
	});
	
	const groups = await prisma.employeeCategory.findMany();
	return { employees, groups };
};
