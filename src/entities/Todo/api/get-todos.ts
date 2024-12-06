import { BASE_URL } from '@shared/api';
import { TodoDTO } from '../model';

export const getTodos = () => {
  return new Promise<TodoDTO[]>((resolve) => {
    setTimeout(() => {
      const data = fetch(`${BASE_URL}/todos`).then((res) => res.json() as Promise<TodoDTO[]>);
      resolve(data);
    }, 2222);
  });
};
