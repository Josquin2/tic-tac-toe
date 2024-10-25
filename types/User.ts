export interface User {
  id: number;
  username: string;
  password: string;
  sign: string;
  socketId: string;
}

export interface responseUser {
  status: number;
  error: string;
  user: User;
}
