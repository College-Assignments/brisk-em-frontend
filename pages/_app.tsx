import '@/styles/globals.scss';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((Page: any) => <Page />);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
