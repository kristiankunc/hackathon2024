// what the fuck - https://github.com/prisma/prisma/issues/5030#issuecomment-1347116391
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

export const prisma = new PrismaClient();
