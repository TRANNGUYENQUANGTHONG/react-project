// ProductManager.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd';
import axios from 'axios';

const { Option } = Select;

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/products');
      setProducts(res.data);
    } catch (err) {
      message.error('Lỗi tải dữ liệu sản phẩm');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (record = null) => {
    setEditingProduct(record);
    form.setFieldsValue(record || {});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8080/products/${id}`);
          message.success('Đã xóa sản phẩm');
          fetchProducts();
        } catch (err) {
          message.error('Lỗi khi xóa');
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (editingProduct) {
        await axios.put(`http://localhost:8080/products/${editingProduct.id}`, values);
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await axios.post('http://localhost:8080/products', values);
        message.success('Thêm mới sản phẩm thành công');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      message.error('Lỗi khi lưu');
    }
  };

  return (
    <div>
      <h2>Quản lý Sản phẩm</h2>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>Thêm sản phẩm</Button>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={products}
        columns={[
          { title: 'Tên sản phẩm', dataIndex: 'name' },
          { title: 'Giá', dataIndex: 'price' },
          { title: 'Loại', dataIndex: 'category' },
          {
            title: 'Hành động',
            render: (_, record) => (
              <Space>
                <Button onClick={() => openModal(record)}>Sửa</Button>
                <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
              </Space>
            )
          }
        ]}
      />

      <Modal
        open={isModalOpen}
        title={editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Bắt buộc' }]}> <Input /> </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Bắt buộc' }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="category" label="Loại" rules={[{ required: true, message: 'Bắt buộc' }]}> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
