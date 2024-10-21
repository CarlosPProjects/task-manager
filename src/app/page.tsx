import { PrismaClient } from "@prisma/client";
import { addUser } from "./actions/addUser";
import { IUser } from "@/types/global";

const prisma = new PrismaClient();

const Home = async () => {
  const users: IUser[] = await prisma.users.findMany();

  return (
    <div>
      <h1>Todos</h1>
      <form action={addUser}>
        <input type="text" name="name" placeholder="Add new user" />
        <input type="email" name="email" placeholder="Add new email" />
        <input type="password" name="password" placeholder="Add new password" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
