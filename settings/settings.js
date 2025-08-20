import { debug } from "../scripts/utils/debug.js";
import { MODULE_ID, SETTINGS_KEYS, DEFAULTS } from "../scripts/utils/constants.js";

export function registerSettings() {
    // Debug Mode Setting
    game.settings.register(MODULE_ID, SETTINGS_KEYS.DEBUG_MODE, {
        name: game.i18n.localize('dynamictokenspeed.Settings.DebugMode.Name'),
        hint: game.i18n.localize('dynamictokenspeed.Settings.DebugMode.Hint'),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: value => {
            debug(`Debug mode ${value ? 'enabled' : 'disabled'}`);
        }
    });
    
    // Enable Animation Setting
    game.settings.register(MODULE_ID, SETTINGS_KEYS.ENABLE_ANIMATION, {
        name: game.i18n.localize('dynamictokenspeed.Settings.EnableAnimation.Name'),
        hint: game.i18n.localize('dynamictokenspeed.Settings.EnableAnimation.Hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });
    
    // Speed Multiplier Setting
    game.settings.register(MODULE_ID, SETTINGS_KEYS.SPEED_MULTIPLIER, {
        name: game.i18n.localize('dynamictokenspeed.Settings.SpeedMultiplier.Name'),
        hint: game.i18n.localize('dynamictokenspeed.Settings.SpeedMultiplier.Hint'),
        scope: 'world',
        config: true,
        type: Number,
        default: DEFAULTS.SPEED_MULTIPLIER,
        range: {
            min: 0.1,
            max: 10,
            step: 0.1
        }
    });
    
    // Base Animation Speed Setting
    game.settings.register(MODULE_ID, SETTINGS_KEYS.BASE_ANIMATION_SPEED, {
        name: game.i18n.localize('dynamictokenspeed.Settings.BaseAnimationSpeed.Name'),
        hint: game.i18n.localize('dynamictokenspeed.Settings.BaseAnimationSpeed.Hint'),
        scope: 'world',
        config: true,
        type: Number,
        default: 6,
        range: {
            min: 1,
            max: 20,
            step: 0.5
        }
    });
}

// Export helper function to check debug status
export function isDebugEnabled() {
    return game.settings.get(MODULE_ID, SETTINGS_KEYS.DEBUG_MODE) ?? false;
}