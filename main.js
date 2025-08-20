import { registerSettings } from "./settings/settings.js";
import { movementSpeedHook } from "./scripts/hooks/movementSpeedHook.js";
import { debug, debugWarn } from "./scripts/utils/debug.js";
import { MODULE_ID } from "./scripts/utils/constants.js";
import { isSystemSupported, getSupportedSystemNames } from "./scripts/utils/systemConfigs.js";

// Initialize the module
Hooks.once('init', function() {
    // Display ASCII art logo
    const version = game.modules.get(MODULE_ID)?.version || '1.0.0';
    const logo = `
═══════════════════════════════════════════════════════════════

 ██╗   ██╗     ██╗    ██████╗ ████████╗███████╗
 ██║   ██║     ██║    ██╔══██╗╚══██╔══╝██╔════╝
 ██║   ██║     ██║    ██║  ██║   ██║   ███████╗
 ╚██╗ ██╔╝██   ██║    ██║  ██║   ██║   ╚════██║
  ╚████╔╝ ╚█████╔╝    ██████╔╝   ██║   ███████║
   ╚═══╝   ╚════╝     ╚═════╝    ╚═╝   ╚══════╝
                                                 
         Dynamic Token Speed v${version}
              by Von Junzt                   
                                                 
═══════════════════════════════════════════════════════════════`;
    
    // Always show the logo on startup
    console.log(`%c${logo}`, 'color: #00ff88; font-family: monospace; font-weight: bold;');
    debug('Initializing');

    // Register module settings
    registerSettings();
});

Hooks.once('ready', function() {
    // Check if current system is supported
    if (!isSystemSupported()) {
        const supportedSystems = getSupportedSystemNames().join(', ');
        debugWarn(`System ${game.system.id} is not supported. Supported systems: ${supportedSystems}`);
        ui.notifications.warn(game.i18n.localize("dynamictokenspeed.Notifications.RequiresCompatibleSystem"));
        return;
    }
    
    debug(`Ready - ${game.system.id.toUpperCase()} system detected, registering hooks`);
    
    // Register movement speed modification hook
    movementSpeedHook();
});