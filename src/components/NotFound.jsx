// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '100px',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ fontSize: '72px', color: '#e74c3c' }}>404</h1>
      <h2>Trang bạn tìm không tồn tại</h2>
      <p style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: '#3498db', textDecoration: 'none' }}>
          ← Về trang chủ
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
