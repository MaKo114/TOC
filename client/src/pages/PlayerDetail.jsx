import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PydetailSkeletion from "../component/skeletion/PydetailSkeletion";

const PlayerDetail = () => {
  const { team, name } = useParams();
  const [playerDetail, setPlayerDetail] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/team/player-info/?team=${team}&name=${name}`
        );
        setPlayerDetail(res.data);
      } catch (err) {
        console.error("Error fetching player:", err);
      }
    };
    fetchPlayer();
  }, []);

  return (
    <div className="px-4 sm:px-8 py-6">
      {playerDetail ? (
        <div>
          {/* Player Profile */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <div
              className="text-xl sm:text-2xl font-bold px-4 py-2 text-white inline-block mb-4"
              style={{
                background: "linear-gradient(135deg, #ff0000, #b30000)",
                clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
              }}
            >
              Player Profile
            </div>

            {playerDetail?.detail ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={playerDetail.detail.image}
                  className="h-40 w-40 object-cover rounded-xl border-2 border-white"
                  alt={playerDetail.detail.alias}
                />

                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl font-semibold text-gray-700 flex justify-between items-end gap-3">
                    {playerDetail.detail.alias || "ไม่ระบุ"}
                    <div className="text-xl text-gray-600">{playerDetail.detail.real_name || "ไม่ระบุ"}</div>
                  </p>

                  <div className="mt-2 text-gray-600">
                    {playerDetail.detail.social?.length ? (
                      playerDetail.detail.social.map((link, i) => (
                        <div key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline break-all"
                          >
                            {link.includes("twitch")
                              ? `${link.slice(12)}`
                              : `@${link.slice(14)}`}
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No social links</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                    <Flag
                      code={playerDetail.detail.country?.code}
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded-sm"
                    />
                    <span className="text-gray-700 font-medium">
                      {playerDetail.detail.country?.name || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p>No data...</p>
            )}
          </div>

          {/* Recent Matches */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <div
              className="text-xl sm:text-2xl font-bold px-4 py-2 text-white inline-block mb-4"
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
                  className="my-4 p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row gap-4"
                >
                  {/* Thumbnail */}
                  <img
                    src={
                      item.event_thumb ||
                      "https://www.vlr.gg/img/vlr/tmp/vlr.png"
                    }
                    alt={item.event}
                    className="h-16 w-16 object-cover rounded-md mx-auto sm:mx-0"
                  />

                  {/* Match Info */}
                  <div className="flex flex-col sm:grid sm:grid-cols-7 gap-3 sm:gap-4 w-full text-center sm:text-left">
                    <div className="col-span-2">
                      <p className="text-base font-bold text-black truncate">
                        {item.event}
                      </p>
                      <p className="text-sm text-gray-500">{item.stage}</p>
                    </div>

                    <div className="md:grid md:grid-cols-2 md:items-center md:text-end font-semibold text-black">
                      {item.team_1}
                      <img
                        src={item.team_1_logo}
                        alt={item.team_1}
                        className="h-12 w-12 object-contain mx-auto"
                      />
                    </div>

                    {/* Score */}
                    <div className="flex justify-center items-center">
                      {item.score && (
                        <span
                          className={`px-3 py-1 rounded-lg text-white text-sm font-bold ${
                            parseInt(item.score.split(":")[0]) >
                            parseInt(item.score.split(":")[1])
                              ? "bg-green-500"
                              : parseInt(item.score.split(":")[0]) <
                                parseInt(item.score.split(":")[1])
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {item.score}
                        </span>
                      )}
                    </div>

                    <div className="md:grid md:grid-cols-2 md:items-center font-semibold text-black">
                      <img
                        src={item.team_2_logo}
                        alt={item.team_2}
                        className="h-12 w-12 object-contain mx-auto"
                      />
                      {item.team_2}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black text-center">No matches found.</p>
            )}
          </div>

          {/* Current Team */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black">
              Current Team
            </h3>
            {playerDetail?.recent_team?.current_team ? (
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <img
                  src={playerDetail.recent_team.current_team.logo}
                  alt={playerDetail.recent_team.current_team.name}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="font-semibold text-black">
                    {playerDetail.recent_team.current_team.name}{" "}
                    {playerDetail.recent_team.current_team.role &&
                      `(${playerDetail.recent_team.current_team.role})`}
                  </p>
                  <p className="text-gray-500 text-sm">
                    joined {playerDetail.recent_team.current_team.joined}
                  </p>
                </div>
              </div>
            ) : (
              <p>No current team</p>
            )}
          </div>

          {/* Past Teams */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black">
              Past Teams
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {playerDetail?.recent_team?.past_teams?.length ? (
                playerDetail.recent_team.past_teams.map((team, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <p className="font-semibold text-black">
                        {team.name} {team.role && `(${team.role})`}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {team.joined && team.left
                          ? `${team.joined} – ${team.left}`
                          : team.left
                          ? `Left: ${team.left}`
                          : "No date info"}
                      </p>
                      {team.inactive && (
                        <p className="text-red-500 text-sm italic">
                          {team.inactive}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No past teams</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PydetailSkeletion />
      )}
    </div>
  );
};

export default PlayerDetail;
