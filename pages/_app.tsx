import 'antd/dist/antd.css';
import '@/styles/globals.scss';

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
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
