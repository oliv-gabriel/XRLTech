import { getUsers } from "./actions";
import UserManagement from "./UserManagement";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return <UserManagement initialUsers={users} />;
}
