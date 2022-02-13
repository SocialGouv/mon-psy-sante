export interface UserAccount {
  email: string;
  id: string;
  group: string;
}

export interface UserActionResponse {
  success: boolean;
  user?: { email: string; group: string };
}
