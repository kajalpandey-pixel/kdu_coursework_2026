export interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  age: number;
}   

export interface UsersResponse {
  users: User[];
    total: number;
}
  




