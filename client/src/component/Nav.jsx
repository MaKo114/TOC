// rfce
import React from "react";
import { House } from "lucide-react";
import "./Body.css";

function Nav() {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full gap-5 px-8 mt-10">
        {/* Nav left (30% desktop, full on mobile) */}
        <div
          className="w-full md:flex-[0_0_30%] order-2 md:order-1 h-60 md:h-80 flex justify-center items-center rounded-md bg-[url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/0c67438c8b3a418b5ca28f9f234506745493ae42-854x484.png')] bg-center bg-cover"
          style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
        >
          <div className="flex md:order-2">
            {/* Mobile search button */}
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-md text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
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
              <span className="sr-only">Search</span>
            </button>

            {/* Desktop search input */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-4 text-gray-500"
                  aria-hidden="true"
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
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {/* Nav right (70% desktop, full on mobile) */}
        {/* <div className="w-full md:flex-[0_0_68%] order-1 md:order-2 h-60 md:h-80 rounded-md "> */}
        <div
          className="relative w-full md:flex-[0_0_69%] order-1 md:order-2 h-60 md:h-80 rounded-md overflow-hidden"
          style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
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


