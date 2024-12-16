import { BASE_URL } from '@shared/api';
import { Todo } from '../model/todo.dto';

export const toggleTodo = (data: Partial<Todo> & { id: string }) => {
  return fetch(`${BASE_URL}/todos/${data.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
};
