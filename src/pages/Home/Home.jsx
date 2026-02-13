import React from "react";
import Hero from "../../components/Hero/Hero";
import Blogs from "../../components/Blog/Blogs";
import BlogsCarousel from "../../components/Carousel/BlogsCarousel";

function Home() {
  return (
    <div>
      <Hero />
      <Blogs/>
      <BlogsCarousel/>

    </div>
  );
}

export default Home;
