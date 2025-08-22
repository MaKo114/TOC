import React from "react";
import Nav from "../component/Nav";
import Content from "../component/Content";

const Home = () => {
  return (
    <div>
      <div className="text-red-400 font-bold">
        <Nav></Nav>
        <Content></Content>
      </div>
    </div>
  );
};

export default Home;
