import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/posts");
      setPosts(res.data);
    } catch (err) {
      setMessage("Không thể tải danh sách bài viết.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Lỗi: Không tìm thấy ID bài viết!");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Xóa bài viết thành công!");
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Xóa bài viết thất bại!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản Lý Bài Viết</h2>
      <Link to="/newpost" style={{ display: "inline-block", marginBottom: "15px" }}>
        + Tạo bài viết mới
      </Link>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Slug</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.slug}</td>
              <td>
                <button
                  onClick={() => handleDelete(post._id)} // Lưu ý: PHẢI LÀ post._id
                  style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePosts;