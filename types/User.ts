export interface User {
  id: number;
  username: string;
  password: string;
  frinends: User[];
  sign: string;
  socketId: string;
}

export interface responseUser {
  status: number;
  error: string;
  user: User;
}
