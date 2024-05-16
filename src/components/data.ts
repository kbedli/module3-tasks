export type User = {
  id: string;
  nickname: string;
  age: number;
};

export const users: User[] = [
  { id: "1", nickname: "john", age: 45 },
  { id: "2", nickname: "olivier", age: 32 },
  { id: "3", nickname: "macgyver", age: 65 },
];
