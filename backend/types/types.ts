import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
  }

  interface Tables {
    users: User;

    users_composite: Knex.CompositeTableType<User, Partial<Omit<User, "id">>>;
  }
}
