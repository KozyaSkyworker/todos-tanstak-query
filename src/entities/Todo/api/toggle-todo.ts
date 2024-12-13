import { BASE_URL } from '@shared/api';
import { TodoDTO } from '../model';

export const toggleTodo = (data: Partial<TodoDTO> & { id: string }) => {
  return fetch(`${BASE_URL}/todos/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};
