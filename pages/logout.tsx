import { getLayout } from '@/src/layouts/default';
import { auth } from '@/src/lib/firebase';
import styles from '@/styles/login-loader.module.scss';
import { GoogleOutlined } from '@ant-design/icons';
import { signOut } from '@firebase/auth';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function Logout() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      if (user) signOut(auth);
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className={styles.container}>
      <GoogleOutlined className={styles.googleIcon} />
      <br />
      <span style={{ color: '#343434', fontSize: '1.1rem' }}>
        <Spin /> &nbsp; Loging out...
      </span>
      <br />
      <br />
    </div>
  );
}

Logout.getLayout = getLayout;

export default Logout;
