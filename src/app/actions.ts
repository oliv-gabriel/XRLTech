'use server';

import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import * as ftp from "basic-ftp";
import { Readable } from "stream";

export async function getProducts(limit?: number) {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Map Prisma Decimal to number for the frontend
    return products.map(product => ({
      ...product,
      price: Number(product.price)
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

export async function getDepartments() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        categories: true
      }
    });
    return departments;
  } catch (error) {
    console.error("Erro ao buscar departamentos:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    return categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const categoryId = formData.get('categoryId') as string;
    const stock = formData.get('stock') as string;
    const description = formData.get('description') as string;
    const featuresStr = formData.get('features') as string;
    const file = formData.get('imageFile') as File | null;

    let features = null;
    if (featuresStr) {
      features = JSON.parse(featuresStr);
    }

    const productId = uuidv4();
    let imagePath = '';

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Extract extension (e.g., .jpg, .png)
      const extension = file.name.split('.').pop() || 'jpg';
      const fileName = `${productId}.${extension}`;
      
      const client = new ftp.Client();
      try {
        await client.access({
          host: process.env.FTP_HOST,
          user: process.env.FTP_USER,
          password: process.env.FTP_PASSWORD,
          secure: false
        });
        
        const stream = Readable.from(buffer);
        try {
          // A KingHost tem a pasta 'www' na raiz. As imagens públicas ficam dentro de 'www/imagens'.
          await client.cd("www");
          await client.cd("imagens");
        } catch (cdErr) {
          console.warn("Aviso: Falha ao tentar entrar em www/imagens. Tentando direto em imagens. Erro:", (cdErr as Error).message);
          
          try {
            // Se o usuário já estiver preso (chroot) dentro da www
            await client.cd("imagens");
          } catch (fallbackErr) {
            console.error("ERRO CRÍTICO: Não foi possível encontrar a pasta de imagens de nenhum jeito. Verifique no FTP se existe a pasta 'imagens' dentro de 'www'.");
          }
        }
        
        // Faz o upload apenas com o nome do arquivo, já que estamos na pasta
        await client.uploadFrom(stream, fileName);
        
        const publicUrl = process.env.FTP_PUBLIC_URL || '';
        imagePath = `${publicUrl}/${fileName}`;
      } catch (err) {
        console.error("Erro no FTP:", err);
        throw new Error("Falha ao enviar imagem para o FTP");
      } finally {
        client.close();
      }
    }

    await prisma.product.create({
      data: {
        id: productId,
        name,
        price: Number(price),
        categoryId,
        stock: Number(stock),
        image: imagePath,
        description,
        features
      }
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw new Error("Falha ao cadastrar produto");
  }
}

export async function createDepartment(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    await prisma.department.create({
      data: { name }
    });
  } catch (error) {
    console.error("Erro ao criar departamento:", error);
    throw new Error("Falha ao criar departamento");
  }
}

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const departmentId = formData.get('departmentId') as string;
    await prisma.category.create({
      data: { name, departmentId }
    });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw new Error("Falha ao criar categoria");
  }
}
