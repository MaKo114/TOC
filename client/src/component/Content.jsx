import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { Link } from "react-router-dom";

function Content({ searchTerm }) {
  const [allTeams, setAllTeams] = useState([]); // ข้อมูลทั้งหมด
  const [filteredTeams, setFilteredTeams] = useState([]); // ข้อมูลที่กรองแล้ว

  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeam = async (value) => {
    if (value === selectedTeam) return; // ถ้าเลือกทีมเดิม ไม่ต้อง fetch ใหม่
    setIsLoading(true);
    setSelectedTeam(value);
    localStorage.setItem("selectedTeam", value);
    try {
      const res = await axios.get(
        `https://toc-backend-78wq.onrender.com/team/players/${value}`
      );
      setTeam(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handlefetch = async (initialTeam) => {
    try {
      const res = await axios.get(
        `https://toc-backend-78wq.onrender.com/teams`
      );
      const teams = Array.isArray(res.data) ? res.data : [];
      setAllTeams(teams);
      setFilteredTeams(teams); // เริ่มต้นแสดงทั้งหมด

      const teamToLoad = initialTeam || teams[0]?.name;
      if (teamToLoad) {
        setSelectedTeam(teamToLoad);
        const teamRes = await axios.get(
          `https://toc-backend-78wq.onrender.com/team/players/${teamToLoad}`
        );
        setTeam(teamRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedTeam = localStorage.getItem("selectedTeam");
    handlefetch(savedTeam);
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTeams(allTeams);
    } else {
      const filtered = allTeams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, allTeams]);
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

        <div className="flex flex-col gap-4 px-5 pb-5 text-black text-xl ">
          {filteredTeams &&
            filteredTeams.map((item, index) => {
              const isSelected = selectedTeam === item.name;
              return (
                <button
                  onClick={() => handleTeam(item.name)}
                  key={index}
                  value={item.name}
                  className={`flex items-center gap-5 p-3 rounded-lg transition duration-200 bg-[#ffff] hover:scale-105 ${
                    isSelected
                      ? "bg-red-100 border-l-4 border-red-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    className="h-20 w-20 object-contain"
                    src={item.logo}
                    alt={item.name}
                  />
                  <div>{item.name}</div>
                </button>
              );
            })}
        </div>
      </div>

      {/* ฝั่งขวา 70% (หรือ 100% บนมือถือ) */}
      <div
        className="w-full md:flex-[0_0_69%] h-auto md:h-[800px] bg-[#E7E6E3] rounded-md p-6 shadow-lg overflow-y-auto px-4 md:pl-20 scroll-smooth overscroll-contain"
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
          Players
        </div>

        <div className="flex flex-wrap justify-start gap-6">
          {isLoading
            ? // Skeleton Loader
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-lg p-4 w-full sm:w-[48%]  lg:w-[30%] xl:w-[22%] min-w-[250px] animate-pulse"
                >
                  <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
                  <div className="px-4 flex flex-col gap-2">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            : team
                .filter((profile) => profile.type === "player" && profile.alias)
                .map((profile, index) => (
                  <Link
                    to={`/player-detail/${selectedTeam}/${profile.alias}`}
                    key={index}
                    className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] min-w-[250px]"
                  >
                    <img
                      src={profile.image}
                      className="h-20 w-20 object-cover rounded-full border-2 border-white"
                      alt={profile.alias}
                    />
                    <div className="px-4 w-full max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                      <div className="flex items-center gap-5 text-lg font-semibold text-black">
                        <Flag code={profile.flag} className="w-8 h-8"></Flag>
                        {profile.alias}
                      </div>
                      <div className="text-gray-600">{profile.real_name}</div>
                    </div>
                  </Link>
                ))}
        </div>

        <div
          className="text-white text-3xl font-bold px-4 py-2 mt-5 mb-5 inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Staff
        </div>

        <div className="flex flex-wrap justify-start gap-6">
          {isLoading
            ? // Skeleton Loader
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-lg p-4 w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] min-w-[250px] animate-pulse"
                >
                  <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
                  <div className="px-4 flex flex-col gap-2">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            : team
                .filter((profile) => profile.type === "staff" && profile.alias)
                .map((profile, index) => (
                  <Link
                    to={`/player-detail/${selectedTeam}/${profile.alias}`}
                    key={index}
                    className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] min-w-[250px]"
                  >
                    <img
                      src={profile.image}
                      className="h-20 w-20 object-cover rounded-full border-2 border-white"
                      alt={profile.alias}
                    />
                    <div className="px-4">
                      <div className="flex items-center gap-5 text-lg font-semibold text-black">
                        <Flag code={profile.flag} className="w-8 h-8"></Flag>
                        {profile.alias}
                      </div>
                      <div className="text-gray-600">{profile.real_name}</div>
                    </div>
                  </Link>
                ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
