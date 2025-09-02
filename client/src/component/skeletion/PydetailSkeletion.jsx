import React from "react";

const PydetailSkeletion = () => {
  return (
    <div className="space-y-8 px-6 py-10 bg-[#F5F5F5] min-h-screen animate-pulse">

      {/* Player Detail */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow">
        <div className="h-32 w-32 bg-gray-300 rounded-xl"></div>
        <div className="flex-1 space-y-4 w-full">
          <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Current Teams */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
              <div className="h-12 w-12 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      

      {/* Recent Matches */}
      <div>
        <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow my-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 w-full">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PydetailSkeletion;