import 'dotenv/config';
import {PrismaClient} from '../generated/prisma/index.js';


const adapter = new PrismaMAriaDb(proccess.env.DATABASE_URL);
const prisma = new PrismaClient({adapter});

export default prisma;