import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/users?email=${values.email}`);
      const user = res.data[0];

      if (!user || user.password !== values.password) {
        alert('Tài khoản hoặc mật khẩu không đúng');
        message.error('Email hoặc mật khẩu không đúng');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', 'fake_token_example');
      localStorage.setItem('user', JSON.stringify(user));
      message.success('Đăng nhập thành công!');

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      message.error('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f2f5'
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Title>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              {type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
