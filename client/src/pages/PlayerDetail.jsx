import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FullPageSkeleton from "../component/Skeleton";



const PlayerDetail = () => {
  const { team, name } = useParams();
  const [playerDetail, setPlayerDetail] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/team/player-info/?team=${team}&name=${name}`
        );
        setPlayerDetail(res.data);
      } catch (err) {
        console.error("Error fetching player:", err);
      }
    };
    fetchPlayer();
  }, []);

  

  return (
    <div>
{(playerDetail?(<div className="px-10 py-6">
      <div className="bg-[#E7E6E3] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full">
        <div
          className="text-2xl font-bold px-4 py-2 text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Player Profile
        </div>
        {playerDetail?.detail ? (
          <div className="flex flex-col gap-5 sm:flex-row items-center ">
            <img
              src={playerDetail.detail.image}
              className="h-50 w-50 object-cover ml-10 rounded-xl border-2 border-white mt-4 mb-4"
              alt={playerDetail.detail.alias}
            />

            <div className="px-4 w-full text-center sm:text-left">
              <div className="flex items-center gap-5 text-2xl font-semibold text-gray-600">
                <p>
                  {playerDetail.detail.alias || "ไม่ระบุ"} (
                  {playerDetail.detail.real_name || "ไม่ระบุ"})
                </p>
              </div>
              <div className="text-gray-600 text-left">
                {playerDetail.detail.social?.length ? (
                  playerDetail.detail.social.map((link, i) => (
                    <div key={i}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        {link.includes("twitch") ? `${link.slice(12)}` : `@${link.slice(14)}`}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No social links</p>
                )}
              </div>
              <div className="flex items-center gap-5 text-lg font-semibold text-gray-600">
                <Flag
                  code={playerDetail.detail.country?.code}
                  className="w-8 h-8 object-contain rounded-sm"
                ></Flag>
                {playerDetail.detail.country?.name || "Unknown"}
              </div>
            </div>
          </div>
        ) : (
          <div>No data...</div>
        )}
      </div>

      {/* ######################################################################## */}
      <div className="bg-[#E7E6E3] rounded-lg shadow-md w-full h-auto mt-5 pb-8 py-6 px-4">
        <div
          className="text-2xl font-bold px-4 py-2 text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Recent Matches
        </div>

        {playerDetail?.matches?.length ? (
          playerDetail.matches.map((item, index) => (
            <div
              key={index}
              className="my-4 mx-auto max-w-5xl p-4  bg-gray-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Event Thumbnail */}
              <img
                src={
                  item.event_thumb || "https://www.vlr.gg/img/vlr/tmp/vlr.png"
                }
                alt={item.event}
                className="h-16 w-16 object-cover rounded-md"
              />

              {/* Match Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center text-center">
                {/* Event & Stage */}
                <div className="flex flex-col justify-center items-center col-span-2 md:col-span-1">
                  <p className="text-base md:text-lg font-bold text-black truncate max-w-[120px]">
                    {item.event}
                  </p>
                  <p className="text-sm md:text-gray-400">{item.stage}</p>
                </div>

                {/* Team 1 Name */}
                <div className="flex justify-center items-center font-semibold text-black truncate max-w-[120px]">
                  {item.team_1}
                </div>

                {/* Team 1 Logo */}
                <div className="h-16 w-16 flex justify-center items-center mx-auto">
                  <img
                    src={item.team_1_logo}
                    alt={item.team_1}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                {/* Score */}
                <div className="flex justify-center items-center col-span-2 md:col-span-1">
                  {item.score &&
                    (() => {
                      // แยกคะแนนซ้าย-ขวา เช่น "2 : 1"
                      const scoreParts = item.score
                        .split(":")
                        .map((n) => n.trim());
                      if (scoreParts.length !== 2) return null;

                      const left = parseInt(scoreParts[0], 10);
                      const right = parseInt(scoreParts[1], 10);

                      if (isNaN(left) || isNaN(right)) return null;

                      const bgColor =
                        left > right
                          ? "bg-green-500 hover:shadow-green-500/50"
                          : left < right
                          ? "bg-red-500 hover:shadow-green-500/50"
                          : "bg-gray-400";

                      return (
                        <div className={`px-3 py-1 rounded-lg ${bgColor}`}>
                          <p className="text-white font-bold text-sm md:text-base">
                            {item.score}
                          </p>
                        </div>
                      );
                    })()}
                </div>

                {/* Team 2 Logo */}
                <div className="h-16 w-16 flex justify-center items-center mx-auto truncate max-w-[120px]">
                  <img
                    src={item.team_2_logo}
                    alt={item.team_2}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                {/* Team 2 Name */}
                <div className="flex justify-center items-center font-semibold text-black">
                  {item.team_2}
                </div>

                {/* Date & Time */}
                <div className="flex flex-col justify-center items-center text-sm text-gray-500 col-span-2 md:col-span-1">
                  {item.date && item.time && (
                    <>
                      <span>{item.date}</span>
                      <span>{item.time}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black text-center text-2xl">No matches found.</p>
        )
        }
      </div>

      {/* ################################################################################################3 */}

      <div className="bg-[#E7E6E3] rounded-lg shadow-md w-full h-auto mt-5 pb-8 py-6 px-4">
        <div
          className="text-2xl font-bold px-4 py-2 text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Current Teams
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 mt-5">
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            {playerDetail?.recent_team?.current_team ? (
              <div className="flex items-center gap-4">
                <img
                  src={playerDetail.recent_team.current_team.logo}
                  alt={playerDetail.recent_team.current_team.name}
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <p className="text-lg font-semibold text-black">
                    {playerDetail.recent_team.current_team.name}
                    {playerDetail.recent_team.current_team.role
                      ? ` (${playerDetail.recent_team.current_team.role})`
                      : ""}
                  </p>
                  <p className="text-gray-400">
                    joined in {playerDetail.recent_team.current_team.joined}
                  </p>
                </div>
              </div>
            ) : (
              <p>Not teams</p>
            )}
          </div>
        </div>
      </div>

      {/* ################################################################################################3 */}

      <div className="bg-[#E7E6E3] rounded-lg shadow-md w-full h-auto mt-5 pb-8 py-6 px-4">
        <div
          className="text-2xl font-bold px-4 py-2 text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Past Teams
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 mt-5">
          {playerDetail?.recent_team?.past_teams?.map((team, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <p className="text-lg font-semibold text-black">
                    {team.name}
                    {team.role ? ` (${team.role})` : ""}
                  </p>
                  <p className="text-gray-400">
                    {team.joined && team.left
                      ? `${team.joined} – ${team.left}`
                      : team.left
                      ? `Left: ${team.left}`
                      : "No date info"}
                  </p>
                  {team.inactive && (
                    <p className="text-red-400 italic">{team.inactive}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>):(<div><FullPageSkeleton /></div>))}
    
    </div>
  );
};

export default PlayerDetail;
