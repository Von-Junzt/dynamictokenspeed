/**
 * @file Debug utilities for Von Junzt's Dynamic Token Speed
 * @description Provides debug logging functions that respect module settings
 */

import { MODULE_ID, SETTINGS_KEYS } from "./constants.js";

// Cache the module prefix
const PREFIX = `VJ DTS`;

/**
 * Check if debug mode is enabled
 * @returns {boolean} True if debug mode is enabled
 */
function isDebugEnabled() {
    // During init, settings might not be available yet
    if (!game?.settings?.settings) return false;
    
    // Check if our setting is actually registered
    const settingKey = `${MODULE_ID}.${SETTINGS_KEYS.DEBUG_MODE}`;
    if (!game.settings.settings.has(settingKey)) return false;
    
    return game.settings.get(MODULE_ID, SETTINGS_KEYS.DEBUG_MODE) ?? false;
}

/**
 * Log a debug message if debug mode is enabled
 * @param {...any} args - Arguments to log
 */
export function debug(...args) {
    if (isDebugEnabled()) {
        console.log(`${PREFIX}:`, ...args);
    }
}

/**
 * Log a warning message if debug mode is enabled
 * @param {...any} args - Arguments to log
 */
export function debugWarn(...args) {
    if (isDebugEnabled()) {
        console.warn(`${PREFIX}:`, ...args);
    }
}

/**
 * Log an error message if debug mode is enabled
 * @param {...any} args - Arguments to log
 */
export function debugError(...args) {
    if (isDebugEnabled()) {
        console.error(`${PREFIX}:`, ...args);
    }
}