const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

async function register(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Tên tài khoản đã tồn tại." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({
            message: "Đăng ký thành công.",
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server." });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Tài khoản hoặc mật khẩu không đúng." });
        }

        const token = generateToken(user);
        res.json({
            message: "Đăng nhập thành công.",
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi Server." });
    }
}

function logout(req, res) {
    res.json({ message: "Đăng xuất thành công." });
}

module.exports = { register, login, logout };