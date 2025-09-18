# TOC
web crawler

ต้องรันทั้ง front-end และ back-end พร้อมกัน
เปิด CMD และทำตามวิธีด้านล่าง
---------------------------------------------------------------------------
back-end

ติดตั้งครั้งแรก วิธี RUN back-end
1. เข้าไปที่ folder ที่ clone โปรเจคลงมา
2. cd ไปที่ path server
3. ติดตั้ง venv: python -m venv myenv
4. ใส่ command เพื่อเปิด myenv: myenv\Scripts\activate  // for me => .venv\Scripts\activate
5. ติดตั้ง lib ที่ใช้ในโปรเจคลง venv: pip install -r requirements.txt
6. uvicorn main:app --reload หรือ python -m uvicorn main:app --reload

มี Project อยู่แล้ว
1. เข้าไปที่ folder ที่ clone โปรเจคลงมา
3. cd ไปที่ path server
2. ใช้คำสั่ง: myenv\Scripts\activate หรือ .venv\Scripts\activate
4. uvicorn main:app --reload หรือ python -m uvicorn main:app --reload
---------------------------------------------------------------------------
front-end

ติดตั้งครั้งแรก วิธี RUN front-end
1. เข้าไปที่ folder ที่ clone โปรเจคลงมา
2. cd ไปที่ path client
3. npm install
4. npm start

มี Project อยู่แล้ว
1. เข้าไปที่ folder ที่ clone โปรเจคลงมา
2. cd ไปที่ path client
3. npm start

*** ต้องสร้างไฟล์ .env ใน C:\Users\Path\Documents\GitHub\TOC\client ด้วย visual studio code หรือใน notepad โดยนามสกุลไฟล์ห้ามเป็น .txt เลือกได้ 2 แบบ
1. VITE_BASE_URL=https://toc-backend-78wq.onrender.com
2. VITE_BASE_URL=http://127.0.0.1:8000
3. หรือจะเอาไปทั้งคู่ เวลาจะใช้งานให้ comment สักอัน

