import { getLayout } from '@/src/layouts/default';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './../common/login-loader.module.scss';

const Student = () => {
  return (
    <div className={styles.container}>
      <GoogleOutlined className={styles.googleIcon} />
      <br />
      <br />
      <Button size="middle">Reopen Dialog</Button>
    </div>
  );
};

Student.getLayout = getLayout;

export default Student;
