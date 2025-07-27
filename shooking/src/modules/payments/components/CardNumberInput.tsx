import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const CardNumberInput: React.FC<Props> = ({ value, onChange }) => {
    const formatCardNumber = (input: string) => {
        const digits = input.replace(/\D/g, '').slice(0, 16);
        const masked = digits
            .split('')
            .map((char, idx) => (idx >= 8 ? '*' : char))
            .join('');
        return masked.match(/.{1,4}/g)?.join('-') ?? '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 16);
        onChange(onlyDigits);
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={formatCardNumber(value)}
            onChange={handleInputChange}
            data-testid="card-number-input"
        />
    );
};