import React from 'react';
import ButtonLayout from '../layouts/ButtonLayout';

const StatusComponent = ({ status = false }) => {
    return (
        status ? <ButtonLayout type="outline-success" size="small" text="Active" />
            : <ButtonLayout type="outline-danger" size="small" text="Deactive" />
    )
}

export default StatusComponent;