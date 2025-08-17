import { atom, useRecoilState } from 'recoil';

export type PaymentsStep = 'list' | 'form';

export const paymentsOpenState = atom<boolean>({
    key: 'payments/open',
    default: false,
});

export const paymentsStepState = atom<PaymentsStep>({
    key: 'payments/step',
    default: 'list',
});

export function usePaymentsModal() {
    const [open, setOpen] = useRecoilState(paymentsOpenState);
    const [step, setStep] = useRecoilState(paymentsStepState);

    return {
        open,
        step,
        openList: () => {
            setStep('list');
            setOpen(true);
        },
        openForm: () => {
            setStep('form');
            setOpen(true);
        },
        toList: () => setStep('list'),
        toForm: () => setStep('form'),
        close: () => setOpen(false),
    };
}
