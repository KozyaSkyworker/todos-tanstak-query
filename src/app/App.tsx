import { useRef } from 'react';
import { Box, HStack, Input } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TodoList } from '@entities/Todo';
import { createTodo, getTodos } from '@entities/Todo/api';
import { TodoDTO } from '@entities/Todo/model';

import { Button } from '@shared/chakra/components/ui/button';

function App() {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLInputElement | null>(null);

  const { data: todos, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);
      console.log(previousTodos);

      queryClient.setQueryData(['todos'], (old: TodoDTO[]) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const handleCreateTodoClick = () => {
    const val = ref.current?.value;
    if (!val) {
      alert('Empty!!!');
      return;
    }
    mutation.mutate({
      id: String(Date.now()),
      text: val,
      isDone: false
    });
  };

  return (
    <>
      <Box
        maxWidth={'800px'}
        margin={'0 auto'}
      >
        <HStack>
          <Input ref={ref} />
          <Button
            loading={isFetching}
            backgroundColor='green.500'
            onClick={handleCreateTodoClick}
          >
            {' '}
            + Добавить
          </Button>
        </HStack>
        {todos && <TodoList todos={todos} />}
      </Box>
    </>
  );
}

export default App;
