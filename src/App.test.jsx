import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App from './App';

test('renders the visualizer controls', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Random' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sort' })).toBeInTheDocument();
  expect(screen.getByLabelText('Array size')).toHaveValue('100');
  expect(screen.getByLabelText('Animation delay')).toHaveValue('5');

  const sliderValues = document.querySelectorAll('.slider-value');
  expect(sliderValues).toHaveLength(2);
  expect(sliderValues[0]).toHaveTextContent('100');
  expect(sliderValues[1]).toHaveTextContent('5 ms');
});

test('responsive CSS rules meet layout specifications', () => {
  const optionsBarCss = fs.readFileSync(path.resolve(__dirname, 'components/OptionsBar.css'), 'utf-8');
  const styleCss = fs.readFileSync(path.resolve(__dirname, 'components/style.css'), 'utf-8');

  // No fixed vh heights on nav container
  expect(optionsBarCss).not.toMatch(/#nav-container[^}]*height:\s*\d+vh/i);

  // No upper viewport cap
  expect(optionsBarCss).not.toContain('max-width: 2000px');

  // Uses targeted slider-value rather than global p selector
  expect(optionsBarCss).toContain('.slider-value');
  expect(optionsBarCss).not.toMatch(/\bp\s*\{/);

  // Semantic min-width breakpoints
  expect(optionsBarCss).toContain('@media (min-width: 37.5rem)');
  expect(optionsBarCss).toContain('@media (min-width: 60rem)');

  // Merged selectors
  const normOptionsBarCss = optionsBarCss.replace(/\r\n/g, '\n');
  const normStyleCss = styleCss.replace(/\r\n/g, '\n');
  expect(normOptionsBarCss).toContain('#delay-container,\n#arrSize-container');
  expect(normStyleCss).toContain('#code,\n#tc');

  // Exactly one webkit-scrollbar rule (none inside media query)
  const scrollbarMatches = styleCss.match(/::-webkit-scrollbar(?![-\w])/g);
  expect(scrollbarMatches).toHaveLength(1);
  const mediaQueryMatch = styleCss.match(/@media[^{]+\{([\s\S]+)\}/);
  expect(mediaQueryMatch[1]).not.toContain('::-webkit-scrollbar');
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
