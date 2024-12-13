import { useRef } from 'react';
import { Box, HStack, Input } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TodoList } from '@entities/Todo';
import { createTodo, getTodos } from '@entities/Todo/api';
import { TodoDTO } from '@entities/Todo/model';

import { Button } from '@shared/chakra/components/ui/button';
import { toaster, Toaster } from '@shared/chakra/components/ui/toaster';

function App() {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLInputElement | null>(null);

  const {
    data: todos,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    retry: 2
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
    onSuccess: () => {
      if (ref.current) {
        ref.current.value = '';
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const handleCreateTodoClick = () => {
    toaster.success({
      title: 'Creating...'
    });
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
            loading={isLoading}
            backgroundColor='green.500'
            onClick={handleCreateTodoClick}
          >
            {' '}
            + Добавить
          </Button>
        </HStack>
        {isFetching && <p>Loading...</p>}
        {todos && <TodoList todos={todos} />}
      </Box>
      <Toaster />
    </>
  );
}

export default App;
