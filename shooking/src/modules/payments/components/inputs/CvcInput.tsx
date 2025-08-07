import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const CvcInput: React.FC<Props> = ({ value, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
        onChange(digits);
    };

    return (
        <input
            type="password"
            inputMode="numeric"
            className="w-full border bg-[#ECEBF1] rounded px-3 py-2 text-sm"
            value={value}
            onChange={handleInputChange}
            data-testid="card-cvc-input"
        />
    );
};
