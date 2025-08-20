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
    links_list = []
    if members :
        for data in members:
            if name == data[1]:
                link = base_url + data[0] # data[0] คือ path ของ player คนนั้น เช่น /player/438/boaster
                links_list.append(link)
                
                
        return links_list
    return 'not found'
  
# print(get_team_players('fnatic'))
print(player_detail('fnatic', 'Boaster'))













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

