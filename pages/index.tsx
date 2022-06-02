import { getLayout } from '@/src/layouts/default';
import { GoogleOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/home.module.scss';

function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, []);

  const handleNavigation = (route: string) => {
    setLoading(true);
    router.push(route);
  };

  return (
    <div className={styles.container}>
      <div className={styles.teacher}>
        <Button
          onClick={() => handleNavigation('/teacher')}
          loading={loading}
          type="primary"
          size="large"
          icon={<GoogleOutlined />}
        >
          Teacher Login
        </Button>
      </div>
      <div className={styles.student}>
        <Button
          onClick={() => handleNavigation('/student')}
          loading={loading}
          type="primary"
          size="large"
          icon={<GoogleOutlined />}
        >
          Student Login
        </Button>
      </div>
    </div>
  );
}

Home.getLayout = getLayout;

export default Home;
