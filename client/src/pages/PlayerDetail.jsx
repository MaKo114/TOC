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
<<<<<<< HEAD

    <div>
{(playerDetail?(<div className="px-10 py-6">
      <div className="bg-[#E7E6E3] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full">
        <div
          className="text-2xl font-bold px-10 py-2 text-white inline-block"
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
          className="text-2xl font-bold px-10 py-2 text-white inline-block"
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
              className="my-4 mx-auto max-w-5xl p-4  bg-[#d2d1cc] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-4"
=======
    <div className="px-4 sm:px-8 py-6">
      {playerDetail ? (
        <div>
          {/* Player Profile */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <div
              className="text-xl px-4 py-2 text-white font-bold inline-block mb-4"
              style={{
                background: "linear-gradient(135deg, #ff0000, #b30000)",
                clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
              }}
>>>>>>> eb056d6e877346440d73079c9b7310d59ea259f2
            >
              Player Profile
            </div>

            {playerDetail?.detail ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-10 rounded-lg">
                <img
                  src={playerDetail.detail.image}
                  className="h-40 w-40 object-cover rounded-xl border-2 border-gray-400 bg-[#E7E6E3]"
                  alt={playerDetail.detail.alias}
                />

                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-semibold text-gray-700 ">
                   <div> {playerDetail.detail.alias}</div>
                    <div className="text-sm text-gray-600">
                      {playerDetail.detail.real_name}
                    </div>
                  </div>

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
<<<<<<< HEAD
            </div>
          ))
        ) : (
          <p className="text-black text-center text-2xl">No matches found.</p>
        )
        }
      </div>
      
=======
            ) : (
              <p>No data...</p>
            )}
          </div>
>>>>>>> eb056d6e877346440d73079c9b7310d59ea259f2

          {/* Recent Matches */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <div
              className="text-xl px-4 py-2 text-white font-bold inline-block mb-4"
              style={{
                background: "linear-gradient(135deg, #ff0000, #b30000)",
                clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
              }}
            >
              Recent Matches
            </div>

<<<<<<< HEAD
      <div className="bg-[#E7E6E3] rounded-lg shadow-md w-full h-auto mt-5 pb-8 py-6 px-4">
        <div
          className="text-2xl font-bold px-10 py-2 text-white inline-block"
          style={{
            background: "linear-gradient(135deg, #ff0000, #b30000)",
            clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
            boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
          }}
        >
          Current Teams
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 mt-5">
          <div className="p-4 bg-[#d2d1cc] rounded-lg shadow-md hover:shadow-lg transition">
=======
            {playerDetail?.matches?.length ? (
              playerDetail.matches.map((item, index) => (
                <div
                  key={index}
                  className=" my-4 p-4 bg-white rounded-lg shadow-md flex flex-col justify-center items-center sm:flex-row gap-4"
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
                  <div className="flex flex-col sm:grid sm:grid-cols-6 md:grid-cols-7 gap-3 sm:gap-4 w-full text-center sm:text-left">
                    <div className="col-span-2">
                      <p className="text-base font-bold text-black truncate">
                        {item.event}
                      </p>
                      <p className="text-sm text-gray-500">{item.stage}</p>
                    </div>

                    <div className="sm:flex sm:flex-col-reverse md:grid md:grid-cols-2 md:items-center md:text-end font-semibold text-black">
                      <div>{item.team_1}</div>

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
                          className={`px-5 py-2  sm:px-1 md:px-2 lg:px-6 rounded-lg text-white text-sm font-bold ${
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

                  <div className="flex flex-col justify-center items-center md:flex md:flex-col md:justify-center md:items-end">
                    <div>{item.date}</div>
                    <div>{item.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black text-center pb-4">No matches found.</p>
            )}
          </div>

          {/* Current Team */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <h3
              className="text-xl font-bold px-4 py-1 inline-block mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, #ff0000, #b30000)",
                clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
              }}
            >
              Current Team
            </h3>
>>>>>>> eb056d6e877346440d73079c9b7310d59ea259f2
            {playerDetail?.recent_team?.current_team ? (
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
                <img
                  src={playerDetail.recent_team.current_team.logo}
                  alt={playerDetail.recent_team.current_team.name}
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <p className="flex flex-col font-semibold text-black">
                    {playerDetail.recent_team.current_team.name}{" "}
                    {playerDetail.recent_team.current_team.role && (
                      <p className="bg-gray-300 text-sm text-center px-1  text-gray-600 ">
                        {playerDetail.recent_team.current_team.role.toUpperCase()}
                      </p>
                    )}
                  </p>
                  <p className="text-gray-500 text-sm">
                     {(playerDetail.recent_team.current_team.joined ? (<>joined in {playerDetail.recent_team.current_team.joined}</>):(<></>))}
                  </p>
                </div>
              </div>
            ) : (
              <p>No current team</p>
            )}
          </div>

<<<<<<< HEAD
      {/* ################################################################################################3 */}

      <div className="bg-[#E7E6E3] rounded-lg shadow-md w-full h-auto mt-5 pb-8 py-6 px-4">
        <div
          className="text-2xl font-bold px-10 py-2  text-white inline-block"
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
              className="p-4 bg-[#d2d1cc] rounded-lg shadow-md hover:shadow-lg transition"
=======
          {/* Past Teams */}
          <div className="bg-[#E7E6E3] rounded-lg shadow-md p-4 w-full mb-6">
            <h3
              className="text-xl px-4 py-1 font-bold inline-block mb-4 text-white"
              style={{
                background: "linear-gradient(135deg, #ff0000, #b30000)",
                clipPath: "polygon(0 0, 100% 10%, 90% 100%, 0% 90%)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
              }}
>>>>>>> eb056d6e877346440d73079c9b7310d59ea259f2
            >
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
                      <div className="flex flex-col items-start font-semibold text-black">
                        <span>{team.name}</span>
                        <span className="bg-gray-300 text-sm  px-1 text-center  text-gray-600">
                          {team.role && team.role.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {team.joined && team.left
                          ? `${team.joined} – ${team.left}`
                          : team.left
                          ? `left in ${team.left}`
                          : <></>}
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
