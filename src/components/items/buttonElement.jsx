import React from 'react';

const Button = ({kind, content, onClick}) => {
    return (
        <button className={"btn btn-" + kind} onClick={onClick}>
            {content}
        </button>
    );
};

export default Button;
