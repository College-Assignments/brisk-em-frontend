import { HighlightOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';

import styles from '../styles/Home.module.scss';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.teacher}>
        <Button type="primary" size="large" icon={<UserOutlined />}>
          Teacher Login
        </Button>
      </div>
      <div className={styles.student}>
        <Button type="primary" size="large" icon={<HighlightOutlined />}>
          Student Login
        </Button>
      </div>
    </div>
  );
};

export default Home;
