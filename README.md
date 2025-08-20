# Von Junzt's Dynamic Token Speed (VJ DTS)

Dynamic token movement animation speed based on actor movement values for Foundry VTT v13.

## Features

- **Multi-System Support**: Works with both SWADE v5.0.0+ and D&D 5e v5.0.0+ systems
- **Dynamic Movement Speed**: Token movement animations automatically adjust based on the actor's movement values
- **Movement Type Support**: Automatically detects and uses appropriate speed for walk, fly, swim, burrow, climb, and crawl movements
- **Instant Teleportation**: Blink and teleport movements are instant with no animation
- **Fully Configurable**: Customize speed multipliers and base animation speed to match your table's preferences
- **System Integration**: Automatically uses the correct speed based on selected movement type
- **Debug Mode**: Built-in debugging tools for troubleshooting

## Requirements

### Core Requirements
- **Foundry VTT**: Version 13 ONLY (uses v13's native animation.movementSpeed API)
  - Not compatible with Foundry v12 or earlier
  - Not tested with Foundry v14+

### Supported Game Systems (one required)
- **SWADE**: Version 5.x
- **D&D 5e**: Version 5.x

### Dependencies
- None

## Configuration

Access module settings through the game settings menu.

### Settings

- **Enable Dynamic Speed Animation**: Toggle the module on/off
- **Speed Multiplier**: Multiplier for movement speed (default: 1.2)
  - Higher values = faster animation
  - Range: 0.1 to 10
- **Base Animation Speed**: Base spaces per second for normal movement (default: 6)
  - Higher values make all animations faster
  - Range: 1 to 20
- **Debug Mode**: Enable console logging for troubleshooting

## How It Works

The module calculates token movement animation speed based on your game system:

### SWADE
```
Animation Speed (spaces/sec) = (Pace / 6) × Base Animation Speed × Speed Multiplier
```
Examples (with defaults: Base = 6, Multiplier = 1.2):
- Token with Pace 6": `(6/6) × 6 × 1.2 = 7.2 spaces/second`
- Token with Pace 12": `(12/6) × 6 × 1.2 = 14.4 spaces/second`

### D&D 5e
```
Animation Speed (spaces/sec) = (Movement / 30) × Base Animation Speed × Speed Multiplier
```
Examples (with defaults: Base = 6, Multiplier = 1.2):
- Token with 30ft movement: `(30/30) × 6 × 1.2 = 7.2 spaces/second`
- Token with 60ft movement: `(60/30) × 6 × 1.2 = 14.4 spaces/second`

### Movement Types

The module automatically detects the selected movement type (using Foundry v13's Token HUD) and uses the appropriate pace. If a specific movement pace isn't available, the module falls back to ground pace.

## Technical Details

### Architecture
- Modular hook-based system
- Uses Foundry v13's native `animation.movementSpeed` API

## Compatibility
- **Foundry VTT**: v13 ONLY - Built specifically for v13's animation system
- **Game Systems**: 
  - SWADE v5.0.0+ (v13 exclusive)
  - D&D 5e v5.0.0+ (v13 exclusive)
- Works alongside other system modules
- Does not interfere with measurement or game mechanics

## Support

For issues, questions, or suggestions:
- GitHub: [https://github.com/Von-Junzt/dynamictokenspeed](https://github.com/Von-Junzt/dynamictokenspeed)
- Discord: von_junzt

## License

MIT License - See LICENSE file for details

## Credits

Created by Von Junzt
Part of the Von Junzt's module collection for Foundry VTT.



