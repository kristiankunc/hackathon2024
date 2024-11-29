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
      employees: true,
      logs: true
    }
  });

  const employees = await prisma.employee.findMany({
    include: {
      logs: {
        where: { testId },
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });

  const employeesClicked = employees.filter((employee) => {
    return employee.logs[0]?.action == 'CLICKED';
  });

  const employeesRead = employees.filter((employee) => {
    return employee.logs[0]?.action == 'READ';
  });

  const employeesSent = employees.filter((employee) => {
    return employee.logs[0]?.action == 'SENT';
  });

  if (!test) {
    throw new Error(`Test with ID ${testId} not found`);
  }

  const clickedLogs = test.logs.filter((log) => log.action == 'CLICKED').length;
  const readLogs = test.logs.filter((log) => log.action == 'READ').length;
  const sentLogs = test.logs.filter((log) => log.action == 'SENT').length;

  const successRate = 100 - Math.round((clickedLogs / (sentLogs + readLogs)) * 100);

  const actionRates = {
    sent: Math.round((sentLogs / test.logs.length) * 100),
    read: Math.round((readLogs / test.logs.length) * 100),
    clicked: Math.round((clickedLogs / test.logs.length) * 100),
    successRate
  };

  return { actionRates, employeesClicked, employeesRead, employeesSent, test };
};
