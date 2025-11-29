// src/pages/products/ProductList.jsx 

/* Fetching from API */
/* Loading & errors states */
/* Table view */
/* Edit / View / Delete actions */
/* Search + refresh */
/* Ready for integration with backend API  */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import SearchBar from '../../components/SearchBar';
import ProductTable from '../../components/tables/ProductTable';
import { fetchProducts, deleteProduct } from '../../services/productService';
import { Button } from '../../components/ui/Button';
import { FaPlus } from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    /* Fetch products from API */
    const loadProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchProducts(searchQuery);
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [searchQuery]);

    /* Handle Delete Product */
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            setError('Failed to delete product.');
        }
    };

    /* Handler */
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    const handleRefresh = () => {
        loadProducts();
    };
    const handleAddProduct = () => {
        navigate('/products/new');
    };

    /* Render */

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="product-list-page">
            <div className="header">
                <h1>Product List</h1>
                <Button onClick={handleAddProduct}>
                    <FaPlus /> Add Product
                </Button>
            </div>
            <SearchBar onSearch={handleSearch} onRefresh={handleRefresh} />
            <ProductTable
                data={products}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Price', accessor: 'price' },
                    { header: 'Category', accessor: 'category' },
                    {
                        header: 'Actions',
                        accessor: 'actions',
                        cell: (row) => (
                            <div>
                                <Button onClick={() => navigate(`/products/view/${row.id}`)}>View</Button>
                                <Button onClick={() => navigate(`/products/edit/${row.id}`)}>Edit</Button>
                                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default ProductList;
