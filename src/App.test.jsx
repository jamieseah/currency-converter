import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App'; // Adjust the path to your main component

describe('App Component', () => {
  it('should render title and not be empty', () => {
    // Arrange: Render the component
    render(<App />);

    // Assert: Check that the rendered page contains some content
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
  });
});