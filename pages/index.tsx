import { GoogleOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';

import styles from '../styles/Home.module.scss';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.teacher}>
        <Button type="primary" size="large" icon={<GoogleOutlined />}>
          Teacher Login
        </Button>
      </div>
      <div className={styles.student}>
        <Button type="primary" size="large" icon={<GoogleOutlined />}>
          Student Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
