'use server';

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as "ADMIN" | "USER";

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    });

    revalidatePath("/admin/usuarios");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Falha ao criar usuário");
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}
