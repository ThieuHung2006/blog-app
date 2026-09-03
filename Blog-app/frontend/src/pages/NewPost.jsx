import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Bạn chưa đăng nhập! Vui lòng đăng nhập lại.");
      return;
    }

    // Tự động tạo slug từ title nếu người dùng bỏ trống ô slug
    const finalSlug = slug.trim() !== "" 
      ? slug 
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Tự động tạo description từ content nếu bỏ trống
    const finalDescription = description.trim() !== "" 
      ? description 
      : content.substring(0, 100);

    try {
      await axios.post(
        "http://localhost:8080/api/posts",
        { 
          title, 
          slug: finalSlug, 
          description: finalDescription,
          content 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Tạo bài viết thành công!");
      navigate("/manage-posts");
    } catch (err) {
      setMessage(err.response?.data?.message || "Không thể tạo bài viết.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thêm Bài Viết Mới</h2>
      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "450px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Tiêu đề (*):</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ width: "100%", padding: "8px" }} 
            placeholder="Nhập tiêu đề bài viết"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Slug (Đường dẫn ngắt):</label>
          <input 
            type="text" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            style={{ width: "100%", padding: "8px" }} 
            placeholder="Ví dụ: bai-viet-dau-tien (Tự tạo nếu để trống)"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Mô tả ngắn (Description) (*):</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: "100%", padding: "8px" }} 
            placeholder="Tóm tắt ngắn gọn nội dung"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Nội dung (*):</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            rows={5} 
            style={{ width: "100%", padding: "8px" }} 
            placeholder="Nội dung chi tiết bài viết..."
          />
        </div>
        <button type="submit" style={{ padding: "10px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          Tạo Bài Viết
        </button>
      </form>
    </div>
  );
}

export default NewPost;