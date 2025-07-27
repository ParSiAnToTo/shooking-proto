import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const ExpiryDateInput: React.FC<Props> = ({ value, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 4);

        if (digits.length === 1) {
            if (!['0', '1'].includes(digits[0])) {
                return;
            }
        }

        if (digits.length >= 2) {
            const month = digits.slice(0, 2);
            const numericMonth = parseInt(month, 10);
            if (numericMonth < 1 || numericMonth > 12) {
                return;
            }
        }

        onChange(digits);
    };

    const formatExpiry = (raw: string): string => {
        if (raw.length <= 2) {
            return raw;
        }
        return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    };

    return (
        <input
            type="text"
            inputMode="numeric"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={formatExpiry(value)}
            onChange={handleInputChange}
            data-testid="card-expiry-input"
            placeholder="MM/YY"
        />
    );
};
