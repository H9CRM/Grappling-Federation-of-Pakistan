"""Download public reels already verified on GFP's Facebook Reels page.

Run manually when refreshing the gallery. The source URLs are retained in
the media manifest; no account credentials are stored by this script.
"""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import json
import subprocess

IDS = '''1106852751730421 1069981299123637 1755100392307391
1556103776124272 1324356802578632 1059330276658913
2188316431987014 1347680969810105 1576583219707976
1099291802212231 632915549109542 906510111303638
575240105429689 970690757765053 1047940117132550
1236862950729665 413266718533074 8837582326307925
589144433541687 519361494423372 1312016420205504
1218899902588419 926983909484517 1008161047753849
1078630860539283 1265019941331548 1207523300294772
902102148359794 527523913046165 1176761806867212'''.split()

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public' / 'media' / 'social'
DEST.mkdir(parents=True, exist_ok=True)

def get_video(video_id):
    url = f'https://www.facebook.com/reel/{video_id}/'
    output = DEST / f'facebook-reel-{video_id}.mp4'
    if not output.exists():
        result = subprocess.run(['yt-dlp', '-q', '--no-playlist', '-f', 'sd',
            '-o', str(output), url], capture_output=True, text=True)
        if result.returncode:
            return {'id': video_id, 'url': url, 'error': result.stderr[-500:]}
    info = subprocess.run(['yt-dlp', '-q', '--skip-download', '--print-json', url],
        capture_output=True, text=True)
    try:
        data = json.loads(info.stdout.splitlines()[-1])
    except (ValueError, IndexError):
        data = {}
    return {'id': video_id, 'url': url, 'title': data.get('title', ''),
            'description': data.get('description', ''), 'file': str(output),
            'bytes': output.stat().st_size if output.exists() else 0}

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(get_video, video_id): video_id for video_id in IDS}
        results = []
        for future in as_completed(futures):
            item = future.result()
            title = item.get('title', '')[:80].encode('ascii', 'replace').decode('ascii')
            print(item['id'], item.get('bytes', 0), title,
                  item.get('error', ''), flush=True)
            results.append(item)
    (ROOT / 'scripts' / 'facebook-reels-sources.json').write_text(
        json.dumps(sorted(results, key=lambda item: IDS.index(item['id'])),
                   ensure_ascii=False, indent=2), encoding='utf-8')
