import { TodoDTO } from '../model';

export const getTodos = () => {
  return fetch('http://localhost:3000/todos').then((res) => res.json() as Promise<TodoDTO[]>);
};
