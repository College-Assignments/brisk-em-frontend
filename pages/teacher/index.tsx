import { GoogleOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../src/lib/firebase';
import styles from './../common/login-loader.module.scss';

export default function Student() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (!user?.uid) signInWithGoogle();
        else router.push('/teacher/dashboard');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, router, user?.uid, signInWithGoogle]);

  return (
    <div className={styles.container}>
      <GoogleOutlined className={styles.googleIcon} />
      <br />
      <span style={{ color: '#343434', fontSize: '1.1rem' }}>
        <Spin /> &nbsp; Logging In...
      </span>
      <br />
      <br />
      <Button size="middle" onClick={() => signInWithGoogle()}>
        Re-Authenticate
      </Button>
    </div>
  );
}
