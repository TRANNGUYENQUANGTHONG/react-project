// Dashboard.jsx
import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserManager from '../manager_users/UserManager'; // cần tạo file này sau (đã hỗ trợ hiển thị ngày sinh)

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [selectedMenu, setSelectedMenu] = useState('users');

  const handleLogout = () => {
    navigate('/Login');
    ({
      title: 'Xác nhận đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất không?',
      onOk: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        message.success('Đã đăng xuất!');
        navigate('/Login');
      },
    });
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'users':
        return <UserManager showBirthDate={true} />; // Gọi UserManager với props để hiển thị ngày sinh
      default:
        return <p>Chọn danh mục từ menu để quản lý.</p>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: '#fff', padding: '30px', textAlign: 'center' }}>
          Quản lý Admin
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedMenu]} onClick={(e) => setSelectedMenu(e.key)}>
          <Menu.Item key="users" icon={<UserOutlined />}>Tài khoản</Menu.Item>
        </Menu>
        <div style={{ padding: 16 }}>
          <div  style={{ paddingBottom: 16}}><Button>Thống kê</Button></div>
          <Button icon={<LogoutOutlined />} onClick={handleLogout} block>
            Đăng xuất
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', fontSize:'30px', width:'200px'}}>
          <div>Tài khoản</div>
        </Header>
        <Content style={{ margin: '16px', background: '#fff', padding: '24px', minHeight: '280px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
