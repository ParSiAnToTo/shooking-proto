import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordInput } from '../inputs/PasswordInput';

describe('PasswordInput', () => {
    test('숫자만 입력', () => {
        const handleChange = jest.fn();
        render(<PasswordInput value="" onChange={handleChange} />);

        const input1 = screen.getByTestId('card-password-input-1');
        fireEvent.change(input1, { target: { value: 'a' } });
        expect(handleChange).not.toHaveBeenCalled();

        fireEvent.change(input1, { target: { value: '1' } });
        expect(handleChange).toHaveBeenCalledWith('1');
    });

    test('각 input에 입력 시 마스킹 표시', () => {
        render(<PasswordInput value="12" onChange={() => {}} />);
        expect(screen.getByTestId('card-password-input-1')).toHaveValue('•');
        expect(screen.getByTestId('card-password-input-2')).toHaveValue('•');
    });

    test('첫 번째 input에 백스페이스 시 첫 번째 자리 삭제', () => {
        const handleChange = jest.fn();
        render(<PasswordInput value="12" onChange={handleChange} />);
        const input1 = screen.getByTestId('card-password-input-1');
        fireEvent.keyDown(input1, { key: 'Backspace' });
        expect(handleChange).toHaveBeenCalledWith('2');
    });

    test('두 번째 input에 백스페이스 시 두 번째 자리 삭제', () => {
        const handleChange = jest.fn();
        render(<PasswordInput value="12" onChange={handleChange} />);
        const input2 = screen.getByTestId('card-password-input-2');
        fireEvent.keyDown(input2, { key: 'Backspace' });
        expect(handleChange).toHaveBeenCalledWith('1');
    });
});
