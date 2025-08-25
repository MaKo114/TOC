import React from "react";

const TeamSkeleton = () => {
  return (
    <div
      className="flex justify-between items-center gap-4 p-2 rounded-lg bg-gray-200 animate-pulse"
    >
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col mr-2 gap-2">
        <div className="h-4 w-8 bg-gray-300 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default TeamSkeleton;
