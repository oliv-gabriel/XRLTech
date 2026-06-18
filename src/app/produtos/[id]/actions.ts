'use server';

import prisma from "@/lib/prisma";

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            department: true
          }
        }
      }
    });
    
    if (!product) return null;

    // Map Prisma Decimal to number for the frontend
    return {
      ...product,
      price: Number(product.price),
      features: product.features as any
    };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}
