"""Pack six source poses into explicit, independently checked atlas cells.
Run with Pillow installed: python3 power-level/tools/build-atlas.py
"""
from pathlib import Path
import sys
from PIL import Image
assets = Path(__file__).resolve().parents[1] / 'assets'
source = Image.open(assets / 'adventurer-sheet.png').convert('RGBA')
atlas = Image.new('RGBA', (768, 160))
for frame in range(6):
    cell = source.crop((frame * source.width // 6, 0, (frame + 1) * source.width // 6, source.height))
    cell.putalpha(cell.getchannel('A').point(lambda a: a if a > 128 else 0))
    bounds = cell.getchannel('A').getbbox()
    assert bounds, f'Empty source frame {frame}'
    pose = cell.crop(bounds)
    # One shared scale preserves body proportions, including crouching poses.
    scale = 146 / 468
    pose = pose.resize((round(pose.width * scale), round(pose.height * scale)), Image.Resampling.NEAREST)
    assert pose.width <= 128 and pose.height <= 160
    atlas.alpha_composite(pose, (frame * 128 + (128 - pose.width) // 2, 160 - pose.height))
for frame in range(6):
    cell = atlas.crop((frame * 128, 0, (frame + 1) * 128, 160))
    assert cell.getchannel('A').getbbox(), f'Empty output frame {frame}'
if '--check' in sys.argv:
    actual = Image.open(assets / 'adventurer-atlas.png').convert('RGBA')
    assert actual.size == atlas.size and actual.tobytes() == atlas.tobytes(), 'Atlas does not match the six independently packed poses'
    print('Six atlas frames verified: occupied, separate, and feet aligned')
else:
    atlas.save(assets / 'adventurer-atlas.png')
