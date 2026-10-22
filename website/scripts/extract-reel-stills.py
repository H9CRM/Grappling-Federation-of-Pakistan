"""Create local WebP stills from downloaded, source-linked federation reels."""
from pathlib import Path
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / 'public' / 'media' / 'social'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
videos = sorted(DIRECTORY.glob('*-reel-*.mp4'))
tiles = []
for video in videos:
    full = video.with_suffix('.webp')
    for seek in ['2', '0']:
        result = subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error',
            '-ss', seek, '-i', str(video), '-frames:v', '1',
            '-vf', 'scale=640:-2', '-y', str(full)], capture_output=True)
        if result.returncode == 0 and full.exists():
            break
    if not full.exists():
        print('No still:', video.name)
        continue
    small = full.with_name(full.stem + '-640.webp')
    if not small.exists():
        small.write_bytes(full.read_bytes())
    with Image.open(full) as img:
        tile = Image.new('RGB', (170, 250), 'white')
        img.thumbnail((166, 216))
        tile.paste(img, ((170-img.width)//2, 0))
        ImageDraw.Draw(tile).text((3, 219), video.stem[-20:], fill='black')
        tiles.append(tile)
columns = 6
rows = (len(tiles) + columns - 1) // columns
sheet = Image.new('RGB', (columns * 170, rows * 250), 'white')
for i, tile in enumerate(tiles):
    sheet.paste(tile, ((i % columns) * 170, (i // columns) * 250))
sheet.save(ROOT / 'scripts' / 'reel-stills-contact-sheet.jpg', quality=85)
print(len(tiles), 'stills')
