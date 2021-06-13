import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from './book-list';

test('renders Book heading', () => {
  render(<BookList />);
  const linkElement = screen.getByText(/Video Game/i);
  expect(linkElement).toBeInTheDocument();
});
