import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardOwnerInput } from '../CardOwnerInput';

describe('CardOwnerInput', () => {
    test('영문 대문자와 공백만 입력, 자동 대문자 변환, 마지막 공백 제거', () => {
        const handleChange = jest.fn();
        render(<CardOwnerInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-owner-input');

        fireEvent.change(input, {
            target: { value: 'kim jiho123!@#가나다  ' }
        });

        expect(handleChange).toHaveBeenCalledWith('KIM JIHO');
    });

    test('최대 30자까지만 입력', () => {
        const handleChange = jest.fn();
        render(<CardOwnerInput value="" onChange={handleChange} />);
        const input = screen.getByTestId('card-owner-input');

        fireEvent.change(input, {
            target: { value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ABCDEFGHIJKLMNOPQRSTUVWXYZ' }
        });

        expect(handleChange).toHaveBeenCalledWith('ABCDEFGHIJKLMNOPQRSTUVWXYZ ABC');
    });

    test('입력값이 props 반영되어 렌더링', () => {
        render(
            <CardOwnerInput value="JUNG HANUL" onChange={() => {}} />
        );
        const input = screen.getByTestId('card-owner-input');
        expect(input).toHaveValue('JUNG HANUL');
    });
});
