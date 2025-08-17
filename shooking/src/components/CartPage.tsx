import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    cartState,
    cartSubtotalSelector,
    shippingFeeSelector,
    cartTotalSelector,
} from '../state/cart';
import { usePaymentsModal } from '../modules/payments/state/paymentsModal';

const fmt = (n: number) => `${n.toLocaleString('ko-KR')}원`;

type Props = {
    onBack: () => void;
    onCheckout: () => void;
};

const CartPage: React.FC<Props> = ({ onBack, onCheckout }) => {
    const [items, setItems] = useRecoilState(cartState);
    const subtotal = useRecoilValue(cartSubtotalSelector);
    const shipping = useRecoilValue(shippingFeeSelector);
    const total = useRecoilValue(cartTotalSelector);

    const { openList } = usePaymentsModal();

    const inc = (id: number) =>
        setItems(prev => prev.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

    const dec = (id: number) =>
        setItems(prev =>
        prev
            .map(i => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter(i => i.qty > 0)
        );

    const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

    return (
        <div className="min-h-screen bg-white pt-4 pb-28">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white z-10 px-4 pt-2 pb-3 border-b">
            <h1 className="text-3xl font-extrabold mt-2">장바구니</h1>
            <p className="text-gray-500 mt-1">
            현재 {items.length}개의 상품이 담겨있습니다.
            </p>
        </div>

        {/* 아이템 리스트 */}
        <div className="divide-y">
            {items.map(item => (
            <div key={item.id} className="px-4 py-5 flex gap-4 items-center">
                <img
                src={item.imageUrl}
                alt={item.description}
                className="w-[128px] h-[128px] rounded-2xl object-cover flex-shrink-0"
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/placeholder.png';
                }}
                />

                <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">{item.brand}</div>
                <div className="text-[22px] font-extrabold tracking-tight">
                    {fmt(item.price)}
                </div>

                {/* 수량 컨트롤 */}
                <div className="mt-4 flex items-center gap-5 text-gray-700">
                    <button
                    aria-label="수량 감소"
                    onClick={() => dec(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg"
                    >
                    –
                    </button>
                    <span className="text-lg select-none" data-testid={`qty-${item.id}`}>{item.qty}</span>
                    <button
                    aria-label="수량 증가"
                    onClick={() => inc(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg"
                    >
                    +
                    </button>

                    {/* 삭제 (옵션) */}
                    <button
                    aria-label="상품 삭제"
                    onClick={() => remove(item.id)}
                    className="ml-2 text-sm text-red-500"
                    >
                    삭제
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* 합계/배송/총 금액 */}
        <div className="mt-2 border-y bg-white">
            <div className="px-4 py-4 flex justify-between" data-testid="total-section">
            <span className="text-gray-600">상품 금액</span>
            <span className="text-xl font-bold">{fmt(subtotal)}</span>
            </div>
            <div className="px-4 py-4 flex justify-between">
            <span className="text-gray-600">배송비</span>
            <span className="text-xl font-bold">
                {shipping === 0 ? (
                <span>
                    0원
                    <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    10만원 이상 무료배송
                    </span>
                </span>
                ) : (
                fmt(shipping)
                )}
            </span>
            </div>
        </div>

        <div className="px-4 py-5 flex justify-between">
            <span className="text-gray-800 font-semibold">총 금액</span>
            <span className="text-2xl font-extrabold" data-testid="total-amount">{fmt(total)}</span>
        </div>

        {/* 하단 결제 버튼 */}
        <div className="fixed bottom-4 left-4 right-4">
            <button
            className="w-full py-4 rounded-[28px] bg-black text-white text-lg font-semibold disabled:bg-gray-300"
            disabled={items.length === 0}
            onClick={() => openList()}
            >
            결제하기
            </button>
        </div>
        </div>
    );
};

export default CartPage;
