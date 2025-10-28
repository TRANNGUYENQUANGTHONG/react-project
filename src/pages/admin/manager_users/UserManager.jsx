import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Tag, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/users');
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      message.error('Lỗi khi tải danh sách người dùng');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    const keyword = value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(keyword)
    );
    setFilteredUsers(filtered);
  };

  const handleFilterStatus = (status) => {
    if (status === 'all') setFilteredUsers(users);
    else setFilteredUsers(users.filter(user => user.status === status));
  };

  const handleDelete = (user) => {

    if (user.role === 'admin') {
      message.warning('Không thể xóa tài khoản ADMIN');
      return;
    }

     axios.delete(`http://localhost:8080/users/${user.id}`);
     message.success('Đã xóa người dùng');
     fetchUsers();
   
     const { confirm } = Modal;
    
  confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button onClick={()=> alert("ok")}>Click to destroy all</Button>,
        onOk() {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  };


  const openAddForm = () => {
    setEditingUser(null);
    form.resetFields();
    setOpenModal(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await axios.put(`http://localhost:8080/users/${editingUser.id}`, values);
        message.success('Cập nhật thành công');
      } else {
        const exists = await axios.get(`http://localhost:8080/users?email=${values.email}`);
        console.log(exists.data);
        if (exists.data.length > 0) {
          message.error('Email đã tồn tại');
          return;
        }
        values.status = 'active';
        values.role = 'user';
        await axios.post('http://localhost:8080/users', values);
        message.success('Thêm mới thành công');
      }
      fetchUsers();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      message.error('Đã xảy ra lỗi khi lưu');
    }
  };

  const columns = [
    { title: 'Họ và tên',  width: 200, dataIndex: 'name', sorter: (a,b) => a.name.localCompare(b.name),
        //const lastA = a.name.trim().split('').slice(-1)[0];
        //const lastB = b.name.trim().split('').slice(-1)[0];
        //return lastA.localeCompare(lastB);}
    
  },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Ngày sinh',
      dataIndex: 'birth',
      render: (birth) => <div style={{ whiteSpace: 'nowrap', minWidth: 120 }}>{birth}</div>
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>{role}</Tag>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditForm(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm theo tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          enterButton
          allowClear
          style={{ width: 300 }}
        />
        <Select defaultValue="all" onChange={handleFilterStatus} style={{ minWidth: 160 }}>
          <Option value="all">Tất cả</Option>
          <Option value="active">Đang hoạt động</Option>
          <Option value="inactive">Ngừng hoạt động</Option>
        </Select>
        <Button icon={<PlusOutlined />} type="primary" onClick={openAddForm}>
          Thêm mới
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 5,                  // hiển thị 5 người / trang
          position: ['bottomCenter'],   // 👈 hiển thị ngang ở giữa
        }}
      />

      <Modal
  title={editingUser ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
  open={openModal}
  onCancel={() => setOpenModal(false)}
  onOk={handleSave}
  okText="Lưu"
  cancelText="Hủy"
>
  <Form form={form} layout="vertical">
    <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Không được để trống' }]}>
      <Input />
    </Form.Item>

    <Form.Item
  name="email"
  label="Email"
  rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
>
  <Input />
</Form.Item>

<Form.Item
  name="password"
  label="Mật khẩu"
  rules={[{ required: true, message: 'Không được để trống' }, { min: 8, message: 'Tối thiểu 8 ký tự' }]}
>
  <Input.Password />
</Form.Item>


    <Form.Item name="birth" label="Ngày sinh">
      <Input placeholder="YYYY-MM-DD" />
    </Form.Item>

    <Form.Item name="status" label="Trạng thái" initialValue="active">
      <Select>
        <Option value="active">Đang hoạt động</Option>
        <Option value="inactive">Ngừng hoạt động</Option>
      </Select>
    </Form.Item>
    
    {editingUser && (
      <Form.Item name="role" label="Vai trò">
        <Select disabled>
          <Option value="admin">admin</Option>
          <Option value="user">user</Option>
        </Select>
      </Form.Item>
    )}
  </Form>
</Modal>
    </div>
  );
}  