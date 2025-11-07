//src/app.jsx

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DashboardLayout from './layouts/dashbordLayout';
import AuthLayout from './layouts/authLayout';
import Dashboard from './pages/Dashboard/dashboard'
import ProductList from './pages/Products/productList';
import AddProduct from './pages/Products/addProduct';
import EditProduct from './pages/Products/editProduct';
import Login from './pages/Auth/login';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/add" element={<AddProduct />} />
                    <Route path="/products/edit" element={<EditProduct />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;