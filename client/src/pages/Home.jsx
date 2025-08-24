import React, { useState } from "react";
import Nav from "../component/Nav";
import Content from "../component/Content";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="text-red-400 font-bold">
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Content searchTerm={searchTerm}/>
      </div>
    </div>
  );
};

export default Home;
