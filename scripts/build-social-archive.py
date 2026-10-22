"""Create a reviewed website manifest from locally saved GFP social reels."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / 'public' / 'media' / 'social'
FB = {
 '1106852751730421': 'Pakistan Defense Day Grappling Fight Night 2026',
 '1069981299123637': 'Senior Inter Club Punjab Grappling Championship 2026',
 '1755100392307391': 'Inter Club Punjab No-Gi Championship 2026',
 '1556103776124272': 'Amaar OBI vs Yashin Khan — No-Gi match',
 '1324356802578632': 'Ebad Nasir vs Abdul Rehman — match clip one',
 '1059330276658913': 'Ebad Nasir vs Abdul Rehman — match clip two',
 '2188316431987014': 'Summer Fights Challenge 2026 results',
 '1347680969810105': 'IFT MMA and Grappling Pass — venue view',
 '1576583219707976': 'IFT MMA and Grappling Pass — highlights',
 '1099291802212231': '3rd Grapple Mania 2025 — match reel',
 '632915549109542': 'Grappling and BJJ community message',
 '575240105429689': 'National Grappling Championship 2025',
 '970690757765053': 'Nankana grappling camp news',
 '1047940117132550': 'Bano Butt — athlete recognition clip one',
 '1236862950729665': 'Bano Butt — athlete recognition clip two',
 '413266718533074': 'Bano Butt — athlete recognition clip three',
 '8837582326307925': 'Women’s empowerment seminar',
 '589144433541687': 'Gujrat open mat grappling camp 2025',
 '1312016420205504': 'Women’s self-defence community message',
 '1218899902588419': 'Third one-day open mat training camp — clip one',
 '926983909484517': 'Third one-day open mat training camp — clip two',
 '1078630860539283': 'Open mat grappling camp 2024 — clip one',
 '1207523300294772': 'Open mat grappling camp 2024 — clip two',
 '1176761806867212': 'Independence Day grappling championship 2024',
}
IG = {
 'DeHtrw0s8Ht': ('Pakistan Defense Day Grappling Fight Night — mat action', 'grappling_fedration__pakistan'),
 'DeEGo3Vx6Sv': ('Pakistan Defense Day Grappling Fight Night — results', 'grappling_fedration__pakistan'),
 'DddSbBZsRIp': ('Pakistan Defense Day Grappling Fight Night — announcement', 'grappling_fedration__pakistan'),
 'DcYDb6QOjFG': ('Senior Inter Club Punjab Championship — recap', 'rowdy_kakar'),
 'DbJTU9mOAd0': ('Inter Club Punjab No-Gi Championship — recap', 'rowdy_kakar'),
 'DceT41Fux9b': ('Pakistan Defense Day Grappling Fight Night — original announcement', 'rowdy_kakar'),
}
entries = []
for platform, collection in [('facebook', FB), ('instagram', IG)]:
    for id, detail in collection.items():
        title, account = (detail, None) if platform == 'facebook' else detail
        stem = f'{platform}-reel-{id}'
        video = DIR / f'{stem}.mp4'
        still = DIR / f'{stem}.webp'
        if not video.exists() or not still.exists():
            raise RuntimeError(f'Missing media: {stem}')
        with Image.open(still) as image:
            width, height = image.size
        url = (f'https://www.facebook.com/reel/{id}/' if platform == 'facebook'
               else f'https://www.instagram.com/{account}/reel/{id}/')
        entries.append({
            'id': stem, 'title': title, 'sourceUrl': url,
            'platform': platform, 'src': f'/media/social/{stem}.mp4',
            'poster': f'/media/social/{stem}.webp',
            'width': width, 'height': height,
            'caption': f'Still from {title}. Source: {platform.title()} original post.',
            'alt': f'Video still from {title} on the federation’s social channels.',
        })
out = ROOT / 'src' / 'content' / 'socialArchive.json'
out.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding='utf-8')
print(len(entries), 'reviewed videos and stills written to', out)
