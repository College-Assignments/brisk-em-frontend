import { BookFilled, CheckOutlined, HomeFilled, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CSSProperties, ReactElement, ReactNode, useEffect, useState } from 'react';

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
    icon: <CheckOutlined />,
    key: 'results',
    label: 'Results',
  },
  {
    icon: <LogoutOutlined />,
    key: 'logout',
    label: 'Logout',
    style: {
      marginLeft: 'auto',
    },
  },
];

function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('home');

  useEffect(() => {
    setSelected(router.pathname.replace('/student/', ''));
    console.log(router.pathname.replace('/student/', ''));
  }, [router.pathname]);

  return (
    <Layout>
      <Head>
        <title>Student Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selected]}
          style={{ display: 'flex' }}
        >
          <Menu.Item key="logo" style={logoStyle}>
            Brisk EM
          </Menu.Item>
          {navbarItems.map(({ key, label, icon, style }) => (
            <Menu.Item
              key={key}
              icon={icon}
              style={style}
              onClick={() => router.push(`/teacher/${key}`)}
            >
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
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
      <Footer style={{ textAlign: 'center' }}>
        Created by ©Suraj Mandal 2022
      </Footer>
    </Layout>
  );
}

const logoStyle: CSSProperties = {
  paddingTop: 2,
  marginBottom: -2,
  fontSize: '1.2rem',
  fontFamily: 'Overpass',
  textDecoration: 'underline',
};

export const getLayout = (page: any) => (
  <StudentDashboardLayout>{page}</StudentDashboardLayout>
);

export default StudentDashboardLayout;
