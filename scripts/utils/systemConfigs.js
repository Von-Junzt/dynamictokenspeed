/**
 * @file System configurations for Von Junzt's Dynamic Token Speed
 * @description Configuration objects for each supported game system
 */

/**
 * System-specific configurations for movement speed calculations
 * Each system defines its own data paths, movement mappings, and normalization factors
 */
export const SYSTEM_CONFIGS = {
    'swade': {
        id: 'swade',
        name: 'SWADE',
        // Data paths for accessing movement speeds
        paths: {
            movement: 'system.pace',           // Base path to movement data
            actorType: 'type'                  // Path to actor type
        },
        // Movement type mappings from Foundry to SWADE
        movementMappings: {
            'walk': 'ground',
            'fly': 'fly',
            'swim': 'swim',
            'burrow': 'burrow',
            'climb': 'ground',   // Use ground pace for climbing
            'crawl': 'ground'    // Use ground pace for crawling
        },
        // Speed normalization
        normalSpeed: 6,          // 6 inches is normal pace in SWADE
        defaultSpeed: 6,         // Default if no speed found
        speedUnit: 'inches',     // Unit of measurement
        // Actor types to skip
        skipActorTypes: ['vehicle']
    },
    
    'dnd5e': {
        id: 'dnd5e',
        name: 'D&D 5e',
        // Data paths for accessing movement speeds
        paths: {
            movement: 'system.attributes.movement',  // Base path to movement data
            actorType: 'type'                       // Path to actor type
        },
        // Movement type mappings (D&D uses same names as Foundry)
        movementMappings: {
            'walk': 'walk',
            'fly': 'fly',
            'swim': 'swim',
            'burrow': 'burrow',
            'climb': 'climb',
            'crawl': 'walk'      // Use walk speed for crawling
        },
        // Speed normalization
        normalSpeed: 30,         // 30 feet is normal speed in D&D 5e
        defaultSpeed: 30,        // Default if no speed found
        speedUnit: 'feet',       // Unit of measurement
        feetPerSpace: 5,         // 5 feet per grid space
        // Actor types to skip
        skipActorTypes: ['vehicle']
    }
};

/**
 * Get configuration for the current game system
 * @returns {Object|null} System configuration or null if unsupported
 */
export function getSystemConfig() {
    const systemId = game.system.id;
    return SYSTEM_CONFIGS[systemId] || null;
}

/**
 * Check if the current system is supported
 * @returns {boolean} True if the system is supported
 */
export function isSystemSupported() {
    return game.system.id in SYSTEM_CONFIGS;
}

/**
 * Get list of supported system names
 * @returns {string[]} Array of supported system names
 */
export function getSupportedSystemNames() {
    return Object.values(SYSTEM_CONFIGS).map(config => config.name);
}