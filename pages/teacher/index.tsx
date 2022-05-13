import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../src/lib/firebase';
import styles from './../common/login-loader.module.scss';

export default function Student() {
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (!loading) {
      if (!user?.uid) signInWithGoogle();
      else console.log('already logged in');
    }
  }, [loading, signInWithGoogle, user?.uid]);

  return (
    <div className={styles.container}>
      <GoogleOutlined className={styles.googleIcon} />
      <br />
      <br />
      <Button size="middle" onClick={() => signInWithGoogle()}>
        Re-Authenticate
      </Button>
    </div>
  );
}
