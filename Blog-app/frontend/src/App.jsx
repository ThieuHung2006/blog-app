import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import ManagePosts from "./pages/ManagePosts";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div>
            <nav style={{ padding: "15px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
                <Link to="/">Trang chủ</Link> {" | "}
                {token ? (
                    <>
                        <Link to="/manage-posts">Quản lý bài viết</Link> {" | "}
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </>
                ) : (
                    <Link to="/login">Đăng nhập</Link>
                )}
            </nav>

            <main style={{ maxWidth: "800px", margin: "auto" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/newpost" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
                    <Route path="/manage-posts" element={<ProtectedRoute><ManagePosts /></ProtectedRoute>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;