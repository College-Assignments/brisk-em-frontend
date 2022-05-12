import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './../common/login-loader.module.scss';

import type { NextPage } from 'next';
const Student: NextPage = () => {
  return (
    <div className={styles.container}>
      <GoogleOutlined className={styles.googleIcon} />
      <br />
      <br />
      <Button size="middle">Reopen Dialog</Button>
    </div>
  );
};

export default Student;
