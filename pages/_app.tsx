import 'antd/dist/antd.css';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((Page: any) => <Page />);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
