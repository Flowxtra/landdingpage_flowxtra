'use client';

import { useEffect, useRef, useState } from 'react';

type Currency = { code: string; label: string; symbol: string; display: string };

const CURRENCIES: Currency[] = [
  { code: 'EUR', label: 'Euro', symbol: '€', display: 'EUR - Euro (€)' },
  { code: 'USD', label: 'US Dollar', symbol: '$', display: 'USD - US Dollar ($)' },
  { code: 'GBP', label: 'Great Britain Pound', symbol: '£', display: 'GBP - Great Britain Pound (£)' },
  { code: 'SAR', label: 'Saudi Arabian Riyal', symbol: '﷼', display: 'SAR - Saudi Arabian Riyal (﷼)' },
  { code: 'AUD', label: 'Australian Dollar', symbol: 'AU$', display: 'AUD - Australian Dollar (AU$)' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$', display: 'CAD - Canadian Dollar (CA$)' },
  { code: 'CNY', label: 'China Renminbi', symbol: '¥', display: 'CNY - China Renminbi (¥)' },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹', display: 'INR - Indian Rupee (₹)' },
];

export default function CurrencySwitcher() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const [showCurrencyMenu, setShowCurrencyMenu] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('fx_currency_code');
    if (savedCurrency && CURRENCIES.some(c => c.code === savedCurrency)) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCurrencyMenu && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowCurrencyMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCurrencyMenu]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setShowCurrencyMenu(v => !v)}
        className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-primary dark:text-white hover:text-secondary dark:hover:text-[#00A8CD] transition-colors whitespace-nowrap rounded-md px-3 py-2 bg-[#f4f6f8] dark:bg-transparent"
        aria-haspopup="listbox"
        aria-expanded={showCurrencyMenu}
        aria-label="Change currency"
      >
        <span className="font-semibold">{selectedCurrency}</span>
        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd"/></svg>
      </button>
      {showCurrencyMenu && (
        <ul
          role="listbox"
          className="fixed left-1/2 -translate-x-1/2 bottom-20 w-[90vw] max-w-xs md:absolute md:right-0 md:left-auto md:translate-x-0 md:bottom-full md:mb-2 md:w-72 md:max-w-none max-h-80 overflow-auto rounded-md shadow-lg bg-white text-gray-900 dark:bg-white dark:text-gray-900 border border-gray-300 z-50"
        >
          {CURRENCIES.map(curr => (
            <li
              key={curr.code}
              role="option"
              aria-selected={selectedCurrency === curr.code}
              onClick={() => {
                setSelectedCurrency(curr.code);
                localStorage.setItem('fx_currency_code', curr.code);
                try {
                  window.dispatchEvent(new CustomEvent('fx_currency_changed', { detail: curr.code }));
                } catch {}
                setShowCurrencyMenu(false);
              }}
              className={`px-4 py-3 cursor-pointer text-base md:text-sm hover:bg-gray-100 dark:hover:bg-gray-100 ${selectedCurrency === curr.code ? 'bg-gray-100' : ''}`}
            >
              {curr.display}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


