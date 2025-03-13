import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {
    const user1 = await prisma.user.create({
        data: {
            name: 'Jhony',
            email: 'jhony@example.com',
            password: 'password123',
            profile: {
                create: {   bio: 'I am a software engineer' }
            }
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Boby',
            email: 'boby@example.com',
            password: 'password123',
            profile: {
                create: {   bio: 'I am atomic' }
            }
        },
    });

    console.log({ user1, user2 });
}