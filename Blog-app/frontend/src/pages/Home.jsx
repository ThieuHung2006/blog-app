import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await axiosClient.get("/posts");
                setPosts(res.data);
            } catch (err) {
                setError("Không thể tải danh sách bài viết.");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) return <h2>Đang tải bài viết...</h2>; // Trạng thái Loading
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>; // Trạng thái Error

    return (
        <div>
            <h1>Danh Sách Bài Viết</h1>
            {posts.length === 0 ? <p>Chưa có bài viết nào.</p> : (
                posts.map((post) => (
                    <div key={post._id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px", borderRadius: "5px" }}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <small>Slug: {post.slug}</small>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;