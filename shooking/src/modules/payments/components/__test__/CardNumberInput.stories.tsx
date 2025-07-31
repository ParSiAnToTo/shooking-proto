import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { CardNumberInput } from '../inputs/CardNumberInput';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CardNumberInput> = {
    title: 'Payments/CardNumberInput',
    component: CardNumberInput,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CardNumberInput>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('');

        return (
            <div className="w-[300px]">
                <CardNumberInput value={value} onChange={setValue} />
                <p className="mt-2 text-sm text-gray-500">입력된 값: {value}</p>
            </div>
        );
    },

    
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByTestId('card-number-input');

        await userEvent.type(input, '1234567812345678');

        expect(input).toHaveValue('1234-5678-1234-5678');
    },
};
