"""Check actual staged HTML/CSS/JS references, fragments and bundle completeness."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
import re,sys,hashlib

root=Path(sys.argv[1] if len(sys.argv)>1 else '_site').resolve()
source=Path(__file__).resolve().parents[1]
errors=[];refs=[];ids={}
class Page(HTMLParser):
    def __init__(self,path):
        super().__init__();self.path=path;self.ids=set();self.main=0;self.skip=False;self.policy=False;self.csp=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids: errors.append(f'{self.path}: duplicate id {a["id"]}')
            self.ids.add(a['id'])
        if tag=='main':self.main+=1
        if a.get('href')=='#main-content':self.skip=True
        if a.get('name')=='referrer' and a.get('content')=='no-referrer':self.policy=True
        if a.get('http-equiv','').lower()=='content-security-policy':self.csp=True
        for key in ['src','href','poster','data-video']:
            if key in a: refs.append((self.path,a[key]))
        if a.get('http-equiv','').lower()=='refresh':
            match=re.search(r'url=(.+)',a.get('content',''),re.I)
            if match:refs.append((self.path,match[1]))
        if a.get('property') in ['og:image','og:url'] or a.get('name')=='twitter:image':refs.append((self.path,a['content']))

for p in root.rglob('*'):
    if not p.is_file():continue
    rel=p.relative_to(root).as_posix()
    if rel.startswith(('assets/tmp/','docs/','dev/','Tools/','scripts/')) or p.suffix in ['.md','.psd','.afdesign','.afphoto']:
        errors.append(f'Excluded content staged: {rel}')
    if p.suffix=='.html':
        page=Page(rel);page.feed(p.read_text(encoding='utf-8'));ids[rel]=page.ids
        if not rel.startswith(('partials/','play/','beta/')):
            if page.main!=1 or not page.skip or not page.policy or not page.csp:errors.append(f'{rel}: missing main/skip/privacy policy')
    elif p.suffix=='.css':
        for u in re.findall(r'url\([\'\"]?([^\)\'\"]+)',p.read_text(encoding="utf-8")):refs.append((rel,u))
    elif p.suffix=='.js' and not rel.startswith('play/'):
        for u in re.findall(r'[\'\"]([^\'\"]+\.(?:png|webp|svg|mp4|woff2?|css|html))[\'\"]',p.read_text(encoding="utf-8")):refs.append((rel,u))
for base,url in refs:
    target=urlsplit(urljoin('https://ninjapiraterobotalien.com/'+base,url))
    if target.scheme not in ['http','https'] or target.netloc!='ninjapiraterobotalien.com':continue
    name=unquote(target.path).lstrip('/')
    if not name or name.endswith('/'):name+='index.html'
    if not (root/name).is_file():errors.append(f'{base}: missing {url} -> {name}')
    elif target.fragment and target.fragment not in ids.get(name,set()):errors.append(f'{base}: missing fragment {url}')
# Generated filenames are assembled at runtime; byte-compare the entire existing export.
for p in (source/'play/sackjack/build').iterdir():
    if p.is_file():
        q=root/p.relative_to(source)
        if not q.is_file() or hashlib.sha256(p.read_bytes()).digest()!=hashlib.sha256(q.read_bytes()).digest():errors.append(f'Generated bundle changed/missing: {q.name}')
print(f'Checked {len(refs)} references, {len(ids)} HTML files, generated bundle hashes and publication exclusions.')
if errors:print('\n'.join(errors));sys.exit(1)
print('PASS')
