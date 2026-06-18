/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // 0. Criar Usuário Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@xrltech.com' },
    update: {},
    create: {
      email: 'admin@xrltech.com',
      name: 'Administrador XRL',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Usuário admin criado: admin@xrltech.com / admin123');

  // 1. Criar Departamentos
  const hardware = await prisma.department.upsert({
    where: { name: 'Hardware' },
    update: {},
    create: { name: 'Hardware' },
  });

  const perifericos = await prisma.department.upsert({
    where: { name: 'Periféricos' },
    update: {},
    create: { name: 'Periféricos' },
  });

  // 2. Criar Categorias
  const monitoresCat = await prisma.category.upsert({
    where: { name_departmentId: { name: 'Monitores', departmentId: hardware.id } },
    update: {},
    create: { name: 'Monitores', departmentId: hardware.id },
  });

  const tecladosCat = await prisma.category.upsert({
    where: { name_departmentId: { name: 'Teclados', departmentId: perifericos.id } },
    update: {},
    create: { name: 'Teclados', departmentId: perifericos.id },
  });

  // 3. Criar Produtos
  await prisma.product.createMany({
    data: [
      {
        name: "Monitor Gamer 144Hz 1ms",
        price: 1299.90,
        categoryId: monitoresCat.id,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
        stock: 10
      },
      {
        name: "Teclado Mecânico RGB",
        price: 459.00,
        categoryId: tecladosCat.id,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
        stock: 25
      }
    ],
  });

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
