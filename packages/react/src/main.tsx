import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import './index.css';

const queryCLient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Will retry to fetch the data 3 times before displaying an error
      staleTime: 5000, // the data will be considered fresh for 5s
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryCLient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
