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


const CardPreview: React.FC<Props> = ({ card }) => {
    return (
        <div className="relative bg-[#333333] rounded-md shadow-md text-white w-[213px] h-[133px] px-4 py-3">

            <div className="absolute left-4 top-[35%] w-[40px] h-[26px] bg-[#CBBA54] rounded-sm" />

            <div className="absolute left-4 right-4 bottom-8 text-sm tracking-widest text-left">
                {getMaskedCardNumber(card.cardNumber)}
            </div>

            <div className="absolute left-4 right-4 bottom-3 flex justify-between text-xs text-gray-300">
                <span>{card.ownerName || 'NAME'}</span>
                <span>{getFormattedExpiryDate(card.expiryDate) || 'MM/YY'}</span>
            </div>
        </div>
    );
};

export default CardPreview;
