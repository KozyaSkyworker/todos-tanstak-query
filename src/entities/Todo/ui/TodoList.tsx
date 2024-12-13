import { Box, Text, HStack, Button } from '@chakra-ui/react';
import { Checkbox } from '@shared/chakra/components/ui/checkbox';
import { TodoDTO } from '../model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../api';
import { toggleTodo } from '../api/toggle-todo';

const TodoList = ({ todos }: { todos: TodoDTO[] }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (deletedTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: TodoDTO[]) =>
        old.filter((todo) => todo.id !== deletedTodo)
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async (toggledTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData(['todos']);

      queryClient.setQueryData(['todos'], (old: TodoDTO[]) =>
        old.map((todo) => {
          if (todo.id === toggledTodo.id) {
            return {
              ...todo,
              isDone: !todo.isDone
            };
          }

          return todo;
        })
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  return (
    <Box
      as='ul'
      listStyleType='digit'
      marginY='35px'
    >
      {todos?.map((todo, index) => {
        return (
          <HStack
            key={todo.id}
            marginY='20px'
            padding={'20px 0 20px 20px'}
            borderLeft={'2px solid transparent'}
            borderColor={`${todo.isDone ? 'green.500' : 'red'}`}
            backgroundColor={`${todo.isDone ? 'green.100' : 'gray.50'}`}
            _hover={{ bg: `${todo.isDone ? 'green.100' : 'red.100'}` }}
            opacity={`${todo.isDone ? '.5' : '1'}`}
          >
            <Text>{index + 1}.</Text>
            <Text flexGrow={'1'}>{todo.text}</Text>
            <Checkbox
              cursor={'pointer'}
              checked={todo.isDone}
              onCheckedChange={() => {
                toggleMutation.mutate({
                  ...todo,
                  isDone: !todo.isDone
                });
              }}
            />
            <Button
              backgroundColor={'red.500'}
              _hover={{ backgroundColor: 'red.600' }}
              onClick={() => {
                deleteMutation.mutate(todo.id);
              }}
            >
              Удалить
            </Button>
          </HStack>
        );
      })}
    </Box>
  );
};

export default TodoList;
