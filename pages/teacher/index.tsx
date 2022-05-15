import styles from '@/pages/common/login-loader.module.scss';
import { getLayout } from '@/src/layouts/default';
import { auth } from '@/src/lib/firebase';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

function Student() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (!user?.uid) signInWithGoogle();
        else router.push('/teacher/home');
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

Student.getLayout = getLayout;

export default Student;
