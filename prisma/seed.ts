import { PrismaClient } from '@prisma/client';
import { membersData } from './memberData';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seedMembers() {
  await prisma.like.deleteMany(); // if you have likes
  await prisma.photo.deleteMany();
  await prisma.member.deleteMany();
  await prisma.user.deleteMany();

  for (const member of membersData) {
    const user = await prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash: await hash('password', 10),
        image: member.image,
        profileComplete: true,
      },
    });

    console.log(`🧑 Created user: ${user.id}`);

    const createdMember = await prisma.member.create({
      data: {
        userId: user.id,
        name: member.name,
        gender: member.gender,
        dateOfBirth: new Date(member.dateOfBirth),
        created: new Date(member.created),
        updated: new Date(member.lastActive),
        description: member.description,
        city: member.city,
        country: member.country,
        image: member.image,
        photos: {
          create: {
            url: member.image,
            isApproved: true,
          },
        },
      },
    });

    console.log(`👤 Linked member: ${createdMember.id} => ${createdMember.userId}`);
  }
}

async function seedAdmin() {
  return prisma.user.create({
    data: {
      email: 'admin@test.com',
      emailVerified: new Date(),
      name: 'Admin',
      passwordHash: await hash('password', 10),
      role: 'ADMIN',
    },
  });
}

async function main() {
  await seedMembers();
  await seedAdmin();
  console.log('✅ Done seeding members and users');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
