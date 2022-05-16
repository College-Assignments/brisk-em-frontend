import { BookFilled, CheckOutlined, HomeFilled, LogoutOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import DashboardContentWrapper from '../components/content-wrapper';
import DashboardHeader from '../components/header';

function StudentsDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('home');

  useEffect(() => {
    setSelected(router.pathname.replace('/student/', ''));
  }, [router.pathname]);

  return (
    <Layout>
      <Head>
        <title>Student Dashboard</title>
      </Head>
      <DashboardHeader
        router={router}
        basepath="student"
        selected={selected}
        navbarItems={navbarItems}
      />
      <DashboardContentWrapper router={router}>
        {children}
      </DashboardContentWrapper>
      <Footer style={{ textAlign: 'center' }}>
        Created by ©Suraj Mandal 2022
      </Footer>
    </Layout>
  );
}

const logoStyle: CSSProperties = {
  fontSize: '1.2rem',
  fontFamily: 'Overpass',
  textDecoration: 'underline',
};

const navbarItems = [
  {
    icon: <HomeFilled />,
    key: 'home',
    label: 'Home',
  },
  {
    icon: <BookFilled />,
    key: 'tests',
    label: 'Available Tests',
  },
  {
    icon: <CheckOutlined />,
    key: 'results',
    label: 'My Results',
  },
  {
    icon: <LogoutOutlined />,
    key: '../logout',
    label: 'Logout',
    style: {
      marginLeft: 'auto',
    },
  },
];

export const getLayout = (page: any) => (
  <StudentsDashboardLayout>{page}</StudentsDashboardLayout>
);

export default StudentsDashboardLayout;
