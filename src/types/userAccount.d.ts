export interface UserAccount {
  email: string;
  id: string;
  group: string;
  password: string;
}

export interface UserActionResponse {
  success: boolean;
  user?: { email: string; group: string };
}
