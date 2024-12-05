import { Box, HStack, Input } from '@chakra-ui/react';
import { TodoList } from '@entities/Todo';
import { getTodos } from '@entities/Todo/api/get-todos';
import { Button } from '@shared/chakra/components/ui/button';
import { useQuery } from '@tanstack/react-query';

function App() {
  const { data: todos, isFetching } = useQuery({
    queryKey: ['todos', 'list'],
    queryFn: getTodos
  });
  return (
    <>
      <Box
        maxWidth={'800px'}
        margin={'0 auto'}
      >
        <HStack>
          <Input />
          <Button
            loading={isFetching}
            backgroundColor='green.500'
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
