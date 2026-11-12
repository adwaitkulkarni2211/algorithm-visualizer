import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the visualizer controls', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Random' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sort' })).toBeInTheDocument();
  expect(screen.getByLabelText('Array size')).toHaveValue('100');
  expect(screen.getByLabelText('Animation delay')).toHaveValue('5');
});

test.each([
  'Merge Sort',
  'Quick Sort',
  'Bubble Sort',
  'Selection Sort',
  'Insertion Sort',
])('runs %s and restores the controls', async (algorithm) => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Array size'), { target: { value: '10' } });
  fireEvent.change(screen.getByLabelText('Animation delay'), { target: { value: '0' } });
  fireEvent.click(screen.getByText(algorithm));
  fireEvent.click(screen.getByRole('button', { name: 'Sort' }));

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Sort' })).not.toBeDisabled();
  }, { timeout: 3000 });
});
