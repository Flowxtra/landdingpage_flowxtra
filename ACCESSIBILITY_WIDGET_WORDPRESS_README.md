# Accessibility Widget for WordPress - Implementation Guide

## Overview

This guide provides complete instructions for implementing the same accessibility widget design and features from the Next.js Flowxtra website into a WordPress plugin. The widget includes comprehensive accessibility features compliant with WCAG 2.1 Level AA standards.

## Table of Contents

1. [Features Overview](#features-overview)
2. [Plugin Structure](#plugin-structure)
3. [File Structure](#file-structure)
4. [Implementation Steps](#implementation-steps)
5. [Code Files](#code-files)
6. [CSS Styles](#css-styles)
7. [JavaScript Functionality](#javascript-functionality)
8. [PHP Integration](#php-integration)
9. [Testing Checklist](#testing-checklist)
10. [Installation Instructions](#installation-instructions)

---

## Features Overview

### Core Accessibility Features

1. **Content Adjustments**
   - Font size (0.875x, 1x, 1.125x, 1.25x, 1.5x)
   - Line height (1.2x, 1.5x, 2x, 2.5x)
   - Text alignment (left, center, justify)
   - Readable font (dyslexia-friendly font switching)

2. **Orientation Adjustments**
   - Page structure visualization
   - Reading mask (follows mouse cursor)
   - Hide images
   - Pause animations
   - Highlight links
   - Outline focus elements

3. **Color Adjustments**
   - Dark/Light mode toggle
   - Greyscale mode
   - High contrast mode

### UI/UX Features

- **Smart Floating Button**: 
  - Appears automatically when any accessibility setting is activated (different from default)
  - Hides automatically when panel is open (to avoid overlap)
  - Hides automatically when all settings are reset to default
  - Persists across page reloads and navigation
  - Positioned on the right side of the screen, centered vertically
- **Slide-out Panel**: Opens from the right side with smooth animation
- **Settings Persistence**: All settings saved in localStorage and persist across pages
- **Real-time Updates**: Button visibility updates immediately when settings change
- **Multi-tab Support**: Settings sync across multiple browser tabs
- **Reset Functionality**: One-click reset restores all default settings and hides button
- **Responsive Design**: Fully functional on mobile, tablet, and desktop
- **Keyboard Navigation**: ESC key closes panel, full keyboard accessibility
- **ARIA Labels**: Complete screen reader support

---

## Plugin Structure

### Main Plugin File

```
flowxtra-accessibility/
├── flowxtra-accessibility.php (Main plugin file)
├── includes/
│   ├── class-accessibility-settings.php
│   ├── class-accessibility-widget.php
│   └── class-accessibility-panel.php
├── assets/
│   ├── css/
│   │   └── accessibility-widget.css
│   ├── js/
│   │   └── accessibility-widget.js
│   └── images/
│       └── dpro-icon.png
├── languages/
│   ├── accessibility-widget-en_US.po
│   └── accessibility-widget-de_DE.po
└── README.md
```

---

## File Structure

### 1. Main Plugin File: `flowxtra-accessibility.php`

```php
<?php
/**
 * Plugin Name: Flowxtra Accessibility Widget
 * Plugin URI: https://flowxtra.com
 * Description: Comprehensive accessibility widget for WordPress websites with WCAG 2.1 Level AA compliance
 * Version: 1.0.0
 * Author: Flowxtra
 * Author URI: https://flowxtra.com
 * License: GPL v2 or later
 * Text Domain: flowxtra-accessibility
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('FLOWXTRA_ACCESSIBILITY_VERSION', '1.0.0');
define('FLOWXTRA_ACCESSIBILITY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('FLOWXTRA_ACCESSIBILITY_PLUGIN_URL', plugin_dir_url(__FILE__));

// Load plugin classes
require_once FLOWXTRA_ACCESSIBILITY_PLUGIN_DIR . 'includes/class-accessibility-settings.php';
require_once FLOWXTRA_ACCESSIBILITY_PLUGIN_DIR . 'includes/class-accessibility-widget.php';

// Initialize plugin
function flowxtra_accessibility_init() {
    $widget = new Flowxtra_Accessibility_Widget();
    $widget->init();
}
add_action('plugins_loaded', 'flowxtra_accessibility_init');

// Enqueue scripts and styles
function flowxtra_accessibility_enqueue_assets() {
    // CSS
    wp_enqueue_style(
        'flowxtra-accessibility-css',
        FLOWXTRA_ACCESSIBILITY_PLUGIN_URL . 'assets/css/accessibility-widget.css',
        array(),
        FLOWXTRA_ACCESSIBILITY_VERSION
    );

    // JavaScript
    wp_enqueue_script(
        'flowxtra-accessibility-js',
        FLOWXTRA_ACCESSIBILITY_PLUGIN_URL . 'assets/js/accessibility-widget.js',
        array('jquery'),
        FLOWXTRA_ACCESSIBILITY_VERSION,
        true
    );

    // Localize script for translations
    wp_localize_script('flowxtra-accessibility-js', 'flowxtraAccessibility', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('flowxtra_accessibility_nonce'),
        'strings' => array(
            'title' => __('Accessibility', 'flowxtra-accessibility'),
            'close' => __('Close', 'flowxtra-accessibility'),
            'reset' => __('Reset', 'flowxtra-accessibility'),
            'contentAdjustments' => __('Content Adjustments', 'flowxtra-accessibility'),
            'orientationAdjustments' => __('Orientation Adjustments', 'flowxtra-accessibility'),
            'colorAdjustments' => __('Color Adjustments', 'flowxtra-accessibility'),
            'biggerText' => __('Bigger text', 'flowxtra-accessibility'),
            'biggerLineHeight' => __('Bigger line height', 'flowxtra-accessibility'),
            'textAlign' => __('Text align', 'flowxtra-accessibility'),
            'readableFont' => __('Readable font', 'flowxtra-accessibility'),
            'pageStructure' => __('Page structure', 'flowxtra-accessibility'),
            'readingMask' => __('Reading mask', 'flowxtra-accessibility'),
            'hideImages' => __('Hide images', 'flowxtra-accessibility'),
            'pauseAnimations' => __('Pause animations', 'flowxtra-accessibility'),
            'highlightLinks' => __('Highlight links', 'flowxtra-accessibility'),
            'outlineFocus' => __('Outline focus', 'flowxtra-accessibility'),
            'darkMode' => __('Dark mode', 'flowxtra-accessibility'),
            'lightMode' => __('Light mode', 'flowxtra-accessibility'),
            'greyscale' => __('Greyscale', 'flowxtra-accessibility'),
            'contrast' => __('Contrast', 'flowxtra-accessibility'),
            'poweredBy' => __('Accessibility by', 'flowxtra-accessibility'),
            'dpro' => __('Dpro', 'flowxtra-accessibility'),
            'statement' => __('Statement', 'flowxtra-accessibility'),
            'sitemap' => __('Sitemap', 'flowxtra-accessibility'),
        ),
    ));
}
add_action('wp_enqueue_scripts', 'flowxtra_accessibility_enqueue_assets');
```

### 2. Widget Class: `includes/class-accessibility-widget.php`

```php
<?php
/**
 * Accessibility Widget Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class Flowxtra_Accessibility_Widget {
    
    public function init() {
        // Add widget HTML to footer
        add_action('wp_footer', array($this, 'render_widget'));
    }

    public function render_widget() {
        ?>
        <div id="flowxtra-accessibility-container">
            <!-- Floating Button (shown when settings are active) -->
            <button
                id="flowxtra-accessibility-button"
                class="flowxtra-accessibility-button"
                aria-label="<?php esc_attr_e('Open Accessibility Menu', 'flowxtra-accessibility'); ?>"
                style="display: none;"
            >
                <svg class="flowxtra-accessibility-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="currentColor"/>
                    <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="currentColor"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="currentColor"/>
                </svg>
            </button>

            <!-- Panel Overlay -->
            <div id="flowxtra-accessibility-panel-overlay" class="flowxtra-accessibility-panel-overlay" style="display: none;">
                <!-- Panel Content -->
                <div class="flowxtra-accessibility-panel" id="flowxtra-accessibility-panel">
                    <!-- Panel Header -->
                    <div class="flowxtra-accessibility-panel-header">
                        <div class="flowxtra-accessibility-panel-header-left">
                            <svg class="flowxtra-accessibility-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="currentColor"/>
                                <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="currentColor"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="currentColor"/>
                            </svg>
                            <h2 class="flowxtra-accessibility-panel-title"><?php esc_html_e('Accessibility', 'flowxtra-accessibility'); ?></h2>
                        </div>
                        <div class="flowxtra-accessibility-panel-header-right">
                            <button id="flowxtra-accessibility-reset" class="flowxtra-accessibility-reset-btn" aria-label="<?php esc_attr_e('Reset', 'flowxtra-accessibility'); ?>">
                                <svg class="flowxtra-accessibility-icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <button id="flowxtra-accessibility-close" class="flowxtra-accessibility-close-btn" aria-label="<?php esc_attr_e('Close', 'flowxtra-accessibility'); ?>">
                                <svg class="flowxtra-accessibility-icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Panel Content -->
                    <div class="flowxtra-accessibility-panel-content">
                        <!-- Content Adjustments Section -->
                        <div class="flowxtra-accessibility-section">
                            <h3 class="flowxtra-accessibility-section-title"><?php esc_html_e('Content Adjustments', 'flowxtra-accessibility'); ?></h3>
                            <div class="flowxtra-accessibility-grid flowxtra-accessibility-grid-2">
                                <!-- Bigger Text -->
                                <button class="flowxtra-accessibility-option" data-setting="fontSize">
                                    <div class="flowxtra-accessibility-option-icon">
                                        <span style="font-size: 1.25em; font-weight: bold;">T<small>r</small></span>
                                    </div>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Bigger text', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Bigger Line Height -->
                                <button class="flowxtra-accessibility-option" data-setting="lineHeight">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l4-4m0 0l4 4m-4-4v12" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8l4 4m0 0l4-4m-4 4V4" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Bigger line height', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Text Align -->
                                <button class="flowxtra-accessibility-option" data-setting="textAlign">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Text align', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Readable Font -->
                                <button class="flowxtra-accessibility-option" data-setting="readableFont">
                                    <div class="flowxtra-accessibility-option-icon">
                                        <span style="font-size: 1.25em; font-weight: bold;">Aa</span>
                                    </div>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Readable font', 'flowxtra-accessibility'); ?></span>
                                </button>
                            </div>
                        </div>

                        <!-- Orientation Adjustments Section -->
                        <div class="flowxtra-accessibility-section">
                            <h3 class="flowxtra-accessibility-section-title"><?php esc_html_e('Orientation Adjustments', 'flowxtra-accessibility'); ?></h3>
                            <div class="flowxtra-accessibility-grid flowxtra-accessibility-grid-2">
                                <!-- Page Structure -->
                                <button class="flowxtra-accessibility-option" data-setting="pageStructure">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Page structure', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Reading Mask -->
                                <button class="flowxtra-accessibility-option" data-setting="readingMask">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Reading mask', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Hide Images -->
                                <button class="flowxtra-accessibility-option" data-setting="hideImages">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Hide images', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Pause Animations -->
                                <button class="flowxtra-accessibility-option" data-setting="stopAnimations">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M6 18L18 6" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Pause animations', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Highlight Links -->
                                <button class="flowxtra-accessibility-option" data-setting="highlightLinks">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Highlight links', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Outline Focus -->
                                <button class="flowxtra-accessibility-option" data-setting="outlineFocus">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Outline focus', 'flowxtra-accessibility'); ?></span>
                                </button>
                            </div>
                        </div>

                        <!-- Color Adjustments Section -->
                        <div class="flowxtra-accessibility-section">
                            <h3 class="flowxtra-accessibility-section-title"><?php esc_html_e('Color Adjustments', 'flowxtra-accessibility'); ?></h3>
                            <div class="flowxtra-accessibility-grid flowxtra-accessibility-grid-2">
                                <!-- Dark/Light Mode -->
                                <button class="flowxtra-accessibility-option" id="flowxtra-accessibility-dark-mode" data-setting="darkMode">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Dark mode', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- Greyscale -->
                                <button class="flowxtra-accessibility-option" data-setting="monochrome">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Greyscale', 'flowxtra-accessibility'); ?></span>
                                </button>

                                <!-- High Contrast -->
                                <button class="flowxtra-accessibility-option" data-setting="highContrast">
                                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span class="flowxtra-accessibility-option-label"><?php esc_html_e('Contrast', 'flowxtra-accessibility'); ?></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Panel Footer -->
                    <div class="flowxtra-accessibility-panel-footer">
                        <div class="flowxtra-accessibility-panel-footer-left">
                            <span><?php esc_html_e('Accessibility by', 'flowxtra-accessibility'); ?></span>
                            <a href="https://dpro.at" target="_blank" rel="noopener noreferrer" class="flowxtra-accessibility-footer-link">
                                <img src="<?php echo esc_url(FLOWXTRA_ACCESSIBILITY_PLUGIN_URL . 'assets/images/dpro-icon.png'); ?>" alt="Dpro" width="20" height="20">
                                <span><?php esc_html_e('Dpro', 'flowxtra-accessibility'); ?></span>
                            </a>
                        </div>
                        <div class="flowxtra-accessibility-panel-footer-right">
                            <a href="<?php echo esc_url(home_url('/accessibility')); ?>" class="flowxtra-accessibility-footer-link">
                                <?php esc_html_e('Statement', 'flowxtra-accessibility'); ?>
                                <svg class="flowxtra-accessibility-icon-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                            <span class="flowxtra-accessibility-footer-separator">|</span>
                            <a href="<?php echo esc_url(home_url('/sitemap.xml')); ?>" class="flowxtra-accessibility-footer-link">
                                <?php esc_html_e('Sitemap', 'flowxtra-accessibility'); ?>
                                <svg class="flowxtra-accessibility-icon-inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reading Mask Overlay -->
            <div id="flowxtra-accessibility-reading-mask" class="flowxtra-accessibility-reading-mask-overlay"></div>
        </div>
        <?php
    }
}
```

---

## CSS Styles

### File: `assets/css/accessibility-widget.css`

```css
/* ============================================
   Flowxtra Accessibility Widget Styles
   ============================================ */

/* Floating Button */
.flowxtra-accessibility-button {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%) translateX(0);
    z-index: 9998;
    background-color: #003f4d;
    color: white;
    padding: 1rem;
    border-radius: 1rem 0 0 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flowxtra-accessibility-button:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%) translateX(-4px);
}

.flowxtra-accessibility-button:focus {
    outline: 2px solid #003f4d;
    outline-offset: 2px;
}

.flowxtra-accessibility-icon {
    width: 1.5rem;
    height: 1.5rem;
}

/* Panel Overlay */
.flowxtra-accessibility-panel-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
}

/* Panel */
.flowxtra-accessibility-panel {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 28rem;
    background-color: #ffffff;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    transform: translateX(0);
    transition: transform 0.3s ease-out;
}

/* Dark Mode Support */
.dark .flowxtra-accessibility-panel {
    background-color: #111827;
}

/* Panel Header */
.flowxtra-accessibility-panel-header {
    background-color: #003f4d;
    color: white;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dark .flowxtra-accessibility-panel-header {
    background-color: #006980;
}

.flowxtra-accessibility-panel-header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.flowxtra-accessibility-panel-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0;
}

.flowxtra-accessibility-panel-header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.flowxtra-accessibility-reset-btn,
.flowxtra-accessibility-close-btn {
    padding: 0.5rem;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
}

.flowxtra-accessibility-reset-btn:hover,
.flowxtra-accessibility-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.flowxtra-accessibility-icon-small {
    width: 1.25rem;
    height: 1.25rem;
}

/* Panel Content */
.flowxtra-accessibility-panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 0;
}

/* Section */
.flowxtra-accessibility-section {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.dark .flowxtra-accessibility-section {
    border-bottom-color: #374151;
}

.flowxtra-accessibility-section-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
}

.dark .flowxtra-accessibility-section-title {
    color: #d1d5db;
}

/* Grid */
.flowxtra-accessibility-grid {
    display: grid;
    gap: 0.5rem;
}

.flowxtra-accessibility-grid-2 {
    grid-template-columns: repeat(2, 1fr);
}

/* Option Button */
.flowxtra-accessibility-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #f9fafb;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s;
}

.dark .flowxtra-accessibility-option {
    background-color: #1f2937;
}

.flowxtra-accessibility-option:hover {
    background-color: #f3f4f6;
}

.dark .flowxtra-accessibility-option:hover {
    background-color: #374151;
}

.flowxtra-accessibility-option.active {
    background-color: rgba(0, 63, 77, 0.1);
    border-color: #003f4d;
}

.dark .flowxtra-accessibility-option.active {
    background-color: rgba(0, 105, 128, 0.1);
    border-color: #006980;
}

.flowxtra-accessibility-option-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #003f4d;
}

.dark .flowxtra-accessibility-option-icon {
    color: #006980;
}

.flowxtra-accessibility-option-label {
    font-size: 0.75rem;
    color: #4b5563;
}

.dark .flowxtra-accessibility-option-label {
    color: #9ca3af;
}

/* Panel Footer */
.flowxtra-accessibility-panel-footer {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
}

.dark .flowxtra-accessibility-panel-footer {
    border-top-color: #374151;
    color: #9ca3af;
}

.flowxtra-accessibility-panel-footer-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.flowxtra-accessibility-panel-footer-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.flowxtra-accessibility-footer-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
}

.flowxtra-accessibility-footer-link:hover {
    color: #003f4d;
}

.dark .flowxtra-accessibility-footer-link:hover {
    color: #006980;
}

.flowxtra-accessibility-icon-inline {
    width: 0.75rem;
    height: 0.75rem;
}

.flowxtra-accessibility-footer-separator {
    color: #d1d5db;
}

.dark .flowxtra-accessibility-footer-separator {
    color: #4b5563;
}

/* ============================================
   Accessibility Feature Styles
   ============================================ */

/* Highlight Links */
.accessibility-highlight-links a {
    background-color: yellow !important;
    color: #000 !important;
    text-decoration: underline !important;
    padding: 2px 4px !important;
    border-radius: 2px !important;
}

/* Large Cursor */
.accessibility-large-cursor,
.accessibility-large-cursor * {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="2" fill="currentColor"/></svg>') 16 16, auto !important;
}

/* Stop Animations */
.accessibility-stop-animations *,
.accessibility-stop-animations *::before,
.accessibility-stop-animations *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
}

/* High Contrast */
.accessibility-high-contrast {
    filter: contrast(1.5) brightness(1.1);
}

/* Monochrome */
.accessibility-monochrome {
    filter: grayscale(100%);
}

/* Reading Mask Overlay */
.flowxtra-accessibility-reading-mask-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    display: none;
}

.accessibility-reading-mask .flowxtra-accessibility-reading-mask-overlay {
    display: block;
}

/* Readable Font */
.accessibility-readable-font {
    font-family: 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif !important;
    letter-spacing: 0.05em !important;
}

/* Hide Images */
.accessibility-hide-images img,
.accessibility-hide-images picture,
.accessibility-hide-images [role="img"] {
    display: none !important;
}

.accessibility-hide-images [style*="background-image"] {
    background-image: none !important;
}

/* Outline Focus */
.accessibility-outline-focus *:focus {
    outline: 3px solid #003f4d !important;
    outline-offset: 2px !important;
}

.accessibility-outline-focus button:focus,
.accessibility-outline-focus a:focus,
.accessibility-outline-focus input:focus,
.accessibility-outline-focus select:focus,
.accessibility-outline-focus textarea:focus {
    outline: 3px solid #003f4d !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 3px rgba(0, 63, 77, 0.3) !important;
}

/* Page Structure */
.accessibility-page-structure header,
.accessibility-page-structure nav,
.accessibility-page-structure main,
.accessibility-page-structure footer,
.accessibility-page-structure section,
.accessibility-page-structure article,
.accessibility-page-structure aside {
    border: 2px dashed #003f4d !important;
    margin: 2px !important;
    padding: 4px !important;
}

.accessibility-page-structure header::before,
.accessibility-page-structure nav::before,
.accessibility-page-structure main::before,
.accessibility-page-structure footer::before {
    content: attr(aria-label);
    display: block;
    background: #003f4d;
    color: white;
    padding: 2px 4px;
    font-size: 10px;
    margin-bottom: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .flowxtra-accessibility-panel {
        max-width: 100%;
    }

    .flowxtra-accessibility-grid-2 {
        grid-template-columns: repeat(2, 1fr);
    }

    .flowxtra-accessibility-button {
        padding: 0.75rem;
    }
}
```

---

## JavaScript Functionality

### File: `assets/js/accessibility-widget.js`

```javascript
(function($) {
    'use strict';

    const FlowxtraAccessibility = {
        // Default settings
        defaultSettings: {
            fontSize: 1,
            lineHeight: 1.5,
            textAlign: 'left',
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
            darkMode: false
        },

        // Current settings
        settings: {},

        // Storage key
        storageKey: 'flowxtra_accessibility_settings',

        // Initialize
        init: function() {
            this.loadSettings();
            this.bindEvents();
            this.applySettings();
            this.checkActiveSettings();
            this.setupDarkModeListener();
        },

        // Load settings from localStorage
        loadSettings: function() {
            try {
                const saved = localStorage.getItem(this.storageKey);
                if (saved) {
                    this.settings = JSON.parse(saved);
                } else {
                    this.settings = { ...this.defaultSettings };
                }
            } catch (error) {
                console.error('Failed to load accessibility settings:', error);
                this.settings = { ...this.defaultSettings };
            }
        },

        // Save settings to localStorage
        saveSettings: function() {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
                // checkActiveSettings will be called by the interval or when settings change
            } catch (error) {
                console.error('Failed to save accessibility settings:', error);
            }
        },

        // Apply settings to document
        applySettings: function() {
            const root = document.documentElement;
            const body = document.body;

            // Font size
            root.style.fontSize = (this.settings.fontSize * 100) + '%';

            // Line height
            root.style.lineHeight = this.settings.lineHeight;

            // Text align
            if (this.settings.textAlign !== 'left') {
                root.style.textAlign = this.settings.textAlign;
                root.classList.add('accessibility-text-align-' + this.settings.textAlign);
            } else {
                root.style.textAlign = 'left';
                root.classList.remove('accessibility-text-align-center', 'accessibility-text-align-justify');
            }

            // Readable font
            if (this.settings.readableFont) {
                root.classList.add('accessibility-readable-font');
            } else {
                root.classList.remove('accessibility-readable-font');
            }

            // Highlight links
            if (this.settings.highlightLinks) {
                root.classList.add('accessibility-highlight-links');
            } else {
                root.classList.remove('accessibility-highlight-links');
            }

            // Large cursor
            if (this.settings.largeCursor) {
                root.classList.add('accessibility-large-cursor');
            } else {
                root.classList.remove('accessibility-large-cursor');
            }

            // Reading mask
            if (this.settings.readingMask) {
                root.classList.add('accessibility-reading-mask');
                this.setupReadingMask();
            } else {
                root.classList.remove('accessibility-reading-mask');
                const mask = document.getElementById('flowxtra-accessibility-reading-mask');
                if (mask) {
                    mask.style.display = 'none';
                }
            }

            // Stop animations
            if (this.settings.stopAnimations) {
                root.classList.add('accessibility-stop-animations');
            } else {
                root.classList.remove('accessibility-stop-animations');
            }

            // High contrast
            if (this.settings.highContrast) {
                root.classList.add('accessibility-high-contrast');
            } else {
                root.classList.remove('accessibility-high-contrast');
            }

            // Monochrome
            if (this.settings.monochrome) {
                root.classList.add('accessibility-monochrome');
            } else {
                root.classList.remove('accessibility-monochrome');
            }

            // Hide images
            if (this.settings.hideImages) {
                root.classList.add('accessibility-hide-images');
            } else {
                root.classList.remove('accessibility-hide-images');
            }

            // Outline focus
            if (this.settings.outlineFocus) {
                root.classList.add('accessibility-outline-focus');
            } else {
                root.classList.remove('accessibility-outline-focus');
            }

            // Page structure
            if (this.settings.pageStructure) {
                root.classList.add('accessibility-page-structure');
            } else {
                root.classList.remove('accessibility-page-structure');
            }

            // Dark mode
            if (this.settings.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            // Update UI
            this.updateUI();
        },

        // Setup reading mask
        setupReadingMask: function() {
            const mask = document.getElementById('flowxtra-accessibility-reading-mask');
            if (!mask) return;

            mask.style.display = 'block';

            const handleMouseMove = (e) => {
                const radius = 100;
                mask.style.background = `radial-gradient(circle ${radius}px at ${e.clientX}px ${e.clientY}px, transparent 0%, rgba(0, 0, 0, 0.7) 100%)`;
            };

            document.addEventListener('mousemove', handleMouseMove);
        },

        // Update UI based on settings
        updateUI: function() {
            // Update option buttons
            $('.flowxtra-accessibility-option').each(function() {
                const $btn = $(this);
                const setting = $btn.data('setting');
                const value = FlowxtraAccessibility.settings[setting];

                if (setting === 'fontSize') {
                    const isActive = value !== 1;
                    $btn.toggleClass('active', isActive);
                } else if (setting === 'lineHeight') {
                    const isActive = value !== 1.5;
                    $btn.toggleClass('active', isActive);
                } else if (setting === 'textAlign') {
                    const isActive = value !== 'left';
                    $btn.toggleClass('active', isActive);
                } else if (typeof value === 'boolean') {
                    $btn.toggleClass('active', value);
                }
            });

            // Update dark mode button
            const $darkModeBtn = $('#flowxtra-accessibility-dark-mode');
            if (this.settings.darkMode) {
                $darkModeBtn.html(`
                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="flowxtra-accessibility-option-label">${flowxtraAccessibility.strings.lightMode}</span>
                `);
            } else {
                $darkModeBtn.html(`
                    <svg class="flowxtra-accessibility-option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span class="flowxtra-accessibility-option-label">${flowxtraAccessibility.strings.darkMode}</span>
                `);
            }
        },

        // Check if any settings are active
        checkActiveSettings: function() {
            try {
                // Check localStorage first (in case settings changed in another tab)
                const saved = localStorage.getItem(this.storageKey);
                let settingsToCheck = this.settings;

                if (saved) {
                    try {
                        settingsToCheck = JSON.parse(saved);
                    } catch (e) {
                        // Use current settings if parsing fails
                    }
                }

                const hasActive = Object.keys(settingsToCheck).some(key => {
                    const value = settingsToCheck[key];
                    const defaultValue = this.defaultSettings[key];

                    // Check if value is different from default
                    if (key === 'fontSize' && value !== 1) return true;
                    if (key === 'lineHeight' && value !== 1.5) return true;
                    if (key === 'textAlign' && value !== 'left') return true;
                    if (typeof value === 'boolean' && value !== defaultValue) return true;

                    return false;
                });

                const $button = $('#flowxtra-accessibility-button');
                const $panel = $('#flowxtra-accessibility-panel-overlay');
                const isPanelOpen = $panel.is(':visible');

                // Show button only if there are active settings AND panel is closed
                if (hasActive && !isPanelOpen) {
                    $button.fadeIn(200);
                } else {
                    $button.fadeOut(200);
                }
            } catch (error) {
                console.error('Error checking active settings:', error);
                $('#flowxtra-accessibility-button').hide();
            }
        },

        // Bind events
        bindEvents: function() {
            const self = this;

            // Open panel
            $(document).on('click', '#flowxtra-accessibility-button', function() {
                $('#flowxtra-accessibility-panel-overlay').fadeIn(300);
                $('#flowxtra-accessibility-button').hide();
            });

            // Close panel
            $(document).on('click', '#flowxtra-accessibility-close', function() {
                $('#flowxtra-accessibility-panel-overlay').fadeOut(300);
                self.checkActiveSettings();
            });

            // Close panel on overlay click
            $(document).on('click', '#flowxtra-accessibility-panel-overlay', function(e) {
                if ($(e.target).is('#flowxtra-accessibility-panel-overlay')) {
                    $(this).fadeOut(300);
                    self.checkActiveSettings();
                }
            });

            // Prevent panel from closing when clicking inside
            $(document).on('click', '#flowxtra-accessibility-panel', function(e) {
                e.stopPropagation();
            });

            // ESC key to close
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape' && $('#flowxtra-accessibility-panel-overlay').is(':visible')) {
                    $('#flowxtra-accessibility-panel-overlay').fadeOut(300);
                    self.checkActiveSettings();
                }
            });

            // Reset settings
            $(document).on('click', '#flowxtra-accessibility-reset', function() {
                if (confirm('Are you sure you want to reset all accessibility settings?')) {
                    self.settings = { ...self.defaultSettings };
                    self.applySettings();
                    localStorage.removeItem(self.storageKey);
                    // Immediately check and hide button after reset
                    self.checkActiveSettings();
                }
            });

            // Option buttons
            $(document).on('click', '.flowxtra-accessibility-option', function(e) {
                e.stopPropagation();
                const $btn = $(this);
                const setting = $btn.data('setting');

                if (setting === 'fontSize') {
                    const options = [0.875, 1, 1.125, 1.25, 1.5];
                    const currentIndex = options.indexOf(self.settings.fontSize);
                    const nextIndex = (currentIndex + 1) % options.length;
                    self.settings.fontSize = options[nextIndex];
                } else if (setting === 'lineHeight') {
                    const options = [1.2, 1.5, 2, 2.5];
                    const currentIndex = options.indexOf(self.settings.lineHeight);
                    const nextIndex = (currentIndex + 1) % options.length;
                    self.settings.lineHeight = options[nextIndex];
                } else if (setting === 'textAlign') {
                    const options = ['left', 'center', 'justify'];
                    const currentIndex = options.indexOf(self.settings.textAlign);
                    const nextIndex = (currentIndex + 1) % options.length;
                    self.settings.textAlign = options[nextIndex];
                } else if (setting === 'darkMode') {
                    self.settings.darkMode = !self.settings.darkMode;
                } else {
                    self.settings[setting] = !self.settings[setting];
                }

                self.applySettings();
                self.saveSettings();
                // Check active settings immediately after change
                self.checkActiveSettings();
            });

            // Listen for storage changes (for multi-tab support)
            $(window).on('storage', function(e) {
                if (e.originalEvent.key === self.storageKey) {
                    self.loadSettings();
                    self.applySettings();
                    self.checkActiveSettings();
                }
            });

            // Periodically check for localStorage changes (every 300ms)
            // This ensures the button shows/hides even when changes happen in the same window
            setInterval(function() {
                self.checkActiveSettings();
            }, 300);
        },

        // Setup dark mode listener
        setupDarkModeListener: function() {
            // Check if dark mode class exists on html element
            const observer = new MutationObserver(() => {
                const isDark = document.documentElement.classList.contains('dark');
                if (this.settings.darkMode !== isDark) {
                    this.settings.darkMode = isDark;
                    this.saveSettings();
                    this.updateUI();
                }
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    };

    // Initialize on document ready
    $(document).ready(function() {
        FlowxtraAccessibility.init();
    });

})(jQuery);
```

---

## PHP Integration

### Settings Class: `includes/class-accessibility-settings.php`

```php
<?php
/**
 * Accessibility Settings Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class Flowxtra_Accessibility_Settings {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    public function add_admin_menu() {
        add_options_page(
            __('Accessibility Settings', 'flowxtra-accessibility'),
            __('Accessibility', 'flowxtra-accessibility'),
            'manage_options',
            'flowxtra-accessibility',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('flowxtra_accessibility_settings', 'flowxtra_accessibility_enabled');
        register_setting('flowxtra_accessibility_settings', 'flowxtra_accessibility_position');
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Accessibility Settings', 'flowxtra-accessibility'); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('flowxtra_accessibility_settings');
                do_settings_sections('flowxtra_accessibility_settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php esc_html_e('Enable Widget', 'flowxtra-accessibility'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="flowxtra_accessibility_enabled" value="1" <?php checked(get_option('flowxtra_accessibility_enabled'), 1); ?>>
                                <?php esc_html_e('Enable accessibility widget on frontend', 'flowxtra-accessibility'); ?>
                            </label>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}
```

---

## Testing Checklist

### Functionality Tests

- [ ] Floating button appears when settings are active
- [ ] Floating button hides when panel is open
- [ ] Panel opens from the right side
- [ ] Panel closes on overlay click
- [ ] Panel closes on ESC key
- [ ] Panel closes on close button click
- [ ] Settings persist across page reloads
- [ ] Settings persist across different pages
- [ ] Reset button clears all settings
- [ ] Button disappears when all settings are reset

### Feature Tests

- [ ] Font size changes work
- [ ] Line height changes work
- [ ] Text alignment changes work
- [ ] Readable font toggle works
- [ ] Highlight links toggle works
- [ ] Large cursor toggle works
- [ ] Reading mask follows mouse cursor
- [ ] Hide images toggle works
- [ ] Pause animations toggle works
- [ ] High contrast toggle works
- [ ] Monochrome toggle works
- [ ] Outline focus toggle works
- [ ] Page structure visualization works
- [ ] Dark mode toggle works

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] ARIA labels are present
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards

---

## Installation Instructions

### Step 1: Create Plugin Directory

1. Navigate to `/wp-content/plugins/`
2. Create a new folder: `flowxtra-accessibility`

### Step 2: Add Plugin Files

1. Copy all files to the plugin directory
2. Ensure file structure matches the structure above

### Step 3: Activate Plugin

1. Go to WordPress Admin → Plugins
2. Find "Flowxtra Accessibility Widget"
3. Click "Activate"

### Step 4: Configure Settings (Optional)

1. Go to Settings → Accessibility
2. Enable the widget if needed
3. Save settings

### Step 5: Test on Frontend

1. Visit your website's frontend
2. Activate any accessibility setting
3. Verify the floating button appears
4. Test all features

---

## Additional Notes

### Dark Mode Support

The widget supports dark mode if your theme uses the `dark` class on the `<html>` element. The widget will automatically detect and sync with your theme's dark mode.

### Customization

To customize colors, edit the CSS variables in `accessibility-widget.css`:
- Primary color: `#003f4d`
- Secondary color: `#006980`
- Text colors and backgrounds can be adjusted in the CSS file

### Performance

- The widget uses localStorage for settings persistence
- CSS and JavaScript are minified in production
- No external dependencies required (except jQuery, which is included in WordPress)

### Multilingual Support

The plugin supports translations via WordPress `.po` files. Create translation files in the `languages/` directory for your desired languages.

---

## Support

For issues or questions, contact:
- Website: https://flowxtra.com
- Email: support@flowxtra.com

---

## License

This plugin is licensed under GPL v2 or later.

---

**Last Updated**: January 2025
**Version**: 1.0.0

