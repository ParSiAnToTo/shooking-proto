import React from 'react';
import { Card } from '../types/Card';

type Props = {
    card: Card;
};

const getMaskedCardNumber = (number: string) => {
    const digits = number.replace(/\D/g, '').slice(0, 16);
    return digits
        .split('')
        .map((char, idx) => (idx >= 8 ? '•' : char))
        .join('')
        .replace(/(.{4})/g, '$1 ')
        .replace(/-$/, '');
};

const getFormattedExpiryDate = (expiry: string) => {
    const digits = expiry.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) 
        return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};


const CardPreview: React.FC<Props> = ({ card }: Props) => {
    return (
        <div
            className="bg-[#333333] rounded-md shadow-md px-4 pt-3 pb-2 text-white w-[213px] h-[133px] flex flex-col justify-between"
        >
            <div className="w-[40px] h-[26px] bg-[#CBBA54] rounded-sm mb-2" />

            <div className="text-sm tracking-widest mb-2">
                {getMaskedCardNumber(card.cardNumber)}
            </div>

            <div className="flex justify-between text-xs text-gray-300">
                <span>{card.ownerName || 'NAME'}</span>
                <span>{getFormattedExpiryDate(card.expiryDate)}</span>
            </div>
        </div>
    );
};

export default CardPreview;
