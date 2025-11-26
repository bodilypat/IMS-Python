//src/components/forms/UserForm.jsx

import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';

import UserForm = ({ initial = {}, onSubmit }) => {
    const [formData, setFormData] = React.useState({
        name: initial.name || '',
        email: initial.email || '',
        role: initial.role || '',
        bio: initial.bio || '',
    });
    
    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },   
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roles}
                required
            />
            <TextArea
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
            />
            <button type="submit">Submit</button>
        </form>
    );
};
export default UserForm;

