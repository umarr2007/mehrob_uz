import React from "react";
import Hero from "../../components/Hero/Hero";
import Blogs from "../../components/Blog/Blogs";
import BlogsCarousel from "../../components/Carousel/BlogsCarousel";
import MediaTabs from "../../components/MediaTabs/MediaTabs";
import CarouseList from "../../components/Carousel_list/CarouseList";

function Home() {
  return (
    <div>
      <Hero />
      <Blogs/>
      <BlogsCarousel/>
      <MediaTabs/>
      <CarouseList/>

    </div>
  );
}

export default Home;
