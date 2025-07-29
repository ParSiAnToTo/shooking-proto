import React, { createContext, useContext, useState } from 'react';
import { Card } from '../types/Card';

type CardContextType = {
    cards: Card[];
    addCard: (card: Card) => void;
};

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cards, setCards] = useState<Card[]>([]);

    const addCard = (card: Card) => {
        setCards(prev => [...prev, card]);
    };

    return (
        <CardContext.Provider value={{ cards, addCard }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCardContext = (): CardContextType => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
};
