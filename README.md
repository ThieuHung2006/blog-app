# 📝 MERN Stack Blog Application

Ứng dụng Web Blog đơn giản được xây dựng bằng kiến trúc MERN Stack (MongoDB, Express, React, Node.js) hỗ trợ quản lý bài viết và xác thực người dùng.

---

## 🚀 Tính năng chính

- **Xác thực người dùng:** Đăng ký, Đăng nhập và Đăng xuất (JWT Authentication).
- **Quản lý bài viết (CRUD):**
  - **Create:** Tạo bài viết mới kèm tiêu đề, slug, mô tả.
  - **Read:** Xem danh sách bài viết trên Trang chủ và trang Quản lý.
  - **Update:** Cập nhật nội dung tiêu đề và mô tả bài viết.
  - **Delete:** Xóa bài viết theo ID hoặc Slug.
- **Kết nối Database Cloud:** Tích hợp trực tiếp với MongoDB Atlas.

---

## 🛠 Khung công nghệ (Tech Stack)

- **Frontend:** React.js, React Router DOM, Axios, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Xác thực:** JSON Web Token (JWT)

---

## ⚙️ Hướng dẫn cài đặt và khởi chạy

### 1. Tải dự án về máy và chạy
```bash
git clone [https://github.com/ThieuHung2006/blog-app.git](https://github.com/ThieuHung2006/blog-app.git)
cd simple-blog
npm run dev
