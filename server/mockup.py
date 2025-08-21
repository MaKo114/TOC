import re
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
            clean_name = re.sub(r'\s+#\w+\s+[A-Za-z]+$', '', clean_name)
            team_data.append({
                "name": clean_name,
                "url": base_url + href,
                "logo": 'https:' +logo_src,
                "league": path
            })

    _cache["teams"] = team_data  # เก็บใน cache
    return team_data

def get_team_players(team):
    if ("players", team.lower()) in _cache:
        return _cache[("players", team.lower())]

    data = get_europe_team_info()
    for i in data:
        if i['name'].lower() == team.lower():
            html = requests.get(i['url']).text

            # ตรวจสอบว่ามี block หรือไม่
            if 'team-roster-item' not in html:
                print("HTML ไม่มี block ที่ต้องการ")
                return []

            # ใช้ finditer เพื่อ match ทีละ block
            block_pattern = r'<div class="team-roster-item">([\s\S]*?)</a>\s*</div>'
            blocks = re.finditer(block_pattern, html, re.IGNORECASE)

            players = []
            for match in blocks:
                block = match.group(1)

                href_match = re.search(r'href="(/player/\d+/[^"]+)"', block)
                alias_match = re.search(r'team-roster-item-name-alias">([\s\S]*?)</div>', block)

                if href_match and alias_match:
                    href = href_match.group(1)
                    alias_raw = alias_match.group(1)
                    alias_clean = re.sub(r'<[^>]+>', '', alias_raw).strip()
                    players.append((href, alias_clean))
                else:
                    print("Block ไม่ครบ:", block[:100])

            _cache[("players", team.lower())] = players
            return players

def player_detail(team, name):
    base_url = 'https://www.vlr.gg'
    members = get_team_players(team)
    if members:
        for data in members:
            if name == data[1]:
                link = base_url + data[0]
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

                country_match = re.search(r'<div[^>]*class="ge-text-light"[^>]*>[\s\S]*?<i[^>]*class="flag[^"]*"[^>]*></i>\s*([\w\s\-]+)</div>',html.text)
                country_name = country_match.group(1).strip() if country_match else None
                
                code_match = re.search(r'<i[^>]*class="flag mod-([a-z]{2})"', html.text)
                country_code = code_match.group(1).upper() if code_match else None

                
                img_match = re.search(r'<div[^>]*class="wf-avatar mod-player"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"', html.text)
                img_url = 'https:' + img_match.group(1) if img_match else None

                return {
                            "alias": alias,
                            "real_name": real_name,
                            "image": img_url,
                            "social": filtered_social,
                            "country": {'name': country_name,'code': country_code
                            }
                        }

    return 'not found'

def extract_match_cards(link, limit=5):
    html = requests.get(link)
    cards = re.findall(r'<a href="(/[^"]+)"[^>]*class="wf-card[^"]*">([\s\S]*?)</a>', html.text)
    results = []

    for url, block in cards[:limit]:
        event = re.search(r'<div[^>]*font-weight:\s*700[^>]*class="text-of">\s*(.*?)\s*</div>', block)
        match = re.search(r'Group Stage\s*(?:⋅|&sdot;)\s*(W\d+)', block, re.DOTALL)

        team_names = re.findall(r'<span[^>]*class="m-item-team-name"[^>]*>\s*(.*?)\s*</span>', block)
        team_1 = team_names[0].strip() if len(team_names) > 0 else None
        team_2 = team_names[1].strip() if len(team_names) > 1 else None
        score = re.search(r'<div class="m-item-result[^>]*">[\s\S]*?<span>(\d+)</span>[\s\S]*?<span>(\d+)</span>', block)
        logo_1 = re.search(r'<div class="m-item-logo">[\s\S]*?<img src="(//[^"]+)"', block)
        logo_2 = re.search(r'<div class="m-item-logo mod-right">[\s\S]*?<img src="(//[^"]+)"', block)
        date = re.search(r'<div class="m-item-date">[\s\S]*?<div>\s*(.*?)\s*</div>\s*(.*?)\s*</div>', block)

        results.append({
            "match_url": "https://www.vlr.gg" + url,
            "event": event.group(1).strip() if event else None,
            "stage": match.group(1) if match else None,
            "team_1": team_1,
            "team_2": team_2,
            "score": f"{score.group(1)} : {score.group(2)}" if score else None,
            "team_1_logo": "https:" + logo_1.group(1) if logo_1 else None,
            "team_2_logo": "https:" + logo_2.group(1) if logo_2 else None,
            "date": date.group(1).strip() if date else None,
            "time": date.group(2).strip() if date else None
        })

    return results

# def extract_match_cards(link, limit=5):
#     html = requests.get(link)
#     cards = re.findall(r'<a href="(/[^"]+)"[^>]*class="wf-card[^"]*">([\s\S]*?)</a>', html.text)
#     results = []
#     for url, block in cards[:limit]:
#         event = re.search(r'<div[^>]*font-weight:\s*700[^>]*class="text-of">\s*(.*?)\s*</div>', block)
#         match = re.search(r'Group Stage\s*(?:⋅|&sdot;)\s*(W\d+)', block, re.DOTALL)

#         team_names = re.findall(r'<span[^>]*class="m-item-team-name"[^>]*>\s*(.*?)\s*</span>', block)
#         team_1 = team_names[0].strip() if len(team_names) > 0 else None
#         team_2 = team_names[1].strip() if len(team_names) > 1 else None
#         score = re.search(r'<div class="m-item-result[^>]*">[\s\S]*?<span>(\d+)</span>[\s\S]*?<span>(\d+)</span>', block)
#         logo_1 = re.search(r'<div class="m-item-logo">[\s\S]*?<img src="(//[^"]+)"', block)
#         logo_2 = re.search(r'<div class="m-item-logo mod-right">[\s\S]*?<img src="(//[^"]+)"', block)
#         date = re.search(r'<div class="m-item-date">[\s\S]*?<div>\s*(.*?)\s*</div>\s*(.*?)\s*</div>', block)

#     results.append({
#         "match_url": "https://www.vlr.gg" + url,
#         "event": event.group(1).strip() if event else None,
#         "stage": match.group(1) if match else None,
#         "team_1": team_1,
#         "team_2": team_2,
#         "score": f"{score.group(1)} : {score.group(2)}" if score else None,
#         "team_1_logo": "https:" + logo_1.group(1) if logo_1 else None,
#         "team_2_logo": "https:" + logo_2.group(1) if logo_2 else None,
#         "date": date.group(1).strip() if date else None,
#         "time": date.group(2).strip() if date else None
#     })
    
    
#     return results
  
lst = extract_match_cards('https://www.vlr.gg/player/438/boaster')

for  i in lst:
    print(i)
# print(player_detail('fnatic', 'Boaster'))



# import re
# import requests

# def get_europe_team_info(base_url='https://www.vlr.gg'):
#     # ดึงหน้าแรก
#     html = requests.get(base_url).text

#     # หา path ของหน้า rankings
#     match = re.search(r'href="(/rankings(?:/[^"]*)?)"', html, re.IGNORECASE)
#     if not match:
#         raise ValueError("ไม่พบ path ของหน้า rankings")
#     rankings_url = base_url + match.group(1)

#     # ดึงหน้า rankings หลัก
#     html_main = requests.get(rankings_url).text

#     # หา path ของลีคทั้งหมด
#     league_pattern = r'<a href="(/rankings/[a-z\-]+)"'
#     league_paths = list(set(re.findall(league_pattern, html_main, re.IGNORECASE)))

#     # กรองเฉพาะลีคที่เกี่ยวกับยุโรป
#     # europe_leagues = [path for path in league_paths if path == '/rankings/europe']
#     europe_leagues = [path for path in league_paths if any(k in path.lower() for k in ['europe', 'emea', 'eu'])]

#     # pattern สำหรับชื่อทีม, ลิงก์ และโลโก้
#     # team_pattern = r'<a href="(/team/\d+/[^"]+)"[^>]*>.*?<img[^>]+src="([^"]+)"[^>]*>.*?<div[^>]*class="ge-text">([^<]+)</div>'
#     team_pattern = r'<a href="(/team/\d+/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<div[^>]*class="ge-text">([\s\S]*?)</div>'

#     team_data = []
#     for path in europe_leagues:
#         url = base_url + path
#         html = requests.get(url).text
#         teams = re.findall(team_pattern, html, re.DOTALL | re.IGNORECASE)
#         print(f"Found {len(teams)} teams in {path}")
        


#         for href, logo_src, name in teams:
#             clean_name = re.sub(r'<[^>]+>', '', name)
#             clean_name = re.sub(r'\s+', ' ', clean_name).strip()
#             clean_name = re.sub(r'\s+#\w+\s+[A-Za-z]+$', '', clean_name)
            

#             team_data.append({
#                 "name": clean_name,
#                 "url": base_url + href,
#                 "logo": base_url + logo_src,
#                 "league": path
#             })

#     return team_data



# def get_team_players(team):
#     data = get_europe_team_info()
#     for i in data:
#         if i['name'].lower() == team.lower():
#             html = requests.get(i['url']).text

#             # จับ div ที่มี class team-roster-item-name-alias แล้วดึง text หลัง <i>
#             pattern = r'<div class="team-roster-item-name-alias">\s*<i[^>]*></i>\s*([^<]+)</div>'
#             players = re.findall(pattern, html, re.IGNORECASE)

#             return [p.strip() for p in players]
