//src/App.jsx 

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/* Core Featue Components */
import Login from "./pages/Login";
import Dashboard from "./components/Dashboards/Dashboard";
import ProductManagement from "./components/Products/ProductManagement";
import StockTransaction from "./components/Stock/StockTransaction";
import PartnerManagement from "./components/Partners";
import ReportDashboard from "./components/Reports";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

/* Layouted Route Wrapper */
function ProtectedRoute({ children, roles }) {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
    return children;
}

/* Main App Component */
export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <CssBaseline />
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

/* Separate content area for clarity */
function AppContent() {
    const { user } = useContext(AuthContext);

    /* if not Logged in, only show login route */
    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to ="/login" />} />
            </Routes>
        );
    }

    /* Logged-in users (Admin or Staff) */
    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar and Header visible only when authenticated  */}
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh"}}>
                <Header />
                
                <Routes>
                    {/* Dashboard */}
                    <Route path="/" 
                           element={ <ProtectedRoute roles={["admin", "staff"]}>
                                <Dashboard />
                           </ProtectedRoute>
                        }
                    />

                    {/* Product Management */}
                    <Route 
                        path="/products"
                        element={
                            <ProtectedRoute roles={["admin", "staff"]}>
                                <ProductManagement />
                            </ProtectedRoute>
                        }
                    />

                    {/* Stock Managements */}    
                    <Route 
                        path="/stock"
                        element= {
                            <ProtectedRoute roles={["admin", "staff"]}>
                                <StockTransaction />
                            </ProtectedRoute>
                        }
                    />

                    {/* Supplier & Customer Management */}
                    <Route 
                        path="/partners"
                        element={
                                <ProtectedRoute roles={["admin", "staff"]}>
                                    <PartnerManagement />
                                </ProtectedRoute>
                            }
                        />
                    
                    {/* Reports (Admin Only) */}
                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <ReportDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Unauthorized / 404 Pages */}
                    <Route path="/unautorized" element={<Unauthorized />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    )
}