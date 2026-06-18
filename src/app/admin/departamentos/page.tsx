import { DeptManager } from "@/components/DeptManager";
import { getDepartments } from "@/app/actions";

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Departamentos & Categorias</h1>
        <p className="text-zinc-500 mt-1">Organize a estrutura de navegação da sua loja.</p>
      </div>

      <DeptManager departments={departments} />
    </div>
  );
}
