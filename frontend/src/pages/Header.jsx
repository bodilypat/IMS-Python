//src/components/Layout/Header.jsx

import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@nui/material";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static" color="default" sx={{ mb: 2}}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Inventory Management System</Typography>
                    <div>
                        <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                            {user.name} ({user.role})
                        </Typography>
                        <Button variant="contained" color="error" onClick={logout}>Logout</Button>
                     </div>
            </Toolbar>
        </AppBar>
    );
}