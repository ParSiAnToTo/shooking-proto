import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpiryDateInput } from '../ExpiryDateInput';

describe('ExpiryDateInput', () => {
    test('숫자만 입력, 4자리까지 허용', () => {
        const handleChange = jest.fn();
        render(<ExpiryDateInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-expiry-input');

        fireEvent.change(input, { target: { value: '12a3b456' } });

        expect(handleChange).toHaveBeenCalledWith('1234');
    });

    test('입력값 MM/YY 형식으로 표시', () => {
        render(<ExpiryDateInput value="0412" onChange={() => {}} />);
        const input = screen.getByTestId('card-expiry-input');
        expect(input).toHaveValue('04/12');
    });

    test('첫 입력이 0 또는 1이 아니면 무시', () => {
        const handleChange = jest.fn();
        render(<ExpiryDateInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-expiry-input');

        fireEvent.change(input, { target: { value: '3' } });

        expect(handleChange).not.toHaveBeenCalled();
    });

    test('월이 01~12 범위를 벗어나면 무시', () => {
        const handleChange = jest.fn();
        render(<ExpiryDateInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-expiry-input');

        fireEvent.change(input, { target: { value: '13' } });

        expect(handleChange).not.toHaveBeenCalled();
    });

    test('정상적인 월(MM) 입력까지는 그대로 렌더링', () => {
        render(<ExpiryDateInput value="05" onChange={() => {}} />);
        const input = screen.getByTestId('card-expiry-input');
        expect(input).toHaveValue('05');
    });
});
