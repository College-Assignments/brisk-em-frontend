import { Breadcrumb, Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';

const navbarItems = [
  {
    key: 'home',
    label: 'Home',
  },
  {
    key: 'students',
    label: 'Students',
  },
  {
    key: 'teachers',
    label: 'Teachers',
  },
  {
    key: 'exams',
    label: 'Exams',
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} items={navbarItems} />
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
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by ©Suraj Mandal 2022</Footer>
    </Layout>
  );
}
