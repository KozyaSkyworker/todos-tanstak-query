import { BASE_URL } from '@shared/api';

export const deleteTodo = (id: string) => {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  });
};
