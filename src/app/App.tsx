import { Button as ChakraButton } from '@chakra-ui/react';
import { Button } from '@shared/ui';

function App() {
  return (
    <>
      <ChakraButton>Let's start!</ChakraButton>
      <ChakraButton>Let's start!</ChakraButton>
      <Button color='primary'>Let's start 1</Button>
      <Button
        variant='solid'
        color='primary'
      >
        Let's start 2
      </Button>
      <Button background='brand.primary.black'>Let's start 3</Button>
      <ChakraButton>Let's start!</ChakraButton>
      <ChakraButton>Let's start!</ChakraButton>
    </>
  );
}

export default App;
