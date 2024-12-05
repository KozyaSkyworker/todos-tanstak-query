import { Box, Text, HStack } from '@chakra-ui/react';
import { Checkbox } from '@shared/chakra/components/ui/checkbox';
import { TodoDTO } from '../model';

const TodoList = ({ todos }: { todos: TodoDTO[] }) => {
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
            backgroundColor='gray.100'
            _hover={{ cursor: 'pointer', bg: `${todo.isDone ? 'green.100' : 'red.100'}` }}
          >
            <Text>{index + 1}.</Text>
            <Text flexGrow={'1'}>{todo.text}</Text>
            <Checkbox checked={todo.isDone} />
          </HStack>
        );
      })}
    </Box>
  );
};

export default TodoList;
