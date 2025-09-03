# TOC
web crawler

ต้องรันทั้ง front-end และ back-end พร้อมกัน
เปิด CMD และทำตามวิธีด้านล่าง
---------------------------------------------------------------------------
back-end

ติดตั้งครั้งแรก วิธี RUN back-end
1. เข้า C:\Users\Path\Documents\GitHub\TOC
2. python -m venv myenv
3. myenv\Scripts\activate  // for me => .venv\Scripts\activate.bat
4. เข้า C:\Users\Path\Documents\GitHub\TOC\server
5. pip install fastapi uvicorn
6. uvicorn main:app --reload หรือ python -m uvicorn main:app --reload

มี Project อยู่แล้ว
1. เข้า C:\Users\Path\Documents\GitHub\TOC
2. myenv\Scripts\activate
3. เข้า C:\Users\Path\Documents\GitHub\TOC\server
4. uvicorn main:app --reload หรือ python -m uvicorn main:app --reload
---------------------------------------------------------------------------
front-end

ติดตั้งครั้งแรก วิธี RUN front-end
1. เข้า C:\Users\Path\Documents\GitHub\TOC\client
2. npm install
3. C:\Users\Path\Documents\GitHub\Theory-Of-Computation\client
4. npm start

มี Project อยู่แล้ว
1. เข้า C:\Users\Path\Documents\GitHub\TOC\client
2. C:\Users\Path\Documents\GitHub\TOC\client
3. npm start

*** ต้องสร้างไฟล์ .env ใน C:\Users\Path\Documents\GitHub\TOC\client ด้วย
VITE_BASE_URL=https://toc-backend-78wq.onrender.com
# VITE_BASE_URL=http://127.0.0.1:8000
toc-backend-78wq.onrender.com
