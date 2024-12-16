import { BASE_URL } from '@shared/api';
import { TodoDTO } from '../model';

export const getTodos = ({ page }: { page: number }) => {
  return new Promise<TodoDTO>((resolve) => {
    setTimeout(() => {
      const data = fetch(`${BASE_URL}/todos?_page=${page}&_per_page=9`).then(
        (res) => res.json() as Promise<TodoDTO>
      );
      resolve(data);
    }, 2222);
  });
};
