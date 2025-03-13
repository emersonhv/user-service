import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seed() {

    let user1 = await prisma.user.findFirst({
        where: {
            email: 'jhony@example.com',
        },
    })
    if (!user1) {
        user1 = await prisma.user.create({
            data: {
                name: 'Jhony',
                email: 'jhony@example.com',
                password: 'password123',
                profile: {
                    create: { bio: 'I am a software engineer' }
                }
            },
        });
    }
    
    let user2 = await prisma.user.findFirst({
        where: {
            email: 'boby@example.com',
        },
    })
    if (!user2) { 
        user2 = await prisma.user.create({
            data: {
                name: 'Boby',
                email: 'boby@example.com',
                password: 'password123',
                profile: {
                    create: { bio: 'I am atomic' }
                }
            },
        });
    }
    

    console.log({ user1, user2 });
}