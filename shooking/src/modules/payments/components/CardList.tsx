import React from 'react';
import { useCardContext } from '../contexts/CardContext';
import CardPreview from './CardPreview';

type Props = {
    onAdd: () => void;
    onBack: () => void;
};

const CardList: React.FC<Props> = ({ onAdd, onBack }) => {
    const { cards } = useCardContext();

    return (
        <div className="flex flex-col items-center pt-6 px-4">
            <div className="w-full flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">보유카드</h2>
                <button 
                    className="text-xl text-gray-600"
                    onClick={onBack}
                >✕</button>
            </div>

            {cards.length === 0 ? (
                <>
                    <p className="text-sm text-gray-600 mb-4">새로운 카드를 등록해주세요.</p>
                    <button
                        className="w-[213px] h-[133px] bg-gray-200 rounded-md flex justify-center items-center text-3xl text-gray-500"
                        onClick={onAdd}
                    >
                        +
                    </button>
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <CardPreview card={cards[0]} />
                        <button className="mt-3 w-[213px] bg-[#FFEF64] text-black py-2 rounded-full text-sm font-semibold shadow-md">
                            이 카드로 결제하기
                        </button>
                    </div>

                    <button
                        className="w-[213px] h-[133px] bg-gray-200 rounded-md flex justify-center items-center text-3xl text-gray-500"
                        onClick={onAdd}
                    >
                        +
                    </button>
                </>
            )}
        </div>
    );
};

export default CardList;
