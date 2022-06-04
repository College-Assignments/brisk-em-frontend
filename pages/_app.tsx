import '@/styles/globals.scss';
import 'antd/dist/antd.css';

import { BASE_URL2 } from '@/src/constants/base';
import { getLayout as defaultLayout } from '@/src/layouts/default';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      // retry: false,
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: any) {
  const getLayout: any = Component?.getLayout || defaultLayout;

  useEffect(() => {
    const BASE_URL2X = localStorage.getItem('BASE_URL2');
    if (!BASE_URL2X) {
      localStorage.setItem('BASE_URL2', BASE_URL2);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
