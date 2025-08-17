import React, { useEffect, useState } from 'react';
import { Card } from '../types/Card';
import { useCardContext } from '../contexts/CardContext';
import { v4 as uuid } from 'uuid';

import { CardNumberInput } from './inputs/CardNumberInput';
import { CardOwnerInput } from './inputs/CardOwnerInput';
import { CvcInput } from './inputs/CvcInput';
import { ExpiryDateInput } from './inputs/ExpiryDateInput';
import { PasswordInput } from './inputs/PasswordInput';

import SubmitButton from './SubmitButton';
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

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isFormValid = () => {
            return (
                cardNumber.replace(/\D/g, '').length === 16 &&
                /^\d{4}$/.test(expiryDate) &&
                ownerName.length > 0 &&
                ownerName.length <= 30 &&
                /^\d{3}$/.test(cvc) &&
                /^\d{2}$/.test(password)
            );
        };
        
        setFormValid(isFormValid());

    }, [cardNumber, expiryDate, ownerName, cvc, password]);

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

            <div className="w-full flex justify-between items-center mb-6">
                <div className='flex items-center space-x-2 mb-6'>
                    <button onClick={onCancel} className="text-xl text-gray-600">
                        &lt;
                    </button>
                    <h2 className="text-lg font-semibold">카드 추가</h2>
                </div>
                <button onClick={onCancel} className="text-xl text-gray-600">
                    ✕
                </button>
            </div>

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
            <div className="flex justify-between items-center">
                <div>카드 소유자 이름</div>
                <span className="text-xs text-[#525252] font-bold">{ownerName.length}/30</span>
            </div>
            <CardOwnerInput value={ownerName} onChange={setOwnerName} />
            <div>보안 코드(CVC/CVV)</div>
            <CvcInput value={cvc} onChange={setCvc} />
            <div>카드 비밀번호</div>
            <PasswordInput value={password} onChange={setPassword} />

            <div className="sticky bottom-0 left-0 right-0 bg-white pt-3 pb-4 border-t z-10
                            -mx-4 px-4 pb-[env(safe-area-inset-bottom)]">
                <SubmitButton onClick={handleSubmit} disabled={!formValid} />
            </div>
        </div>
    );
};

export default CardForm;
