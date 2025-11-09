"use client";

import { useEffect, useState } from "react";

export const fixedRates: Record<string, number> = {
  EUR: 1.0,
  USD: 1.06,
  GBP: 0.87,
  SAR: 3.97,
  AUD: 1.64,
  CAD: 1.45,
  CNY: 7.7,
  INR: 88,
};

export const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  SAR: "﷼",
  AUD: "AU$",
  CAD: "CA$",
  CNY: "¥",
  INR: "₹",
};

export function getSelectedCurrency(): string {
  if (typeof window === "undefined") return "EUR";
  const code = localStorage.getItem("fx_currency_code");
  return code && fixedRates[code] ? code : "EUR";
}

export function convertFromEur(amountEur: number, toCode: string): number {
  const rate = fixedRates[toCode] ?? 1;
  return amountEur * rate;
}

export function formatPriceFromEur(amountEur: number, toCode: string, locale?: string): string {
  const symbol = currencySymbols[toCode] ?? "€";
  const converted = convertFromEur(amountEur, toCode);
  // Display without cents: round to nearest integer for clean UI
  const value = Math.round(converted).toString();

  // RTL languages: Arabic
  const isRTL = locale === "ar";

  if (isRTL) {
    return `${value}${symbol}`;
  }

  return `${symbol}${value}`;
}

export function useCurrency(defaultCode: string = "EUR", locale?: string) {
  const [code, setCode] = useState<string>(() => {
    if (typeof window === "undefined") return defaultCode;
    return getSelectedCurrency();
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "fx_currency_code") {
        setCode(getSelectedCurrency());
      }
    };
    const handleCustom = (e: Event) => {
      setCode(getSelectedCurrency());
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "fx_currency_changed",
      handleCustom as EventListener
    );
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "fx_currency_changed",
        handleCustom as EventListener
      );
    };
  }, []);

  return {
    code,
    symbol: currencySymbols[code] ?? "€",
    convertFromEur: (amountEur: number) => convertFromEur(amountEur, code),
    formatFromEur: (amountEur: number) => formatPriceFromEur(amountEur, code, locale),
  };
}
