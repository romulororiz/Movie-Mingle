import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: process.env.NODE_ENV === 'development'
			? ['query', 'error', 'warn']
			: ['error'],
		errorFormat: process.env.NODE_ENV === 'development' ? 'pretty' : 'minimal',
	});

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}

// Graceful shutdown
if (process.env.NODE_ENV === 'production') {
	const cleanup = async () => {
		await prisma.$disconnect();
	};
	
	process.on('SIGTERM', cleanup);
	process.on('SIGINT', cleanup);
}
