import React from "react";

const StaffSkeleton = () => {
  return (
    <div className="flex items-center bg-gray-200 rounded-lg p-4 animate-pulse">
      <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
      <div className="px-4 flex flex-col gap-2">
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default StaffSkeleton;
