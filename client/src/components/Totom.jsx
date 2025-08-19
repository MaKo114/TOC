import React, { useEffect, useState } from "react";
import axios, { all } from "axios";

const Totom = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(""); // สำหรับ input ที่พิมพ์

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("คำค้นที่พิมพ์:", query);
    // คุณสามารถใช้ query เพื่อค้นหาใน data ได้เลย
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000")
      .then((res) => {
        setData(res.data);
        console.log("this is ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="p-4 ">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl">VALORANT DATA HUB</h1>
          <p className="text-2xl mt-4">ข้อมูลครบครันจาก Liquipedia.net</p>
          <div className="border-2 border-red-400 w-full max-w-[600px] mt-10 mx-auto p-3 rounded-md ">
            <p className="text-red-400 font-bold">
              ไม่พบไฟล์ข้อมูล ใช้ข้อมูลตัวอย่าง (กรุณารัน crawler และ refresh
              หน้า)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center my-10 md:my-0  w-full max-w-[1200px] mx-auto h-50 items-center">
          <div className="border-2 border-red-400 rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-xl font-bold">0</div>
            <div className="text-sm text-gray-700">Player</div>
          </div>

          <div className="border-2 border-red-400 rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-xl font-bold">0</div>
            <div className="text-sm text-gray-700">teams</div>
          </div>

          <div className="border-2 border-red-400 rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-xl font-bold">0</div>
            <div className="text-sm text-gray-700">Agent</div>
          </div>

          <div className="border-2 border-red-400 rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-xl font-bold">0</div>
            <div className="text-sm text-gray-700"> Tournament</div>
          </div>

          <div className="border-2 border-red-400 rounded-md p-4 shadow-sm hover:shadow-md transition">
            <div className="text-xl font-bold">0</div>
            <div className="text-sm text-gray-700">Maps</div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center mt-30 sm:mt-0 w-full max-w-[1200px] mx-auto items-center"
          id="category"
        >
          {["ทั้งหมด", "Players", "Teams", "Agents", "Tournaments", "Maps"].map(
            (item, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-md py-2 px-4 hover:bg-red-100 cursor-pointer transition font-medium"
              >
                {item}
              </div>
            )
          )}
        </div>

        <div className="flex justify-center items-center mt-10 gap-3">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="border-2 p-2 rounded-md w-100"
              type="text"
              name=""
              id=""
              value={query}
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className=" bg-red-500 rounded-md p-2" type="submit">
              search
            </button>
          </form>
        </div>

        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index}>
              <a href={item.link}>{item.team_name} </a>
            </div>
          ))
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </div>
    </>
  );
};

export default Totom;
