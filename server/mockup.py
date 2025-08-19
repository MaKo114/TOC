import re
import requests

def get_europe_team_info(base_url='https://www.vlr.gg'):
    # ดึงหน้าแรก
    html = requests.get(base_url).text

    # หา path ของหน้า rankings
    match = re.search(r'href="(/rankings(?:/[^"]*)?)"', html, re.IGNORECASE)
    if not match:
        raise ValueError("ไม่พบ path ของหน้า rankings")
    rankings_url = base_url + match.group(1)

    # ดึงหน้า rankings หลัก
    html_main = requests.get(rankings_url).text

    # หา path ของลีคทั้งหมด
    league_pattern = r'<a href="(/rankings/[a-z\-]+)"'
    league_paths = list(set(re.findall(league_pattern, html_main, re.IGNORECASE)))

    # กรองเฉพาะลีคที่เกี่ยวกับยุโรป
    # europe_leagues = [path for path in league_paths if path == '/rankings/europe']
    europe_leagues = [path for path in league_paths if any(k in path.lower() for k in ['europe', 'emea', 'eu'])]

    # pattern สำหรับชื่อทีม, ลิงก์ และโลโก้
    # team_pattern = r'<a href="(/team/\d+/[^"]+)"[^>]*>.*?<img[^>]+src="([^"]+)"[^>]*>.*?<div[^>]*class="ge-text">([^<]+)</div>'
    team_pattern = r'<a href="(/team/\d+/[^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<div[^>]*class="ge-text">([\s\S]*?)</div>'

    team_data = []
    for path in europe_leagues:
        url = base_url + path
        html = requests.get(url).text
        teams = re.findall(team_pattern, html, re.DOTALL | re.IGNORECASE)
        print(f"✅ Found {len(teams)} teams in {path}")
        


        for href, logo_src, name in teams:
            clean_name = re.sub(r'<[^>]+>', '', name)
            clean_name = re.sub(r'\s+', ' ', clean_name).strip()
            clean_name = re.sub(r'\s+#\w+\s+[A-Za-z]+$', '', clean_name)
            

            team_data.append({
                "name": clean_name,
                "url": base_url + href,
                "logo": base_url + logo_src,
                "league": path
            })

    return team_data



def get_team_players(team):
    data = get_europe_team_info()
    for i in data:
        if i['name'].lower() == team.lower():
            html = requests.get(i['url']).text

            # จับ div ที่มี class team-roster-item-name-alias แล้วดึง text หลัง <i>
            pattern = r'<div class="team-roster-item-name-alias">\s*<i[^>]*></i>\s*([^<]+)</div>'
            players = re.findall(pattern, html, re.IGNORECASE)

            return [p.strip() for p in players]


# players = get_team_players('fnatic')
# print(players)

# teams = get_europe_team_info()
# for team in teams:
#     print(team)

    

# import re
# import requests


# base_url = 'https://www.vlr.gg'

# html = requests.get(base_url)

# pattent = re.search(r'href="(/rankings(?:/[^"]*)?)"', html.text, re.IGNORECASE)
# link_level2 = base_url + pattent.group(1)


# html_lv2 = requests.get(link_level2)


# pt = r'<a href="/team/\d+/[a-z0-9\-]+" class="">'
# match = re.findall(pt, html_lv2.text, re.IGNORECASE)


# v= 1
# for i in match:

#     print(v, i)
#     v+=1
    
    
    
