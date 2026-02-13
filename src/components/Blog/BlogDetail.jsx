import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./blog.css";
import dayjs from "dayjs";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/blogs/${id}`)
      .then((res) => setBlog(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container">
      <div>
        <h3 className="news_text">{blog?.name?.uz}</h3>
        <div className="news_info">
          <p className="news_date">
            {dayjs(blog.createdAt).format("YYYY [yil] DD MMMM, dddd")}
          </p>
          <p className="news_date"> 👁 {blog.views}</p>
        </div>
      </div>
      <hr className="blog_hr" />

      {/* <h3 style={{ textAlign: "center" }} className="news_description">
        {blog?.name?.uz}
      </h3> */}

      <div className="blogs_img_wrapper">
        <img
          className="blogs_img"
          src={`https://sofft.uz/api/v1/references/download/${blog.photo.uuid}`}
          alt="blog"
        />
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog?.description?.uz,
        }}
      />
    </div>
  );
}
export default BlogDetail;
