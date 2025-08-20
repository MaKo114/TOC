import React from "react";

function Content() {
  const data = [
    {
      name: "toto",
      age: 21,
      tel: "123545",
    },
    {
      name: "dddddd",
      age: 21,
      tel: "123545",
    },
    {
      name: "teoafafea",
      age: 21,
      tel: "123545",
    },
    {
      name: "toto",
      age: 21,
      tel: "123545",
    },
    {
      name: "dddddd",
      age: 21,
      tel: "123545",
    },
    {
      name: "teoafafea",
      age: 21,
      tel: "123545",
    },
  ];
  return (
    <div className="px-8 mt-5 flex flex-col md:flex-row w-full gap-5 mb-10">
      {/* ฝั่งซ้าย 30% (หรือ 100% บนมือถือ) */}
      <div
        className="w-full md:flex-[0_0_30%] h-[400px] md:h-[800px] bg-[#f0f4ff] rounded-md shadow-lg overflow-y-auto"
        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
      >
        <div className="flex justify-between p-10">
          <div className="text-2xl text-black">Teams</div>
          <div className="flex gap-5">
            <button className="px-5 h-10 bg-gray-950 rounded-xl text-amber-50">
              Github
            </button>
            <button className="px-5 h-10 bg-gray-950 rounded-xl text-amber-50">
              CSV
            </button>
          </div>
        </div>
        <div className="grid place-items-center">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <div>{item.age}</div>
                  </div>
                );
              })}
            </div>
      </div>

      {/* ฝั่งขวา 70% (หรือ 100% บนมือถือ) */}
      <div
        className="w-full md:flex-[0_0_69%] h-[400px] md:h-[800px] bg-[#f0f4ff] rounded-md p-10 shadow-lg"
        style={{ boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
      >
        <table class="w-full h-auto table-auto text-2xl">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
            <br />
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
        {/* <div className="grid grid-cols-3 place-items-center p-5">
          <div className="text-2xl text-black">
            Aka
            <div className="grid place-items-center">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <div>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-2xl text-black">
            Name 
            <div className="grid place-items-center">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <div>{item.age}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-2xl text-black">
            Country 
            <div className="grid place-items-center">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <div>{item.tel}</div>
                  </div>
                );
              })}
            </div> */}
        {/* </div>
        </div> */}
      </div>
    </div>
  );
}

export default Content;

//  {
//             data.map((item, index) => {
//               return (
//               <div key={index}>
//                   <div>{item.name}</div>
//                   <div>{item.age}</div>
//                   <div>{item.tel}</div>
//               </div>)
//             })
//           }
