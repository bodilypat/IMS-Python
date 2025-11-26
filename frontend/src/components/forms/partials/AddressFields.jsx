//src/components/forms/partials/AddressFields.jsx 

import react from 'react';
import Input from '../../ui/Input';

const AddressFields = ({ address, onChange }) => {
    return (
        <div className="address-fields">
            <Input
                label="Street"
                name="street"
                value={address.street}
                onChange={onChange}
            />
            <Input
                label="City"
                name="city"
                value={address.city}
                onChange={onChange}
            />
            <Input
                label="State"
                name="state"
                value={address.state}
                onChange={onChange}
            />
            <Input
                label="Zip Code"
                name="zip"
                value={address.zip}
                onChange={onChange}
            />
        </div>
    );
};
