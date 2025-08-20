/**
 * @file Movement speed modification hook for Von Junzt's Dynamic Token Speed
 * @description Hooks into token movement to apply system-specific animation speed
 */

import { calculateMovementSpeed } from "../utils/speedCalculation.js";
import { debug, debugWarn, debugError } from "../utils/debug.js";
import { MODULE_ID, SETTINGS_KEYS } from "../utils/constants.js";

/**
 * Register the movement speed modification hooks
 */
export function movementSpeedHook() {
    // Check if animation is enabled
    if (!game.settings.get(MODULE_ID, SETTINGS_KEYS.ENABLE_ANIMATION)) {
        debug('Movement animation is disabled in settings');
        return;
    }
    
    // Hook into preUpdateToken to modify animation options before the update
    Hooks.on("preUpdateToken", (document, changes, options, userId) => {
        // Only process if this update includes movement
        if (!("x" in changes || "y" in changes)) {
            return;
        }
        
        // Only modify if animation is being used
        if (options.animate === false) {
            return;
        }
        
        // Check if animation is enabled in settings
        if (!game.settings.get(MODULE_ID, SETTINGS_KEYS.ENABLE_ANIMATION)) {
            return;
        }
        
        const speed = calculateMovementSpeed(document);
        if (speed !== null) {
            // Set animation options using v13 API
            // movementSpeed is in spaces per second
            options.animation = options.animation || {};
            options.animation.movementSpeed = speed;
            
            debug(`Token ${document.name}: Movement speed set to ${speed.toFixed(2)} spaces/second`);
        }
    });
    
    debug("Successfully registered preUpdateToken hook for movement speed modification");
}