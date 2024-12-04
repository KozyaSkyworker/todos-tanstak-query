import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from '@shared/chakra/components/ui/provider.tsx';

import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/api/query-client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
