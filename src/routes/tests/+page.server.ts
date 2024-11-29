import { prisma } from '$lib/prisma';
import { log } from 'console';
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
  tests.forEach((test) => {
    const clickedLogs = test.logs.filter((log) => log.action == 'CLICKED').length;
    const readLogs = test.logs.filter((log) => log.action == 'READ').length;
    const sentLogs = test.logs.filter((log) => log.action == 'SENT').length;
    const successRate = 100 - Math.round((clickedLogs / (sentLogs + readLogs)) * 100);
    test.successRate = successRate;
  });

  return {
    tests
  };
};
