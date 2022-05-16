import { Breadcrumb } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { NextRouter } from 'next/router';
import React, { ReactNode } from 'react';

export default function DashboardContentWrapper({ children, router }: { children: ReactNode, router: NextRouter }) {
  const breadcrumbItems = router.pathname.split('/').map((e) => {
    if (!e) return;
    return `${e[0].toUpperCase()}${e.slice(1).toLowerCase()}`;
  }).filter(Boolean);

  return (
    <Content
      className="site-layout"
      style={{ padding: '0 50px', marginTop: 64 }}
    >
      <Breadcrumb style={{ margin: '2rem 0 0 0' }}>
        {breadcrumbItems.map((e, i) => (
          <Breadcrumb.Item key={i}>{e}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          minHeight: 'calc(100vh - 64px - 70px - 22px - 32px)',
        }}
      >
        {children}
      </div>
    </Content>
  )
}
