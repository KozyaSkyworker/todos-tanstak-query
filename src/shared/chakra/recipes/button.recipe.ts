import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  variants: {
    variant: {
      solid: { bg: 'red.200', color: 'white', _hover: { bg: 'red.500' } },
      outline: { borderWidth: '1px', borderColor: 'red.200' }
    },
    size: {
      sm: { padding: '4', fontSize: '12px' },
      lg: { padding: '8', fontSize: '24px' }
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'sm'
  }
});
