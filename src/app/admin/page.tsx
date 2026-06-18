import { Package, Layers, Users, TrendingUp } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function AdminDashboard() {
  // Stats (Real counts from DB)
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  const departmentCount = await prisma.department.count();
  const userCount = await prisma.user.count();

  const STATS = [
    { name: 'Produtos', value: productCount, icon: <Package size={24} className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
    { name: 'Categorias', value: categoryCount, icon: <Layers size={24} className="text-emerald-600" />, color: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Departamentos', value: departmentCount, icon: <TrendingUp size={24} className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' },
    { name: 'Usuários', value: userCount, icon: <Users size={24} className="text-amber-600" />, color: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 mt-1">Visão geral da sua loja XRLTech.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.name}</p>
                <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Bem-vindo ao Painel Administrativo</h2>
        <p className="text-zinc-500 leading-relaxed max-w-2xl">
          Aqui você poderá gerenciar todo o inventário da XRLTech. 
          Use o menu lateral para cadastrar novos produtos, organizar departamentos ou gerenciar os perfis de acesso.
        </p>
      </div>
    </div>
  );
}
