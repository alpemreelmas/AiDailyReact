import React from 'react';

const InputWithLabel = ({ className, label, type, id, value, onChange, placeholder }) => {
    return (
        <div>
            <label htmlFor={id} className="control-label sr-only">
                {label}
            </label>
            <input
                type={type}
                className={"form-control round" + className}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputWithLabel;
