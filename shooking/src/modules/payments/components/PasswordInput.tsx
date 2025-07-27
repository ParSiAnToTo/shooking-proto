import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const PasswordInput: React.FC<Props> = ({ value, onChange }) => {
    const handleFirstChange = (digit: string) => {
        if (!/^\d?$/.test(digit)) return;
        onChange(digit + (value[1] ?? ''));
    };

    const handleSecondChange = (digit: string) => {
        if (!/^\d?$/.test(digit)) return;
        onChange((value[0] ?? '') + digit);
    };

    const handleFirstKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            onChange('' + (value[1] ?? ''));
        }
    };

    const handleSecondKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            onChange((value[0] ?? '') + '');
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="w-10 text-center border border-gray-300 rounded px-2 py-2 text-sm"
                value={value[0] ? '•' : ''}
                onChange={(e) => handleFirstChange(e.target.value)}
                onKeyDown={handleFirstKeyDown}
                data-testid="card-password-input-1"
            />
            <input
                type="password"
                inputMode="numeric"
                maxLength={1}
                className="w-10 text-center border border-gray-300 rounded px-2 py-2 text-sm"
                value={value[1] ? '•' : ''}
                onChange={(e) => handleSecondChange(e.target.value)}
                onKeyDown={handleSecondKeyDown}
                data-testid="card-password-input-2"
            />

            <div className="w-10 text-center border border-gray-300 rounded px-2 py-2 text-sm bg-gray-100 select-none">•</div>
            <div className="w-10 text-center border border-gray-300 rounded px-2 py-2 text-sm bg-gray-100 select-none">•</div>
        </div>
    );
};
