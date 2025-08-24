import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PlayerDetail = () => {
  const { team, name } = useParams();
  const [playerDetail, setPlayerDetail] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `https://toc-5ral.onrender.com/team/player-info/?team=${team}&name=${name}`
        );
        setPlayerDetail(res.data);
      } catch (err) {
        console.error("Error fetching player:", err);
      }
    };

    fetchPlayer();
  }, []);

  return (
    <div className="text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Player Detail</h1>

      {playerDetail?.detail ? (
        <div className="mb-6">
          <p>ชื่อจริง: {playerDetail.detail.real_name || "ไม่ระบุ"}</p>
          <p>Alias: {playerDetail.detail.alias || "ไม่ระบุ"}</p>
          <p>Team Param: {team}</p>
          <p>Country: {playerDetail.detail.country?.name || "Unknown"}</p>
          <div className="flex gap-4 mt-2">
            {playerDetail.detail.social?.length ? (
              playerDetail.detail.social.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  {link.includes("twitch") ? "Twitch" : "Twitter"}
                </a>
              ))
            ) : (
              <p className="text-gray-400">No social links</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading player info...</p>
      )}

      <h2 className="text-2xl font-bold mb-4">Recent Matches</h2>
      <div>
        {playerDetail?.matches?.length ? (
          playerDetail.matches.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-800 rounded-lg flex gap-4 items-center"
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
              <div>
                <p className="text-lg font-semibold">{item.event}</p>
                <p className="text-gray-400">{item.stage}</p>
                <p className="text-white">
                  {item.team_1} vs {item.team_2}
                </p>
                {item.score && (
                  <p className="text-green-400 font-bold mt-1">
                    Score: {item.score}
                  </p>
                )}
                {item.date && item.time && (
                  <p className="text-sm text-gray-500">
                    {item.date} at {item.time}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Past Teams</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playerDetail?.recent_team?.past_teams?.map((team, index) => (
          <a
            key={index}
            href={team.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={team.logo}
                alt={team.name}
                className="h-16 w-16 object-contain"
              />
              <div>
                <p className="text-lg font-semibold text-white">
                  {team.name}
                  {team.role ? ` (${team.role})` : ""}
                </p>
                <p className="text-gray-400">
                  {team.joined && team.left
                    ? `Period: ${team.joined} – ${team.left}`
                    : team.left
                    ? `Left: ${team.left}`
                    : "No date info"}
                </p>
                {team.inactive && (
                  <p className="text-red-400 italic">
                    Inactive from {team.inactive}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PlayerDetail;
