import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create appointment button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Appointment/i);
  expect(linkElement).toBeInTheDocument();
});
