import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CvcInput } from '../inputs/CvcInput';

describe('CvcInput', () => {
    test('숫자 이외 문자는 입력 방지', () => {
        const handleChange = jest.fn();
        render(<CvcInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-cvc-input');

        fireEvent.change(input, {
            target: { value: '12a!가3b4' }
        });

        expect(handleChange).toHaveBeenCalledWith('123');
    });

    test('최대 3자리까지만 입력', () => {
        const handleChange = jest.fn();
        render(<CvcInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-cvc-input');

        fireEvent.change(input, {
            target: { value: '1234' }
        });

        expect(handleChange).toHaveBeenCalledWith('123');
    });

    test('입력값이 없으면 빈 문자열 표시', () => {
        render(<CvcInput value="" onChange={() => {}} />);
        const input = screen.getByTestId('card-cvc-input');
        expect(input).toHaveValue('');
    });
});
