import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />{" "}
        <span className="sky_gradient text-center">AI Prompts</span>
      </h1>
      <p className='desc text-center'>
      InspireAI is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>
    <Feed />
    </section>
  );
};

export default Home;
