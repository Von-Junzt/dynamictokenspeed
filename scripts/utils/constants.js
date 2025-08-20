/**
 * @file Constants for Von Junzt's Dynamic Token Speed
 * @description Centralized constants used throughout the module
 */

export const MODULE_ID = 'dynamictokenspeed';

// Settings keys
export const SETTINGS_KEYS = {
    DEBUG_MODE: 'debugMode',
    ENABLE_ANIMATION: 'enableAnimation',
    SPEED_MULTIPLIER: 'speedMultiplier',
    BASE_ANIMATION_SPEED: 'baseAnimationSpeed'
};

// Animation configuration
export const ANIMATION = {
    SPACES_PER_SECOND_BASE: 6  // Foundry's default animation speed
};

// Default values
export const DEFAULTS = {
    MIN_SPEED: 0.5,            // Minimum animation speed
    MOVEMENT_TYPE: 'walk',     // Default movement type
    SPEED_MULTIPLIER: 1.2      // Default speed multiplier
};

// Instant movement types (no animation)
export const INSTANT_MOVEMENTS = ['blink', 'teleport'];