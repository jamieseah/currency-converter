import { render, screen,fireEvent } from '@testing-library/react';
import { describe, it } from 'vitest';
import CurrencyConverter from './CurrencyConverter';
import CurrencyContext from '../contexts/CurrencyContext';

describe("CurrencyConverter", () => {
    const renderComponent = (fromCurrency, toCurrency) => {
    return render(
      <CurrencyContext.Provider
        value={{
          fromCurrency,
          toCurrency,
        }}
      >
        <CurrencyConverter />
      </CurrencyContext.Provider>
    );
  };
  
    it("renders all elements", () => {
        renderComponent("USD", "EUR");
        expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    });

    it("shows correct conversion result", () => {
        renderComponent("USD", "EUR");
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(input, { target: { value: '10' } });
        expect(screen.getByText("20")).toBeInTheDocument();
    });

    it("shows 0 when input is empty", () => {
        renderComponent("USD", "EUR");
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.change(input, { target: { value: "" } });
        expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("rerenders different currencies correctly", () => {
        const { rerender } = renderComponent("USD", "EUR");
        expect(screen.getByText("USD")).toBeInTheDocument();
        expect(screen.getByText("EUR")).toBeInTheDocument();

        rerender(
            <CurrencyContext.Provider 
                value={{ 
                    fromCurrency: "GBP", 
                    toCurrency: "JPY",
                    }}
                >
                <CurrencyConverter />
            </CurrencyContext.Provider>
        );

        expect(screen.getByText("GBP")).toBeInTheDocument();
        expect(screen.getByText("JPY")).toBeInTheDocument();
    });

    it('should handle negative amounts', () => {
        renderComponent('USD', 'EUR');
        const input = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(input, { target: { value: '-10' } });
        expect(screen.getByText('0')).toBeInTheDocument(); // Negative amounts are considered invalid input and should not be calculated
    });

    it('should handle non-numeric input gracefully', () => {
        renderComponent('USD', 'EUR');
        const input = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(input, { target: { value: 'abc' } });
        expect(screen.getByText('0')).toBeInTheDocument(); // Non-numeric input is treated as zero
    });

});

