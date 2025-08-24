// rfce
import React from "react";
import "./Body.css";
import axios from "axios";

function Nav({ searchTerm, setSearchTerm }) {

  const csvButton = async () => {
    const res = await axios.get(`https://toc-5ral.onrender.com/download/team-names`, {
      responseType: "blob",
    });

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
      <div className="flex flex-col md:flex-row w-full gap-5 px-8 mt-10">
        {/* Nav left (30% desktop, full on mobile) */}
        <div
          className="w-full md:flex-[0_0_30%] order-2 md:order-1 h-60 md:h-80 flex justify-center items-center rounded-md bg-[url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/0c67438c8b3a418b5ca28f9f234506745493ae42-854x484.png')] bg-center bg-cover"
          style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
        >
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/your-background.jpg')" }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
              {/* ช่องค้นหา */}
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-white opacity-80"
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
                  className="w-full max-w-[500px] p-5 ps-14 text-xl text-white bg-black/40 border border-white/30 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.6)] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                />
              </div>

              {/* ปุ่ม GitHub และ CSV */}
              <div className="flex gap-4">
                {/* GitHub Button */}
                <button
                  className="flex items-center gap-2 px-6 py-2 text-white bg-black/40 border border-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:shadow-[0_0_25px_rgba(0,255,255,0.9)] hover:bg-cyan-500/20 active:scale-95 transition-all duration-300"
                  onClick={() =>
                    window.open("https://github.com/MaKo114/TOC", "_blank")
                  }
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.23 2.73.11 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.27 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                  </svg>
                  GitHub
                </button>

                {/* CSV Button */}
                <button
                  className="flex items-center gap-2 px-6 py-2 text-white bg-black/40 border border-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:shadow-[0_0_25px_rgba(0,255,255,0.9)] hover:bg-cyan-500/20 active:scale-95 transition-all duration-300"
                  onClick={() => csvButton()}
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2z" />
                  </svg>
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nav right (70% desktop, full on mobile) */}
        {/* <div className="w-full md:flex-[0_0_68%] order-1 md:order-2 h-60 md:h-80 rounded-md "> */}
        <div
          className="relative w-full md:flex-[0_0_69%] order-1 md:order-2 h-60 md:h-80 rounded-md overflow-hidden"
          style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
        >
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/newx.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Nav;
