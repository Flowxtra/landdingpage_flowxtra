"use client";

import { useState, useEffect } from "react";

export interface AccessibilitySettings {
  fontSize: number; // 1 = 100%, 1.25 = 125%, etc.
  lineHeight: number; // 1.5 = 150%, etc.
  textAlign: "left" | "center" | "justify";
  readableFont: boolean;
  highlightLinks: boolean;
  largeCursor: boolean;
  readingMask: boolean;
  stopAnimations: boolean;
  highContrast: boolean;
  monochrome: boolean;
  hideImages: boolean;
  outlineFocus: boolean;
  pageStructure: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 1,
  lineHeight: 1.5,
  textAlign: "left",
  readableFont: false,
  highlightLinks: false,
  largeCursor: false,
  readingMask: false,
  stopAnimations: false,
  highContrast: false,
  monochrome: false,
  hideImages: false,
  outlineFocus: false,
  pageStructure: false,
};

const STORAGE_KEY = "flowxtra_accessibility_settings";

export function useAccessibility() {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedSettings = { ...DEFAULT_SETTINGS, ...parsed };
        setSettings(mergedSettings);
        applySettings(mergedSettings);
      } else {
        setSettings(DEFAULT_SETTINGS);
        applySettings(DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error("Failed to load accessibility settings:", error);
      setSettings(DEFAULT_SETTINGS);
      applySettings(DEFAULT_SETTINGS);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Apply settings to document when they change
  useEffect(() => {
    if (isInitialized) {
      applySettings(settings);
      saveSettings(settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, isInitialized]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    isInitialized,
  };
}

function applySettings(settings: AccessibilitySettings) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const body = document.body;

  // Font size
  root.style.fontSize = `${settings.fontSize * 100}%`;

  // Line height
  root.style.lineHeight = `${settings.lineHeight}`;

  // Text align
  if (settings.textAlign !== "left") {
    root.classList.add(`accessibility-text-align-${settings.textAlign}`);
    root.style.textAlign = settings.textAlign;
  } else {
    root.classList.remove(
      "accessibility-text-align-center",
      "accessibility-text-align-justify"
    );
    root.style.textAlign = "left";
  }

  // Readable font (OpenDyslexic or similar)
  if (settings.readableFont) {
    root.classList.add("accessibility-readable-font");
  } else {
    root.classList.remove("accessibility-readable-font");
  }

  // Highlight links
  if (settings.highlightLinks) {
    root.classList.add("accessibility-highlight-links");
  } else {
    root.classList.remove("accessibility-highlight-links");
  }

  // Large cursor
  if (settings.largeCursor) {
    root.classList.add("accessibility-large-cursor");
  } else {
    root.classList.remove("accessibility-large-cursor");
  }

  // Reading mask
  if (settings.readingMask) {
    root.classList.add("accessibility-reading-mask");
    if (!document.getElementById("accessibility-reading-mask")) {
      const mask = document.createElement("div");
      mask.id = "accessibility-reading-mask";
      mask.className = "accessibility-reading-mask-overlay";
      document.body.appendChild(mask);
    }
  } else {
    root.classList.remove("accessibility-reading-mask");
    const mask = document.getElementById("accessibility-reading-mask");
    if (mask) mask.remove();
  }

  // Stop animations
  if (settings.stopAnimations) {
    root.classList.add("accessibility-stop-animations");
  } else {
    root.classList.remove("accessibility-stop-animations");
  }

  // High contrast
  if (settings.highContrast) {
    root.classList.add("accessibility-high-contrast");
  } else {
    root.classList.remove("accessibility-high-contrast");
  }

  // Monochrome
  if (settings.monochrome) {
    root.classList.add("accessibility-monochrome");
  } else {
    root.classList.remove("accessibility-monochrome");
  }

  // Hide images
  if (settings.hideImages) {
    root.classList.add("accessibility-hide-images");
  } else {
    root.classList.remove("accessibility-hide-images");
  }

  // Outline focus
  if (settings.outlineFocus) {
    root.classList.add("accessibility-outline-focus");
  } else {
    root.classList.remove("accessibility-outline-focus");
  }

  // Page structure
  if (settings.pageStructure) {
    root.classList.add("accessibility-page-structure");
  } else {
    root.classList.remove("accessibility-page-structure");
  }
}

function saveSettings(settings: AccessibilitySettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save accessibility settings:", error);
  }
}
