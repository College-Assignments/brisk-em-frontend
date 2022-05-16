import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { NextRouter } from 'next/router';
import { CSSProperties } from 'react';

function DashboardHeader({ selected, basepath, navbarItems, router }: { selected: string, basepath: string, navbarItems: any[], router: NextRouter }) {

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: '1.85rem' }}>
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
            onClick={() => router.push(`/${basepath}/${key}`)}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  )
}

const logoStyle: CSSProperties = {
  fontSize: '1.2rem',
  fontFamily: 'Overpass',
  textDecoration: 'underline',
};

export default DashboardHeader;