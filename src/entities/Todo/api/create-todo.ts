import { BASE_URL } from '@shared/api';
import { TodoDTO } from '../model';

export const createTodo = (newTodo: TodoDTO) => {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(newTodo)
  });
};
