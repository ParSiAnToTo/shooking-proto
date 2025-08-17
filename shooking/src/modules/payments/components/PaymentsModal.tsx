import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePaymentsModal } from '../state/paymentsModal';
import CardList from './CardList';
import CardForm from './CardForm';

const PaymentsModal: React.FC = () => {
    const { open, step, close, toForm, toList } = usePaymentsModal();
    const modalRoot = document.getElementById('modal-root') ?? document.body;

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, close]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000]">

            <button
                className="absolute inset-0 bg-black/50"
                aria-label="모달 닫기"
                onClick={close}
            />

            <div
                role="dialog"
                aria-modal="true"
                className="absolute inset-x-0 bottom-0 flex justify-center"
            >
                <div className="w-full max-w-md md:max-w-lg bg-white rounded-t-2xl shadow-xl h-[80vh] md:h-[70vh] flex flex-col">

                    <div className="flex justify-center py-2">
                        <div className="h-1.5 w-10 rounded-full bg-gray-300" />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {step === 'list' ? (
                            <CardList onAdd={toForm} onBack={close} />
                        ) : (
                            <CardForm onSubmit={toList} onCancel={toList} />
                        )}
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default PaymentsModal;
