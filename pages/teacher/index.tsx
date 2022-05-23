import { BASE_URL } from '@/src/constants/base';
import { getLayout } from '@/src/layouts/default';
import { auth, formatFirebaseUser } from '@/src/lib/firebase';
import styles from '@/styles/login-loader.module.scss';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

function Teacher() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    useEffect(() => {
        async function postUser() {
            if (user) {
                await axios({
                    method: 'POST',
                    url: `${BASE_URL}/api/auth`,
                    data: formatFirebaseUser(user),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        }
        postUser();
    }, [user]);

    useEffect(() => {
        if (!loading) {
            console.log('Inside loading');
            if (!user) {
                signInWithGoogle().then(() => {
                    // router.push('/teacher/home');
                });
            } else {
                // router.push('/teacher/home');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

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

Teacher.getLayout = getLayout;

export default Teacher;
