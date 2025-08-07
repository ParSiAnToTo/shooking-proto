import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardNumberInput } from '../inputs/CardNumberInput';

describe('CardNumberInput', () => {
    it('컴포넌트 렌더링', () => {
        const mockOnChange = jest.fn();
        render(<CardNumberInput value="" onChange={mockOnChange} />);
        const inputElement = screen.getByTestId('card-number-input');

        expect(inputElement).toBeInTheDocument();
    });

    it('초기 prop 값 렌더링', () => {
        const mockOnChange = jest.fn();
        const initialValue = '1234567890123456';
        render(<CardNumberInput value={initialValue} onChange={mockOnChange} />);
        const inputElement = screen.getByTestId('card-number-input');

        expect(inputElement).toHaveValue('1234-5678-9012-3456');
    });

    it('최대 입력 16자리 초과 입력 무시', () => {
        const mockOnChange = jest.fn();
        render(<CardNumberInput value="" onChange={mockOnChange} />);
        const inputElement = screen.getByTestId('card-number-input');

        const longValue = '12345678901234567';
        fireEvent.input(inputElement, { target: { value: longValue } });

        expect(mockOnChange).toHaveBeenCalledWith('1234567890123456');
    });

    it('숫자가 아닌 문자 자동 제거', () => {
        const mockOnChange = jest.fn();
        render(<CardNumberInput value="" onChange={mockOnChange} />);
        const inputElement = screen.getByTestId('card-number-input');

        const mixedValue = '1a2b-3c4d-5e6f-7g8h';
        fireEvent.input(inputElement, { target: { value: mixedValue } });

        expect(mockOnChange).toHaveBeenCalledWith('12345678');
    });
});