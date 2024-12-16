import { BASE_URL } from '@shared/api';
import { Todo } from '../model/todo.dto';

export const createTodo = (newTodo: Todo) => {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(newTodo)
  });
};
