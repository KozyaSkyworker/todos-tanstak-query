import { useCallback, useRef } from 'react';
import { Box, HStack, Input } from '@chakra-ui/react';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TodoList } from '@entities/Todo';
import { createTodo, getTodos } from '@entities/Todo/api';

import { Button } from '@shared/chakra/components/ui/button';
import { toaster, Toaster } from '@shared/chakra/components/ui/toaster';
import { Todo } from '@entities/Todo/model/todo.dto';

function App() {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLInputElement | null>(null);

  const {
    data: todos,
    isLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: (meta) => getTodos({ page: meta.pageParam }),
    initialPageParam: 1,
    getNextPageParam: (res) => res.next,
    select: (res) => res.pages.flatMap((page) => page.data),
    retry: 2
  });

  const cr = useIntersection(() => {
    fetchNextPage();
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);
      console.log(previousTodos);

      queryClient.setQueryData(['todos'], (old: Todo[]) => [...old, newTodo]);

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
    const val = ref.current?.value;
    if (!val) {
      alert('Empty!!!');
      return;
    }
    toaster.success({
      title: 'Creating...'
    });
    createMutation.mutate({
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
        {isFetchingNextPage && <p>Loading new page...</p>}
        <div ref={cr} />
      </Box>
      <Toaster />
    </>
  );
}

export default App;

export function useIntersection(onIntersect: () => void) {
  const unSubscribe = useRef(() => {});

  return useCallback(
    (element: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (element) {
        observer.observe(element);
        unSubscribe.current = () => observer.disconnect();
      } else {
        unSubscribe.current();
      }
    },
    [onIntersect]
  );
}
