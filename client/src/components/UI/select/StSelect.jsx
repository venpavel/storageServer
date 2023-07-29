import React from 'react';
import {FormSelect} from "react-bootstrap";

const StSelect = ({options, defaultValue, value, onChange}) => {
    return (
        <FormSelect
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value={defaultValue} disabled>{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </FormSelect>
    );
};

export default StSelect;