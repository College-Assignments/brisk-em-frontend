import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

const navbarItems = [
  {
    key: 'home',
    label: 'Home',
  },
  {
    key: 'users',
    label: 'Users',
  },
  {
    key: 'tests',
    label: 'Tests',
  },
];

function TeachersDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    setSelected(router.pathname.replace('/teacher/', ''));
    console.log(router.pathname.replace('/teacher/', ''));
  }, [router.pathname]);

  return (
    <Layout>
      <Head>
        <title>Teacher Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selected]}>
          {navbarItems.map(({ key, label }) => (
            <Menu.Item key={key} onClick={() => router.push(`/teacher/${key}`)}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>_</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 'calc(100vh - 64px - 70px - 22px - 32px)',
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by ©Suraj Mandal 2022</Footer>
    </Layout>
  );
}

export const getLayout = (page: any) => <TeachersDashboardLayout>{page}</TeachersDashboardLayout>;

export default TeachersDashboardLayout;
