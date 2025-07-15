import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product list title', () => {
  render(<App />);
  const heading = screen.getByText(/신발 상품 목록/i);
  expect(heading).toBeInTheDocument();
});