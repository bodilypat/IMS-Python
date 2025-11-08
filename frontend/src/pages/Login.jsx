//src/pages/Login.jsx

import react, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axious";
import { AuthContext } from "../content/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...FormData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/inventory:5000/api/auth/login", form);
            login(response.data);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" mb={2}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={form.email}
                        onChange={handleChange}
                        />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
                </form>
            </Paper>
        </Box>
    );
}