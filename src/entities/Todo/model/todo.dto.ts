export interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}

export interface TodoDTO {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  data: Todo[];
}
