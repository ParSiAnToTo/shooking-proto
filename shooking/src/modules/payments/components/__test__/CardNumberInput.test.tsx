import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardNumberInput } from '../CardNumberInput';

describe('CardNumberInput', () => {
    it('마스킹 렌더링 및 숫자 포멧 체크', () => {
        render(<CardNumberInput value="1234567890123456" onChange={() => {}} />);
        const input = screen.getByTestId('card-number-input') as HTMLInputElement;
        expect(input.value).toBe('1234-5678-****-****');
    });

    it('8자 이후 마스킹 체크', () => {
        render(<CardNumberInput value="123456781234" onChange={() => {}} />);
        const input = screen.getByTestId('card-number-input') as HTMLInputElement;
        expect(input.value).toBe('1234-5678-****');
    });

    it('최대 숫자 16자만 리턴 여부 체크', () => {
        const handleChange = jest.fn();
        render(<CardNumberInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-number-input');

        fireEvent.change(input, { target: { value: 'abcd1234!@#$567890123456' } });

        expect(handleChange).toHaveBeenCalledWith('1234567890123456');
    });

    it('콜백 시 숫자 리턴', () => {
        const handleChange = jest.fn();
        render(<CardNumberInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-number-input');

        fireEvent.change(input, { target: { value: '1111-2222-3333-4444' } });

        expect(handleChange).toHaveBeenCalledWith('1111222233334444');
    });
});
