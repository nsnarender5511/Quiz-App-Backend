import React from 'react';

interface data {
    label: string;
    onClick: () => void;
}

const Buttons: React.FC<data> = ({ label, onClick }) => {
    return (
        <div>
        </div>
    );
};

export default Buttons; 