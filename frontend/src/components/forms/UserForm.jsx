//src/components/forms/UserForm.jsx

import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

const UserForm = ({ initial = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        full_name: initial.full_name || '',
        email: initial.email || '',
        role: initial.role || '',
        bio: initial.bio || '',
    });

    const [errors, setErrors] = useState({});

    const roles = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Employee', label: 'Employee' },   
    ];

    const validate = () => {
        const newErrors = {};

        if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Email is invalid format';
        }

        if (!formData.role) newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate())
            onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Name"
                name="fullname"
                value={formData.full_name}
                onChange={handleChange}
                error={errors.full_name}
                required
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
            />
            <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roles}
                required
                error={errors.role}
            />
            <TextArea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
            />
            <div className="flex justify-end space-x-2 mb-4">
                {onCancel && (
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                )}
                <Button type="submit">Save User</Button>
            </div>
        </form>
    );
};
export default UserForm;

