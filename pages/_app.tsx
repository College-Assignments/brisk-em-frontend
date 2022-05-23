import 'antd/dist/antd.css';
import '@/styles/globals.scss';

import { getLayout as defaultLayout } from '@/src/layouts/default';
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
    const getLayout: any = Component?.getLayout || defaultLayout;

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp;
