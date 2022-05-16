import 'antd/dist/antd.css';
import '@/styles/globals.scss';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60000,
    },
  },
});

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((Page: any) => <Page />);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
