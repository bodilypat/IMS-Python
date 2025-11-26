//src/components/forms/LoginForm.jsx 

import React from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { loginUser } from '../../../api/auth';

const LoginForm = ({ formData, handleChange, setAuthToken }) => {
    const [form, setForm] = React.useState(formData);
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(form);
            setAuthToken(response.token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {error && <p className="error">{error}</p>}
            <Button type="submit">Login</Button>
        </form>
    );
};
export default LoginForm;
