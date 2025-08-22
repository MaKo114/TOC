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
    <div className="text-white">
      <h1>Player Detail Page</h1>
      {playerDetail ? (
        <div>
          <p>ชื่อ: {playerDetail.detail.real_name}</p>
          <p>Alias: {playerDetail.detail.alias}</p>
          <p>Team: {team}</p>
          {/* เพิ่มข้อมูลอื่น ๆ ตามที่ API ส่งมา */}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h1>Recent matches</h1>
      <div>
        {playerDetail && Array.isArray(playerDetail.matches) ? (
          playerDetail.matches.map((item, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-lg font-semibold">{item.event}</p>
              <p>Stage: {item.stage}</p>
              <p>
                {item.team_1} vs {item.team_2}
              </p>
            </div>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">Current Team</h2>
      {playerDetail?.recent_team?.current_team && (
        <a
          href={playerDetail.recent_team.current_team.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-6 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={playerDetail.recent_team.current_team.logo}
              alt={playerDetail.recent_team.current_team.name}
              className="h-16 w-16 object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-white">
                {playerDetail.recent_team.current_team.name}
              </p>
              <p className="text-gray-400">
                Joined: {playerDetail.recent_team.current_team.joined}
              </p>
            </div>
          </div>
        </a>
      )}

      <h2 className="text-2xl font-bold text-white mb-4">Past Teams</h2>
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
                <p className="text-lg font-semibold text-white">{team.name}</p>
                <p className="text-gray-400">Left: {team.left}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PlayerDetail;
