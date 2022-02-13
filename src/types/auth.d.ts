import "next-auth";

declare module "next-auth" {
  interface User {
    group: string;
  }

  interface Session {
    user: User;
  }
}
