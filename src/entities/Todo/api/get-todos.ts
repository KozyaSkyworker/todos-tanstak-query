import { TodoDTO } from '../model';

export const getTodos = () => {
  return new Promise<TodoDTO[]>((resolve) => {
    setTimeout(() => {
      const data = fetch('http://localhost:3000/todos').then(
        (res) => res.json() as Promise<TodoDTO[]>
      );
      resolve(data);
    }, 2222);
  });
};
