import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 1. Hàm Đăng ký tài khoản mới
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });
      setMessage("Đăng ký thành công! Bạn có thể bấm Đăng nhập ngay.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  // 2. Hàm Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/manage-posts";
    } catch (err) {
      setMessage(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div>
      <h2>Đăng Nhập / Đăng Ký</h2>
      {message && <p style={{ color: "blue", fontWeight: "bold" }}>{message}</p>}
      <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="button" onClick={handleRegister}>
            Đăng ký
          </button>
          <button type="button" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;