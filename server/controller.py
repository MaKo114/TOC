import re
import csv
import requests

_cache = {}  # dict เอาไว้ cache

def get_europe_team_info(base_url='https://www.vlr.gg'):
    if "teams" in _cache:  # ถ้ามี cache แล้ว ใช้เลย
        return _cache["teams"]

    html = requests.get(base_url).text
    match = re.search(r'href="(/rankings(?:/[^"]*)?)"', html, re.IGNORECASE)
    if not match:
        raise ValueError("ไม่พบ path ของหน้า rankings")
    rankings_url = base_url + match.group(1)

    html_main = requests.get(rankings_url).text
    league_pattern = r'<a href="(/rankings/[a-z\-]+)"'
    league_paths = list(set(re.findall(league_pattern, html_main, re.IGNORECASE)))
    europe_leagues = [path for path in league_paths if any(k in path.lower() for k in ['europe', 'emea', 'eu'])]
  
    team_pattern = r'<a href="(/team/\d+/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<div[^>]*class="ge-text">([\s\S]*?)</div>'
    team_data = []

    for path in europe_leagues:
        url = base_url + path
        html = requests.get(url).text
        teams = re.findall(team_pattern, html, re.DOTALL | re.IGNORECASE)
        for href, logo_src, name in teams:
            clean_name = re.sub(r'<[^>]+>', '', name)
            clean_name = re.sub(r'\s+', ' ', clean_name).strip()

            # ลบ hash tag เช่น #B1M6
            clean_name = re.sub(r'#\w+', '', clean_name)

            # ลบชื่อประเทศที่อาจติดมา
            clean_name = re.sub(r'\b[A-Z][a-z]+(?: [A-Z][a-z]+)*$', '', clean_name).strip()
            if logo_src == '/img/vlr/tmp/vlr.png':
                logo_src = '//www.vlr.gg' + logo_src
            
            team_data.append({
                "name": clean_name,
                "url": base_url + href,
                "logo": 'https:' +logo_src,
                "league": path
            })

    _cache["teams"] = team_data  # เก็บใน cache
    return team_data

# def get_team_players(team):
def get_team_players(team):
    
    cache_key = f"players:{team.lower()}"
    if cache_key in _cache:
        return _cache[cache_key]
    
    data = get_europe_team_info()
    
    def classify_type(roles):
        staff_roles = {"manager", "head coach", "assistant coach", "performance coach", 'coach'}
        return "staff" if any(r.lower() in staff_roles for r in roles) else "player"
    
    for i in data:
        if team.lower() == i['name'].lower():
            html = requests.get(i['url']).text
            block_pattern = r'<div class="team-roster-item">([\s\S]*?)</a>\s*</div>'
            blocks = re.finditer(block_pattern, html, re.IGNORECASE)

            roster = []
            for match in blocks:
                block = match.group(1)

                alias_match = re.search(r'team-roster-item-name-alias">([\s\S]*?)</div>', block)
                realname_match = re.search(r'team-roster-item-name-real">([\s\S]*?)</div>', block)
                role_matches = re.findall(r'team-roster-item-name-role">([\s\S]*?)</div>', block)
                img_match = re.search(r'<img src="(//[^"]+)"', block)
                flag_match = re.search(r'<i class="flag mod-([a-z]+)"', block)
                href_match = re.search(r'<a href="(/player/\d+/[^"]+)"', block)

                alias = re.sub(r'<[^>]+>', '', alias_match.group(1)).strip() if alias_match else None
                real_name = re.sub(r'<[^>]+>', '', realname_match.group(1)).strip() if realname_match else None
                roles = [re.sub(r'<[^>]+>', '', r).strip() for r in role_matches]
                image = "https:" + img_match.group(1) if img_match else 'https://vlr.gg/img/base/ph/sil.png'
                flag = flag_match.group(1).upper() if flag_match else None
                path = href_match.group(1) if href_match else None
                type_ = classify_type(roles)

                roster.append({
                    "alias": alias,
                    "real_name": real_name,
                    "roles": roles,
                    "type": type_,
                    "image": image,
                    "flag": flag,
                    "path": path
                })
            _cache[cache_key] = roster
            return roster




def player_detail(team, name):
    cache_key = f"detail:{team.lower()}:{name.lower()}"
    if cache_key in _cache:
        return _cache[cache_key]

    base_url = 'https://www.vlr.gg'
    members = get_team_players(team)
    if members:
        for data in members:
            if name.lower() == data['alias'].lower():
                link = base_url + data['path']
                html = requests.get(link)
                header_block = re.search(r'<div class="player-header">([\s\S]*?)</div>', html.text)
                if not header_block:
                    return 'ไม่พบ player-header'

                alias_match = re.search(r'<h1[^>]*class="[^"]*wf-title[^"]*"[^>]*>([\s\S]*?)</h1>', html.text)
                alias = alias_match.group(1).strip() if alias_match else None

                real_match = re.search(r'<h2[^>]*class="player-real-name ge-text-light"[^>]*>(.*?)</h2>', html.text)
                real_name = real_match.group(1).strip() if real_match else None

                social_links = re.findall(r'<a[^>]+href="(https?://[^"]+)"', html.text)
                exclude_domains = [
                    'twitter.com/vlrdotgg',
                    'discord.com/invite/VLR'
                ]
                filtered_social = [
                    url for url in social_links
                    if not any(ex in url for ex in exclude_domains)
                ]

                country_match = re.search(
                    r'<div[^>]*class="ge-text-light"[^>]*>[\s\S]*?<i[^>]*class="flag[^"]*"[^>]*></i>\s*([\w\s\-]+)</div>',
                    html.text)
                country_name = country_match.group(1).strip() if country_match else None

                code_match = re.search(r'<i[^>]*class="flag mod-([a-z]{2})"', html.text)
                country_code = code_match.group(1).upper() if code_match else None

                img_match = re.search(
                    r'<div[^>]*class="wf-avatar mod-player"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"', html.text)
                img_url = 'https:' + img_match.group(1) if img_match else None

                result =  {
                    "alias": alias,
                    "real_name": real_name,
                    "image": img_url,
                    "social": filtered_social,
                    "country": {
                        "name": country_name,
                        "code": country_code
                    },
                    "href": link 
                }
                _cache[cache_key] = result
                return result

    return 'not found'


def extract_match_cards(team, name, limit=5):
    cache_key = f"match_cards:{team.lower()}:{name.lower()}"
    if cache_key in _cache:
        return _cache[cache_key]

    player = player_detail(team, name)
    html = requests.get(player['href'])
    html_text = html.text.replace("&sdot;", "⋅")

    cards = re.findall(r'<a href="(/[^"]+)"[^>]*class="[^"]*wf-card[^"]*"[^>]*>([\s\S]*?)</a>', html_text)

    def extract_event_stage(block):
        pattern = re.compile(
            r'<div class="m-item-event[^>]*>[\s\S]*?<div[^>]*class="text-of"[^>]*>\s*(.*?)\s*</div>\s*([\w\s]+)\s*[⋅]\s*(\w+)',
            re.DOTALL
        )
        match = pattern.search(block)
        if match:
            return match.group(1).strip(), f"{match.group(2).strip()} ⋅ {match.group(3).strip()}"
        return None, None

    def extract_logos(block):
        logo_urls = re.findall(r'<div[^>]*class="m-item-logo(?: mod-right)?[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"', block)
        thumb_logo = re.search( r'<div[^>]*class="m-item-thumb[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"', block)

        def clean_logo(src):
            if not src:
                return "https://www.vlr.gg/img/vlr/tmp/vlr.png"
            if "vlr/tmp/vlr.png" in src:
                return "https://www.vlr.gg/img/vlr/tmp/vlr.png"
            return "https:" + src if src.startswith("//") else "https://www.vlr.gg" + src

        team_1_logo = clean_logo(logo_urls[0]) if len(logo_urls) > 0 else (
            clean_logo(thumb_logo.group(1)) if thumb_logo else "https://www.vlr.gg/img/vlr/tmp/vlr.png"
        )
        team_2_logo = clean_logo(logo_urls[1]) if len(logo_urls) > 1 else "https://www.vlr.gg/img/vlr/tmp/vlr.png"

        return team_1_logo, team_2_logo

    results = []

    for url, block in cards[:limit]:
        event_name, stage_name = extract_event_stage(block)

        team_names = re.findall(r'<span[^>]*class="m-item-team-name"[^>]*>\s*(.*?)\s*</span>', block)
        team_1 = team_names[0].strip() if len(team_names) > 0 else None
        team_2 = team_names[1].strip() if len(team_names) > 1 else None

        score = re.search(
            r'<div class="m-item-result[^>]*">[\s\S]*?<span>(\d+)</span>[\s\S]*?<span>(\d+)</span>', block
        )

        team_1_logo, team_2_logo = extract_logos(block)

        date = re.search(
            r'<div class="m-item-date">[\s\S]*?<div>\s*(.*?)\s*</div>\s*(.*?)\s*</div>', block
        )

        results.append({
            "match_url": "https://www.vlr.gg" + url,
            "event": event_name,
            "stage": stage_name,
            "team_1": team_1,
            "team_2": team_2,
            "score": f"{score.group(1)} : {score.group(2)}" if score else None,
            "team_1_logo": team_1_logo,
            "team_2_logo": team_2_logo,
            "date": date.group(1).strip() if date else None,
            "time": date.group(2).strip() if date else None
        })

    _cache[cache_key] = results
    return results

 
 
def extract_all_team_info(team, name):
    cache_key = f"team_history:{team.lower()}:{name.lower()}"
    if cache_key in _cache:
        return _cache[cache_key]
    player = player_detail(team, name)
    html = requests.get(player['href']).text
    base_url = 'https://www.vlr.gg'

    team_block_pattern = re.compile(
    r'<a[^>]*href="(?P<href>/team/\d+/[^"]+)"[^>]*>[\s\S]*?'
    r'<img[^>]+src="(?P<img>[^"]+)"[^>]*>[\s\S]*?'
    r'<div[^>]*font-weight[^>]*>\s*(?P<name>.*?)\s*</div>'
    r'(?:[\s\S]*?<div[^>]*class="ge-text-light"[^>]*>\s*(?P<status>.*?)\s*</div>)?',
    re.IGNORECASE
)

    def normalize_logo_src(src):
        src = src.strip()
        if src.startswith('//'):
            return 'https:' + src
        elif src.startswith('/'):
            return base_url + src
        elif src.startswith('http'):
            return src
        else:
            return base_url + '/' + src

    current_team = None
    past_teams = []

    for m in team_block_pattern.finditer(html):
        name = m.group("name").strip()
        href = base_url + m.group("href")
        logo = normalize_logo_src(m.group("img"))
        status = m.group("status").strip() if m.group("status") else ""

        if status.lower().startswith("joined in"):
            current_team = {
                "name": name,
                "joined": status.replace("joined in", "").strip(),
                "logo": logo,
                "href": href
            }
        elif status.lower().startswith("left in"):
            past_teams.append({
                "name": name,
                "left": status.replace("left in", "").strip(),
                "logo": logo,
                "href": href
            })
        elif not status and current_team is None:
            # fallback: assume current team if no status and no current team yet
            current_team = {
                "name": name,
                "joined": None,
                "logo": logo,
                "href": href
            }

    result = {
        "current_team": current_team,
        "past_teams": past_teams
    }
    _cache[cache_key] = result
    return result
    
        
def export_team_names_to_csv(filename="team_names.csv"):
    team_names = get_europe_team_info()
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Team Name"])
        for name in team_names:
            writer.writerow([name])
    print(f"บันทึกชื่อทีมทั้งหมดลงไฟล์ {filename} แล้ว")



a = extract_all_team_info('team fanta', 'phipsy')
# a = extract_match_cards('fnatic', 'boaster')

# for i in a :
#     print(a[i])