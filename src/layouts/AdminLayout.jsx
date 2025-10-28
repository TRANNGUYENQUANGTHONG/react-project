import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AdminLayout() {
  const navigate= useNavigate();
  const clickUserManager=()=>{
      navigate("/admin/users");
  }
  const clickProductManager=()=>{
      navigate("/admin/products");
  }
  // hàm đăng xuất tài khoản
  const logout= ()=>{
    const confirm_logout= confirm("bạn có chắc chắn muốn thoát không?");
    if(confirm_logout){
      localStorage.removeItem("isLogin");
      navigate("/login");
    }
  }
  return (
   <>
        <div>
          giao diện layout chung trang admin <hr />
          <button onClick={logout}>logout</button>
          <p>header</p>
          <p onClick={clickUserManager}>quản lý user</p>
          <p onClick={clickProductManager}>quản lý sản phẩm</p>
        </div>
        <hr />
        <Outlet></Outlet> {/* chức năng hiển thị các component con! */}
   </>
  )
}
