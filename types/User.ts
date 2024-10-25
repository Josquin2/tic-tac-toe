export interface User {
  id: number;
  username: string;
  password: string;
}

export interface responseUser {
  status: number;
  error: string;
  user: User;
}
