/** In-memory user "database" */

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user" },
];

let nextId = 4;

/** Return all users, optionally filtered by a field match */
export function getUsers(filter?: { field: string; value: string }): User[] {
  if (!filter) return users;

  const key = filter.field as keyof User;
  return users.filter((u) => String(u[key]).includes(filter.value));
}

/** Look up a single user by ID */
export function getUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

/** Insert a new user and return it */
export function createUser(data: Record<string, unknown>): User {
  const user: User = {
    id: nextId++,
    name: data.name as string,
    email: data.email as string,
    role: (data.role as string) ?? "user",
  };
  users.push(user);
  return user;
}
