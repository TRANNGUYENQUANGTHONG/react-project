// Register.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/users?email=${values.email}`);
      if (res.data.length > 0) {
        message.error('Email đã được đăng ký');
        setLoading(false);
        return;
      }

      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password, // Không dùng mã hóa bcrypt
        role: 'user',
        status: 'active'
      };

      await axios.post('http://localhost:8080/users', newUser);
      message.success('Đăng ký thành công!');
      navigate('/login');
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
        <Title level={3} style={{ textAlign: 'center' }}>Đăng ký</Title>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 8, message: 'Mật khẩu phải ít nhất 8 ký tự!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không trùng khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ required: true, message: 'Bạn phải đồng ý với điều khoản!' }]}
          >
            <Checkbox>Tôi đồng ý với điều khoản sử dụng</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
