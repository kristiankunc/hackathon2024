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

	return {
		employee
	};
};
