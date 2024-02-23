import User from "../../types/User";
import { addressUsers } from "./httpConst";

async function fetchUsers() {
  const res = await fetch(addressUsers);
  const jsonUsers = await res.json();
  let users = jsonUsers.map((user: User) => {
    return new User(user.id, user.name, user.email, user.role, user.password);
  });
  return users;
}

function postUsers(newUsers: User[]): void {
  fetch(addressUsers, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUsers),
  });
}

export { fetchUsers, postUsers };
