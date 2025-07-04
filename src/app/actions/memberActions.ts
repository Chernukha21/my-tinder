"use server";
import {prisma} from "@/lib/prisma";
import {auth} from "@/auth";

export async function getMembers() {
    const session = await auth();
    if (!session?.user) return null;
    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id,
                },
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({where: {userId}});
    } catch (error) {
        console.log(error);
    }
}

export async function getMemberById(id: string) {
    try {
        return prisma.member.findUnique({where: {id}});
    } catch (error) {
        console.log(error);
    }
}

export async function getMembersPhotosByUserId(userId: string) {
    const member = await prisma.member.findUnique({where: {userId}, select: {photos: true}});
    if (!member) return null;
    return member.photos;
}

export async function getMembersPhotosById(id: string) {
    const member = await prisma.member.findUnique({where: {id}, select: {photos: true}});
    if (!member) return null;
    return member.photos;
}
