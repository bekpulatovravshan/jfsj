import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Badge, Layout, Menu } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { siderData } from '../data';
import { Orders, Others, Product } from '../page';

const { Header, Content, Footer, Sider } = Layout;

const User = () => {
  const [collapsed, setCollapsed] = useState(false);

  const routeData = [
    {
      path: '/',
      element: <Product />,
    },
    {
      path: '/orders',
      element: <Orders />,
    },
    {
      path: '/others',
      element: <Others />,
    },
  ];
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <h2 className="text-2xl text-white font-bold p-6">logo</h2>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={siderData.map((el) => {
            return {
              key: el.key,
              icon: el.icon,
              label: <Link to={el.path}>{el.label}</Link>,
            };
          })}
        />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-10 mt-5 mr-16">
             <Badge count={1}>
                <BellOutlined style={{fontSize: "150%"}}/>
             </Badge>
              <Badge
                count={2}
                offset={[5, 0]}>
                <UserOutlined style={{ fontSize: '150%' }} />
              </Badge>
            </div>
          </div>
        </Header>
        <Content className="my-0 mx-4">
          <div className="p-6 bg-white min-h-96 mt-16 rounded-lg">
            <Routes>
              {routeData.map((el) => (
                <Route
                  path={el.path}
                  element={el.element}
                />
              ))}
            </Routes>
          </div>
        </Content>
        <Footer className="text-center text-xl">
          Golden Soft ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default User;
