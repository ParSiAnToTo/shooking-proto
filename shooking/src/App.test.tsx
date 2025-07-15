import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { products } from './data/products';

describe('App Component', () => {
  test('페이지 제목 렌더링', () => {
    render(<App />);
    expect(screen.getByText('신발 상품 목록')).toBeInTheDocument();
  });

  test('상품 개수가 출력', () => {
    render(<App />);
    expect(screen.getByText(`현재 ${products.length}개의 상품이 있습니다.`)).toBeInTheDocument();
  });

  test('모든 상품 카드 렌더링', () => {
    render(<App />);
    const cards = screen.getAllByText(/담기|담김!/);
    expect(cards.length).toBe(products.length);
  });

  test('헤더 장바구니 아이콘, 수량 초기값 표시', () => {
    render(<App />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});