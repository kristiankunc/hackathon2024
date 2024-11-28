import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const main = async () => {
  await prisma.test.createMany({
    data: [
      {
        name: 'IT',
        description: 'IT Department'
      },
      {
        name: 'HR',
        description: 'HR Department'
      },
      {
        name: 'Finance',
        description: 'Finance Department'
      },
      {
        name: 'Marketing',
        description: 'Marketing Department'
      },
      {
        name: 'Sales',
        description: 'Sales Department'
      }
    ]
  });

  await prisma.employeeCategory.createMany({
    data: [
      {
        name: 'IT',
        description: 'IT Department'
      },
      {
        name: 'HR',
        description: 'HR Department'
      },
      {
        name: 'Finance',
        description: 'Finance Department'
      },
      {
        name: 'Marketing',
        description: 'Marketing Department'
      },
      {
        name: 'Sales',
        description: 'Sales Department'
      }
    ]
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        employeeCategoryId: 1
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        employeeCategoryId: 2
      },
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@example.com',
        employeeCategoryId: 3
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        employeeCategoryId: 4
      },

      {
        firstName: 'Charlie',
        lastName: 'White',
        email: 'charlie.white@example.com',
        employeeCategoryId: 5
      }
    ]
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
