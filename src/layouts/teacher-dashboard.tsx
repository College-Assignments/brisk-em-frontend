import { BookFilled, CheckOutlined, HomeFilled, LogoutOutlined, RobotOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import DashboardContentWrapper from '../components/content-wrapper';
import DashboardHeader from '../components/header';

function TeachersDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('home');

  useEffect(() => {
    setSelected(router.pathname.replace('/teacher/', ''));
  }, [router.pathname]);

  return (
    <Layout>
      <Head>
        <title>Teacher Dashboard</title>
      </Head>
      <DashboardHeader
        key="key"
        router={router}
        basepath="teacher"
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

const navbarItems = [
  {
    icon: <HomeFilled />,
    key: 'home',
    label: 'Home',
  },
  {
    icon: <BookFilled />,
    key: 'tests',
    label: 'Tests',
  },
  {
    icon: <RobotOutlined />,
    key: 'ai',
    label: 'AI Tools',
  },
  {
    icon: <CheckOutlined />,
    key: 'results',
    label: 'Results',
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
  <TeachersDashboardLayout>{page}</TeachersDashboardLayout>
);

export default TeachersDashboardLayout;
