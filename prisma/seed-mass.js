/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando cadastro em massa de 1000 produtos...');

  // Pegar categorias existentes
  const categories = await prisma.category.findMany();
  
  if (categories.length === 0) {
    console.error('Erro: Nenhuma categoria encontrada. Rode o seed normal primeiro.');
    process.exit(1);
  }

  const productsToCreate = [];
  const adjectives = ['Pro', 'Ultra', 'Gamer', 'Elite', 'Max', 'Lite', 'Plus', 'RGB', 'Wireless', 'Ergonômico'];
  const baseNames = ['Monitor', 'Teclado', 'Mouse', 'Headset', 'Cadeira', 'Placa de Vídeo', 'SSD', 'Processador'];

  for (let i = 0; i < 1000; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomBase = baseNames[Math.floor(Math.random() * baseNames.length)];
    
    // Preços entre 50 e 5000
    const randomPrice = Math.floor(Math.random() * (5000 - 50 + 1) + 50) + 0.99;
    
    productsToCreate.push({
      name: `${randomBase} ${randomAdjective} X-${i}`,
      price: randomPrice,
      categoryId: randomCategory.id,
      stock: Math.floor(Math.random() * 100) + 1,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop", // Imagem genérica para não pesar o carregamento
      description: `Produto gerado automaticamente para teste de carga. ID na sequência: ${i}. Qualidade garantida XRLTech.`,
      rating: Math.floor(Math.random() * 2) + 4, // Notas 4 ou 5
      features: [
        { name: "Marca", value: "Genérica" },
        { name: "Série", value: `X-${i}` }
      ]
    });
  }

  // Inserir em lotes para não sobrecarregar a memória
  console.log('Inserindo no banco...');
  await prisma.product.createMany({
    data: productsToCreate,
  });

  console.log('✅ 1000 produtos cadastrados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
