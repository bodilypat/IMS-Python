//src/components/Layout/Sidebar.jsx

import React, { useContext } from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
	const { user } = userContext(AuthContext);
	const navItems = [
	{ label: "Dashboard", path: "/" },
	{ label: "products", path: "/products" },
	{ label: "Stock", path: "/stock" },
	{ label: "Supplier & Customers", path:"/partners" },
	...(user.role === "admin" ? [{ label: "Reports", path: "/reports" }] : []),
	];
	
	return (
		<Drawer variant="permanent" sx={{ width: 240 }}>
			<List>
				{navItems.map((item) => (
					<ListItemButton key={item.path} component={Link} to={item.path}>
						<ListItemText primary={item.label} />
					</ListItemButton>
				))}
			</List>
		</Drawer>
	),
};

export default Sidebar;


