export const BE_URL = "http://localhost:3000/api/v1/todo";

export type Todo = {
  id: string;
  done: boolean;
  createdOn: number;
  modifiedOn: number;
  description: string;
};

export type TodoResponse = {
  content: Todo[];
  error: string;
  status: boolean;
};
