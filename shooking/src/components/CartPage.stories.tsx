import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RecoilRoot } from 'recoil';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import CartPage from './CartPage';
import { cartState, type CartItem } from '../state/cart';

import { CardProvider } from '../modules/payments/contexts/CardContext';
import PaymentsModal from '../modules/payments/components/PaymentsModal';

import shoe1 from '../assets/shoe0001.png';
import shoe2 from '../assets/shoe0002.png';

type StoryProps = React.ComponentProps<typeof CartPage> & {
    initialCart?: CartItem[];
};

const Providers: React.FC<React.PropsWithChildren<{ initialCart?: CartItem[] }>> = ({
    children,
    initialCart = [],
    }) => (
    <CardProvider>
        <RecoilRoot
        initializeState={({ set }) => {
            set(cartState, initialCart);
        }}
        >
        {/* 실제 앱 구조와 유사하게 모달도 마운트 */}
        {children}
        <PaymentsModal />
        </RecoilRoot>
    </CardProvider>
);

const meta: Meta<StoryProps> = {
    title: 'Cart/CartPage',
    component: CartPage,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        initialCart: { control: 'object' },
        onBack: { action: 'onBack' },
        onCheckout: { action: 'onCheckout' },
    },
    args: {
        onBack: () => {},
        onCheckout: () => {},
    },
    decorators: [
        (Story, ctx) => (
        <Providers initialCart={ctx.args.initialCart}>
            <Story />
        </Providers>
        ),
    ],
};
export default meta;

export const Empty: StoryObj<StoryProps> = {
    name: '빈 장바구니',
    args: {
        initialCart: [],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const payBtn = await canvas.findByRole('button', { name: '결제하기' });
        await expect(payBtn).toBeDisabled();
    },
};

export const TwoItems: StoryObj<StoryProps> = {
    name: '2개 담긴 장바구니',
    args: {
        initialCart: [
        {
            id: 1,
            brand: 'Nike',
            imageUrl: shoe1,
            description: '나이키 런닝화',
            price: 89000,
            qty: 1,
        },
        {
            id: 2,
            brand: 'Adidas',
            imageUrl: shoe2,
            description: '아디다스 트레이닝화',
            price: 62000,
            qty: 2,
        },
        ],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 결제 버튼은 활성이어야 함
        const payBtn = await canvas.findByRole('button', { name: '결제하기' });
        await expect(payBtn).toBeEnabled();

        // 수량 증가 버튼 중 첫 번째를 클릭 (첫 아이템 +1)
        const incButtons = await canvas.findAllByRole('button', { name: '수량 증가' });
        await userEvent.click(incButtons[0]);

        // 간단 검증: "현재 X개의 상품이 담겨있습니다." 텍스트가 여전히 2개를 표시하는지 확인
        // (아이템 개수는 그대로, 수량만 변경되므로 문구는 변하지 않음)
        await canvas.findByText(/현재 2개의 상품이 담겨있습니다\./);

        // 총 금액 텍스트가 존재하는지(금액 계산은 Recoil 셀렉터로 반영됨)
        await canvas.findByText('총 금액');
    },
};

export const FreeShippingThreshold: StoryObj<StoryProps> = {
    name: '무료배송 기준(10만원) 초과',
    args: {
        initialCart: [
        {
            id: 3,
            brand: 'Asics',
            imageUrl: shoe1,
            description: '아식스 젤',
            price: 101000, // 기준 이상
            qty: 1,
        },
        ],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // 배송비가 0원 배지 문구 노출
        await canvas.findByText('배송비');
        await canvas.findByText(/10만원 이상 무료배송/);
    },
};
