// rfce
import React from "react";
import "./Body.css";
import axios from "axios";

function Nav({ searchTerm, setSearchTerm }) {
  const csvButton = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/download/team-names`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "team_names.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row w-full gap-5 px-4 mt-6">
        {/* Nav left */}
        <div
          className="w-full md:flex-[0_0_30%] order-1 md:order-1 flex flex-col justify-center items-center rounded-md 
    bg-[url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/0c67438c8b3a418b5ca28f9f234506745493ae42-854x484.png')] 
    bg-center bg-cover p-6"
          style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
        >
          {/* Search */}
          <div className="w-full relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-white opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="ค้นหาทีม"
              className="w-full p-3 pl-10 text-base md:text-xl text-white bg-black/40 border border-white/30 
        rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.6)] 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-white 
        bg-black/40 border border-cyan-400 rounded-lg 
        hover:bg-cyan-500/20 active:scale-95 transition"
              onClick={() =>
                window.open("https://github.com/MaKo114/TOC", "_blank")
              }
            >
              GitHub
            </button>

            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-white 
        bg-black/40 border border-cyan-400 rounded-lg 
        hover:bg-cyan-500/20 active:scale-95 transition"
              onClick={() => csvButton()}
            >
              CSV
            </button>
            
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 text-white 
        bg-black/40 border border-cyan-400 rounded-lg 
        hover:bg-cyan-500/20 active:scale-95 transition"
              onClick={() =>
                window.open("https://www.vlr.gg/", "_blank")
              }
            >
              Website reference
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-full md:flex-[0_0_70%] order-2 md:order-2 rounded-md overflow-hidden h-40 md:h-80">
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/newx.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Nav;
