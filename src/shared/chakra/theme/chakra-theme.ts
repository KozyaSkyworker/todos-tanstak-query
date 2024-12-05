import { createSystem, defaultConfig, defineTokens } from '@chakra-ui/react';

const tokens = defineTokens({
  colors: {
    primary: { value: 'teal' }
  }
});

export const system = createSystem(defaultConfig, {
  theme: { tokens }
});
