# Generated art provenance and prompts

Generated using the built-in image generation tool for this repository. Original outputs were copied into this directory; optimized WebP versions and a normalized sprite atlas are used at runtime. No external paid service or runtime image generation is required.

## Mountain

Production videogame environment bitmap, portrait aspect ratio 1:3. High-quality handcrafted 32-bit pixel art, crisp deliberate pixel clusters, rich atmospheric anime JRPG landscape, no blur. A single continuous huge mountain climbing map viewed from side-front, filling the full portrait canvas. TOP is summit above a golden sea of clouds with small ancient vermilion torii gateway on a broad stone summit terrace at x50% y8%. Below: snowy alpine cliffs with pines, cold turquoise shadows at y20–35%; thick drifting clouds revealing waterfall gorges at y35–55%; rocky mossy cliffs with rope handrails and waterfalls y55–75%; bottom y75–100 lush warm cedar forest, ferns, weathered stone steps, distant layered blue mountains. One walkable narrow stone switchback staircase connects the entire image: starts x48% y94%, bends x65% y77%, x38% y60%, x61% y44%, x45% y27%, ends x50% y8%. Steps and supporting rocky ledges along the entire route, no gaps. Beautiful intentional compositions at every vertical segment. Distant scenery and clouds towards side edges, no large empty areas. Restrained warm amber sunlight from upper left, cool blue rock shadows, sage green foliage, rose-gold clouds, white snow. No characters, lettering, UI, borders. Dense detailed game pixel art rather than vector/basic polygons.

## Adventurer

Production pixel-art sprite sheet with transparent background. One row of six equally spaced cells. Same original anime mountain adventurer: dark tousled navy hair, warm tan face, teal mountain tunic, ivory shirt, vermilion scarf, brown belt, leather hiking boots and ochre backpack. Consistent three-head-tall proportions, crisp 32-bit pixel art, no blur. Facing three-quarter right. Frames: neutral standing, right knee step, left knee ascent, jumping crouch, upward leap with streaming scarf, planted landing. Six complete figures, no scenery, floor, lettering, grid lines or exterior shadows. Restrained JRPG pixel shading.

The generated sheet was separated into six alpha-bounded cells, scaled with nearest-neighbor sampling, and centered on equal 128×160 canvases with planted-foot baselines. Runtime display is smaller than source, with pixelated sampling.

## Foreground clouds

Transparent foreground layer, landscape 3:1. Two wide delicate mist/cloud banks, crisp clustered JRPG pixels, warm ivory tops and desaturated lavender-blue shadows. Wispy broken ends with genuine alpha gaps. Clouds occupy bottom third and sides with transparent center for the character. No mountain, sky rectangle, character, words, neon or blur.

## Limitations

The background is a single continuous painting with foreground cloud/snow layers, not a fully separated tile set. Waterfalls and vegetation are painted details; they do not each have bespoke animation frames. Six generated character poses are normalized but retain small hand-drawn proportion variations.

## Sprite atlas repair

The previous packed atlas accidentally composited all poses at the same x position, leaving cells 1–5 empty. The runtime's frame offsets were correct; the bitmap was not. `../tools/build-atlas.py` now explicitly offsets each pose by `frame * 128`, removes near-transparent source speckles, uses a shared scale, and bottom-aligns feet. `--check` compares the shipped bitmap against all six independently rebuilt cells. No replacement character art was needed.
