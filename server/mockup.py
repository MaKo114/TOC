import requests
import re

base_url = "https://liquipedia.net"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

def all_data():
    try:
        # --- ระดับ 1 ---
        print("[ระดับ 1] เข้าหน้า Liquipedia")
        r1 = requests.get(base_url, headers=headers)
        r1.raise_for_status()

        valorant_link = re.search(r'href="(/valorant(?:/[^"]*)?)"', r1.text, re.IGNORECASE)
        if not valorant_link:
            raise Exception("ไม่พบลิงก์ /valorant")

        valorant_url = base_url + valorant_link.group(1)
        print("เช็คลิงก์ VALORANT:", valorant_url)
        

        # --- ระดับ 2 ---
        print("[ระดับ 2] เข้าหน้า VALORANT")
        r2 = requests.get(valorant_url, headers=headers)
        r2.raise_for_status()

        portal_teams_link = re.search(r'href="(/valorant/Portal:Teams)"', r2.text, re.IGNORECASE)
        if not portal_teams_link:
            raise Exception("ไม่พบลิงก์ Portal:Teams")

        portal_teams_url = base_url + portal_teams_link.group(1)
        print("เช็คลิงก์ Portal:Teams:", portal_teams_url)

        # --- ระดับ 3 ---
        print("[ระดับ 3] เข้าหน้า Portal:Teams")
        r3 = requests.get(portal_teams_url, headers=headers)
        r3.raise_for_status()

        team_pattern = r'<a href="(/valorant/[^"]+)" title="([^"]+)">'
        teams = re.findall(team_pattern, r3.text)

        # กรอง Portal, Category และลบซ้ำ
        seen = set()
        unique_teams = []
        for link, name in teams:
            if not any(x in link for x in ["Portal", "Category"]):
                if (link, name) not in seen:
                    seen.add((link, name))
                    unique_teams.append((link, name))

        print(f"\n[ผลลัพธ์] พบทีม {len(unique_teams)} ทีม (ไม่มีซ้ำ):")
        all_items = []
        for link, name in unique_teams[:200]:  # แสดง 20 ทีมแรก
            # print(f"  - {name} ({base_url}{link})")
            all_items.append({name:base_url+link})
        return all_items

    except Exception as e:
        print("เกิดข้อผิดพลาด:", e)
        
        
def get_data_by_name(name):
    team = all_data()
    for k in team:
        if list(k.keys())[0] == name :
            return list(k.values())[0]
            
    
    

# print(get_data_by_name('Fnatic'))