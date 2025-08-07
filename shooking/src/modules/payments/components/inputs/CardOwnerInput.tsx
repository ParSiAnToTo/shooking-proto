import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const CardOwnerInput: React.FC<Props> = ({ value, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
            .toUpperCase()
            .replace(/[^A-Z\s]/g, '')
            .replace(/\s+$/, '')
            .slice(0, 30);

        onChange(input);
    };

    return (
        <input
            type="text"
            className="w-full border bg-[#ECEBF1] rounded px-3 py-2 text-sm"
            value={value}
            onChange={handleInputChange}
            data-testid="card-owner-input"
            placeholder="카드에 표시된 이름과 동일하게 입력하세요."
        />
    );
};
