import { createSystem, defaultConfig, defineConfig, defineTokens } from '@chakra-ui/react';
import { buttonRecipe } from '../recipes';

const tokens = defineTokens({
  colors: {
    primary: { value: 'teal' },
    brand: {
      primary: {
        black: { value: 'blue' }
      }
    }
  }
});

const config = defineConfig({
  theme: {
    tokens: tokens,
    recipes: {
      dontConflictWithLiterallyChakraButton: buttonRecipe
    }
  }
});

export const system = createSystem(defaultConfig, config);
