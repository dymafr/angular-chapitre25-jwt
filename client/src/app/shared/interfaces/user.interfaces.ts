export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UserForm {
  username: string;
  email: string;
  password: string;
}
