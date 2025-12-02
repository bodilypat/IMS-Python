// src/pages/sales/SaleOrderEdit.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import saleOrderService from '../../services/saleOrderService';
import SaleOrderForm from '../../components/forms/SaleOrderForm';
import Button from '../../components/ui/Button';

type Item = {
    id?: string;
    price: number;
    quantity: number;
    [key: string]: any;
};

type SaleOrder = {
    id: string;
    items: Item[];
    totalAmount?: number;
    [key: string]: any;
};

const SaleOrderEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [saleOrder, setSaleOrder] = useState<SaleOrder | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    const loadOrder = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await saleOrderService.getSaleOrderById(id);
            if (!response?.success) {
                throw new Error(response?.message || 'Failed to load sale order.');
            }
            setSaleOrder(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to load sale order.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!mounted) return;
            await loadOrder();
        })();
        return () => {
            mounted = false;
        };
    }, [loadOrder]);

    const handleSubmit = async (updatedOrder: Partial<SaleOrder> & { items?: Item[] }) => {
        setSaving(true);
        setError(null);
        try {
            const items = Array.isArray(updatedOrder.items) ? updatedOrder.items : [];
            const totalAmount = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

            const payload = {
                ...updatedOrder,
                totalAmount,
            };

            const response = await saleOrderService.updateSaleOrder(id, payload);
            if (!response?.success) {
                throw new Error(response?.message || 'Failed to update sale order.');
            }
            history.push('/sales/orders');
        } catch (err: any) {
            setError(err.message || 'Failed to update sale order.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) {
        return (
            <div className="p-4">
                <div className="error">Error: {error}</div>
                <Button onClick={loadOrder}>Retry</Button>
            </div>
        );
    }

    if (!saleOrder) {
        return (
            <div className="p-4">
                <div className="error">Sale order not found.</div>
                <Button onClick={() => history.push('/sales/orders')}>Back to Orders</Button>
            </div>
        );
    }

    return (
        <SaleOrderForm
            initialData={saleOrder}
            onSubmit={handleSubmit}
            saving={saving}
        />
    );
};

export default SaleOrderEdit;
