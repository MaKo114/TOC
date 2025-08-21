import React, { useEffect, useState } from "react";
import axios from "axios";

function Content() {
  const [fetch, setFetch] = useState();

  const handlefetch = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/teams");
      setFetch(res.data); // ถ้าอยากได้เฉพาะข้อมูล
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const profiles = [
    {
      name: "Jake Howlett",
      title: "Boaster",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60",
      link: "#",
    },
    {
      name: "Jake Howlett",
      title: "Boaster",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60",
      link: "#",
    },
    {
      name: "Jake Howlett",
      title: "Boaster",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60",
      link: "#",
    },
    {
      name: "Jake Howlett",
      title: "Boaster",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60",
      link: "#",
    },
    {
      name: "Jake Howlett",
      title: "Boaster",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60",
      link: "#",
    },
  ];

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
          {fetch &&
            fetch.map((item, index) => (
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
        className="w-full md:flex-[0_0_69%] h-auto md:h-[800px] bg-[#E7E6E3] rounded-md p-6 shadow-lg overflow-y-auto"
        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
      >
        <div className="text-2xl font-bold text-gray-800 mb-4 pt-10">Players</div>

        <div className="flex flex-wrap justify-start gap-6">
          {profiles.map((profile, index) => (
            <a
              key={index}
              href={profile.link}
              className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] min-w-[250px]"
            >
              <img
                src={profile.image}
                className="h-20 w-20 object-cover rounded-full border-2 border-white"
                alt={profile.title}
              />
              <div className="px-4">
                <div className="text-lg font-semibold text-black">
                  {profile.title}
                </div>
                <div className="text-gray-600">{profile.name}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-2xl font-bold text-gray-800 mb-4 pt-5">Staff</div>

        <div className="flex flex-wrap justify-start gap-6">
          {profiles.map((profile, index) => (
            <a
              key={index}
              href={profile.link}
              className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] min-w-[250px]"
            >
              <img
                src={profile.image}
                className="h-20 w-20 object-cover rounded-full border-2 border-white"
                alt={profile.title}
              />
              <div className="px-4">
                <div className="text-lg font-semibold text-black">
                  {profile.title}
                </div>
                <div className="text-gray-600">{profile.name}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;

// {/* <div className="flex flex-col md:flex-row gap-6 p-6">
//   {/* ฝั่งซ้าย: แสดงข้อมูลทีมที่เลือก */}
//   <div className="flex-1 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
//     {selectedTeam ? (
//       <>
//         <h2 className="text-2xl font-bold mb-4">{selectedTeam.name}</h2>
//         <ul className="space-y-2">
//           {selectedTeam.members.map((member, index) => (
//             <li key={index} className="bg-gray-800 px-4 py-2 rounded-md">
//               {member}
//             </li>
//           ))}
//         </ul>
//       </>
//     ) : (
//       <p className="text-gray-400">เลือกทีมจากด้านขวาเพื่อดูสมาชิก</p>
//     )}
//   </div>

//   {/* ฝั่งขวา: รายชื่อทีม */}
//   <div className="w-full md:w-[300px] bg-black/80 p-4 rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.4)]">
//     <h3 className="text-xl text-white font-semibold mb-4">Teams</h3>
//     <ul className="space-y-3">
//       {teams.map((team, index) => (
//         <li
//           key={index}
//           onClick={() => setSelectedTeam(team)}
//           className="cursor-pointer bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-200 shadow-md"
//         >
//           {team.name}
//         </li>
//       ))}
//     </ul>
//   </div>
// </div> */}
