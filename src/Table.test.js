import { render, screen } from '@testing-library/react';
import Table from './Table';

test('renders table', () => {
  render(<Table />);
  expect(screen.getByTestId('table')).toBeInTheDocument();
  
});
