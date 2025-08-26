import React, { useEffect, useState, useMemo, useRef } from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "./skeletion/Skeleton";
import TeamSkeleton from "./skeletion/TeamSkeleton";

function Content({ searchTerm }) {
  const [allTeams, setAllTeams] = useState([]);
  const [teamCache, setTeamCache] = useState({});
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);
  const lastSelectedRef = useRef(null);

  const filteredTeams = useMemo(() => {
    if (!searchTerm.trim()) return allTeams;
    return allTeams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allTeams]);

  const fetchInitialData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/teams`);
      const teams = Array.isArray(res.data) ? res.data : [];
      setAllTeams(teams);

      const savedTeam = localStorage.getItem("selectedTeam") || teams[0]?.name;
      if (savedTeam) {
        setSelectedTeam(savedTeam);
        await fetchTeamPlayers(savedTeam);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setIsTeamLoading(false);
    }
  };

  const fetchTeamPlayers = async (teamName) => {
    if (teamCache[teamName]) {
      setTeam(teamCache[teamName]);
      return;
    }

    setIsPlayerLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/team/players/${teamName}`
      );
      setTeam(res.data);
      setTeamCache((prev) => ({ ...prev, [teamName]: res.data }));
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsPlayerLoading(false);
    }
  };

  const handleTeamSelect = async (teamName) => {
    if (teamName === lastSelectedRef.current) return;
    lastSelectedRef.current = teamName;
    setSelectedTeam(teamName);
    localStorage.setItem("selectedTeam", teamName);
    await fetchTeamPlayers(teamName);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="px-4 md:px-8 mt-5 flex flex-col md:flex-row w-full gap-5 mb-10">
      {/* Team List */}
      <div className="w-full  lg:w-1/3 bg-[#E7E6E3] rounded-md shadow-lg overflow-y-auto max-h-[800px]">
        <div
          className="text-white text-xl font-bold px-4 py-2 mt-5 mb-5 mx-4 inline-block bg-gradient-to-r from-red-600 to-red-800 shadow-md"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Valorant Team Rankings
        </div>

        <div className="flex flex-col gap-3 px-4 pb-5 text-black text-sm overflow-y-auto max-h-[400px] min-h-0 md:max-h-none md:overflow-y-visible">
          {isTeamLoading
            ? [...Array(5)].map((_, i) => <TeamSkeleton key={i} />)
            : filteredTeams.map((item, index) => {
                const isSelected = selectedTeam === item.name;
                return (
                  <button
                    key={index}
                    onClick={() => handleTeamSelect(item.name)}
                    className={`flex justify-between items-center gap-4 p-2 rounded-lg transition duration-200 bg-white hover:scale-105 ${
                      isSelected
                        ? "bg-red-100 border-l-4 border-red-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className="h-12 w-12 object-contain"
                        src={item.logo}
                        alt={item.name}
                      />
                      <div className="truncate">
                        <div className="flex justify-center items-end gap-2">
                          <div>{item.name}</div>
                          <div className="text-xs font-light text-gray-600">
                            {item.tag}
                          </div>
                        </div>
                        <div className="flex items-start text-xs font-light text-gray-600 ">
                          <p>{item.country}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end pr-2 ">
                      <div className="text-black font-bold">#{item.ranks}</div>
                      <span className="font-light text-black">
                        {item.ratings}
                      </span>
                    </div>
                  </button>
                );
              })}
        </div>
      </div>

      {/* Player & Staff */}
      <div className="w-full md:w-2/3 bg-[#E7E6E3] rounded-md p-6 shadow-lg overflow-y-auto max-h-[800px]">
        {/* Players */}
        <Section title="Players">
          {isPlayerLoading
            ? [...Array(4)].map((_, i) => <Skeleton key={i} />)
            : team
                .filter((p) => p.type === "player" && p.alias)
                .map((p, i) => (
                  <ProfileCard key={i} profile={p} team={selectedTeam} />
                ))}
        </Section>

        {/* Staff */}
        <Section title="Staff">
          {isPlayerLoading
            ? [...Array(4)].map((_, i) => <Skeleton key={i} />)
            : team
                .filter((p) => p.type === "staff" && p.alias)
                .map((p, i) => (
                  <ProfileCard key={i} profile={p} team={selectedTeam} />
                ))}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <>
      <div
        className="text-white text-xl font-bold px-4 py-2 mt-5 mb-5 inline-block bg-gradient-to-r from-red-600 to-red-800 shadow-md"
        style={{
          background: "linear-gradient(135deg, #ff0000, #b30000)",
          clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
          boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
        }}
      >
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {children}
      </div>
    </>
  );
}

function ProfileCard({ profile, team }) {
  return (
    <Link
      to={`/player-detail/${team}/${profile.alias}`}
      className="flex items-center  bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4"
    >
      <img
        src={profile.image}
        className="h-16 w-16 object-cover rounded-full border-2 border-white"
        alt={profile.alias}
      />
      <div className="px-4 w-full overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="flex items-center gap-3 text-base font-semibold text-black">
          <Flag code={profile.flag} className="w-6 h-6" />
          {profile.alias}
        </div>
        <div className="text-gray-600 text-xs">{profile.real_name}</div>
        {profile.roles?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.roles.map((role, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-1 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Content;
