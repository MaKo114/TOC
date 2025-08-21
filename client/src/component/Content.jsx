import React, { useEffect, useState } from "react";
import axios from 'axios';

function Content() {
  const [fetch, setFetch] = useState();

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/teams');
      setFetch(res.data); // ถ้าอยากได้เฉพาะข้อมูล
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
  handlefetch();
}, []);

  
  return (
    <div className="px-8 mt-5 flex flex-col md:flex-row w-full gap-5 mb-10">
      {/* ฝั่งซ้าย 30% (หรือ 100% บนมือถือ) */}
      <div
        className="w-full md:flex-[0_0_30%] h-[400px] md:h-[800px] bg-[#E7E6E3] rounded-md shadow-lg overflow-y-auto"
        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
      >
        <div
          className="text-white text-3xl font-bold px-4 py-2 mt-5 mb-5 inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Teams
        </div>

        <div className="flex flex-col gap-4 px-5 pb-5 text-black text-xl">
          {fetch && fetch.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 p-3 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              <img
                className="h-20 w-20 object-contain"
                src={item.logo}
                alt={item.name}
              />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ฝั่งขวา 70% (หรือ 100% บนมือถือ) */}
      <div
        className="w-full md:flex-[0_0_69%] h-[400px] md:h-[800px] bg-[#E7E6E3] rounded-md p-10 shadow-lg"
        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full table-fixed m-auto">
            <thead>
              <tr className="text-black text-2xl text-center ">
                <th
                  className="px-4 py-3 text-white font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #b30000, #660000)",
                    boxShadow: "0 0 10px rgba(179, 0, 0, 0.6)",
                    borderRadius: "4px",
                    marginTop: "20px",
                  }}
                >
                  Aka
                </th>
                <th
                  className="px-4 py-3 text-white font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #b30000, #660000)",
                    boxShadow: "0 0 10px rgba(179, 0, 0, 0.6)",
                    borderRadius: "4px",
                    marginTop: "20px",
                  }}
                >
                  Name
                </th>
                <th
                  className="px-4 py-3 text-white font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #b30000, #660000)",
                    boxShadow: "0 0 10px rgba(179, 0, 0, 0.6)",
                    borderRadius: "4px",
                    marginTop: "20px",
                  }}
                >
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              {fetch && fetch.map((item, index) => (
                <tr key={index} className="text-center text-black">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.url}</td>
                  <td className="px-4 py-2">{item.logo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Content;