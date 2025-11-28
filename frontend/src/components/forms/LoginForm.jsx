//src/components/forms/LoginForm.jsx 

import React from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { loginUser } from '../../../api/auth';

const LoginForm = ({ setAuthToken }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input change
    };

    const validate = () => {
        if (!form.email) return "Email is required.";
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email))
            return "Invalid email format.";
        if (!form.password) return "Password is required.";
        return null;
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setLoading(true);
        try {
            const response = await loginUser(form);
            setAuthToken(response.token);
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };  

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};
export default LoginForm;
