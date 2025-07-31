import React, { useState } from 'react';
import { Card } from '../types/Card';
import { useCardContext } from '../contexts/CardContext';
import { v4 as uuid } from 'uuid';

import { CardNumberInput } from './inputs/CardNumberInput';
import { CardOwnerInput } from './inputs/CardOwnerInput';
import { CvcInput } from './inputs/CvcInput';
import { ExpiryDateInput } from './inputs/ExpiryDateInput';
import { PasswordInput } from './inputs/PasswordInput';

import CardPreview from './CardPreview';

type Props = {
    onSubmit: () => void;
    onCancel: () => void;
};

const CardForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const { addCard } = useCardContext();

    const [cardNumber, setCardNumber] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const newCard: Card = {
            id: uuid(),
            cardNumber,
            ownerName,
            expiryDate,
            cvc,
            password,
        };
        addCard(newCard);
        onSubmit();
    };

    return (
        <div className="p-4 space-y-4">

            <div className="flex justify-center">
                <CardPreview
                    card={{
                        id: '',
                        cardNumber,
                        ownerName,
                        expiryDate,
                        cvc,
                        password,
                    }}
                />
            </div>

            <div>카드번호</div>
            <CardNumberInput value={cardNumber} onChange={setCardNumber} />
            <div>만료일</div>
            <ExpiryDateInput value={expiryDate} onChange={setExpiryDate} />
            <div>카드 소유자 이름</div>
            <CardOwnerInput value={ownerName} onChange={setOwnerName} />
            <div>보안 코드(CVC/CVV)</div>
            <CvcInput value={cvc} onChange={setCvc} />
            <div>카드 비밀번호</div>
            <PasswordInput value={password} onChange={setPassword} />

            <div className="flex justify-between">
                <button onClick={onCancel} className="text-gray-500">취소</button>
                <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
                    작성 완료
                </button>
            </div>
        </div>
    );
};

export default CardForm;
