/**
 * @file Speed calculation utilities for Von Junzt's Dynamic Token Speed
 * @description Calculates movement animation speed based on actor movement values
 */

import { debug } from "./debug.js";
import { 
    MODULE_ID,
    SETTINGS_KEYS,
    DEFAULTS,
    INSTANT_MOVEMENTS
} from "./constants.js";
import { getSystemConfig } from "./systemConfigs.js";

/**
 * Calculate the movement animation speed for a token based on its actor's movement speed
 * @param {TokenDocument} tokenDocument - The token document to calculate speed for
 * @returns {number|null} The calculated animation speed in spaces per second, or null if not applicable
 */
export function calculateMovementSpeed(tokenDocument) {
    const actor = tokenDocument.actor;
    
    // Skip if no actor
    if (!actor) {
        debug(`Token ${tokenDocument.name} has no actor`);
        return null;
    }
    
    // Get system configuration
    const systemConfig = getSystemConfig();
    if (!systemConfig) {
        debug(`System ${game.system.id} is not supported`);
        return null;
    }
    
    // Skip if actor type should be skipped (e.g., vehicles)
    const actorType = actor[systemConfig.paths.actorType];
    if (systemConfig.skipActorTypes.includes(actorType)) {
        debug(`Skipping ${actorType} token ${tokenDocument.name}`);
        return null;
    }
    
    // Get the current movement action from Foundry v13
    // Default to walk if not set
    const movementAction = tokenDocument.movementAction || DEFAULTS.MOVEMENT_TYPE;
    
    // Check if this is an instant movement type
    if (INSTANT_MOVEMENTS.includes(movementAction)) {
        debug(`${actor.name}: ${movementAction} movement - instant`);
        return null;
    }
    
    // Get the system-specific movement property name for this movement type
    const movementProperty = systemConfig.movementMappings[movementAction] || 
                           systemConfig.movementMappings['walk'];
    
    // Get the actor's movement data from system
    const movementData = foundry.utils.getProperty(actor, systemConfig.paths.movement);
    
    // Get the speed value for the current movement type
    let speed = movementData?.[movementProperty];
    
    // Fallback if movement type not available or null
    if (!speed && speed !== 0) {
        // Try default or walk speed as fallback
        speed = movementData?.default || movementData?.walk || movementData?.ground || systemConfig.defaultSpeed;
        debug(`${actor.name}: No ${movementProperty} speed, using default: ${speed} ${systemConfig.speedUnit}`);
    }
    
    // Get module settings
    const baseMultiplier = game.settings.get(MODULE_ID, SETTINGS_KEYS.SPEED_MULTIPLIER);
    const baseAnimationSpeed = game.settings.get(MODULE_ID, SETTINGS_KEYS.BASE_ANIMATION_SPEED);
    
    // Convert system speed to Foundry spaces per second
    let spacesPerSecond;
    
    if (systemConfig.id === 'dnd5e') {
        // D&D: Convert feet to spaces, then to spaces per second
        // speed is in feet, divide by feetPerSpace to get spaces per turn
        // Then normalize based on 30ft being normal speed
        const spacesPerTurn = speed / systemConfig.feetPerSpace;
        spacesPerSecond = (spacesPerTurn / (systemConfig.normalSpeed / systemConfig.feetPerSpace)) * 
                         baseAnimationSpeed * baseMultiplier;
    } else {
        // SWADE and others: Normalize based on system's normal speed
        spacesPerSecond = (speed / systemConfig.normalSpeed) * 
                         baseAnimationSpeed * baseMultiplier;
    }
    
    // Ensure minimum speed
    spacesPerSecond = Math.max(spacesPerSecond, DEFAULTS.MIN_SPEED);
    
    debug(`${actor.name}: ${movementAction} movement - Speed ${speed} ${systemConfig.speedUnit}, ` +
          `Animation ${spacesPerSecond.toFixed(2)} spaces/sec`);
    
    return spacesPerSecond;
}