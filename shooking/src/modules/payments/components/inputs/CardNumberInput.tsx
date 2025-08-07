import React from 'react';
import { IMaskInput } from 'react-imask';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const CardNumberInput: React.FC<Props> = ({ value, onChange }) => {

    const handleAccept = (value: string) => {
        const onlyDigits = value.replace(/\D/g, '');
        onChange(onlyDigits);
    };
    return (
        <IMaskInput
            mask="0000-0000-0000-0000"
            value={value}
            onAccept={handleAccept}
            type="tel"
            inputMode="numeric"
            className="w-full border bg-[#ECEBF1] rounded px-3 py-2 text-sm"
            data-testid="card-number-input"
            maxLength={19}
        />
    );
};