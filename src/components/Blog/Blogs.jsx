import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./blog.css";

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("ENLIGHTENMENT");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (uuid) =>
    uuid && `https://sofft.uz/api/v1/references/download/${uuid}`;

  useEffect(() => {
    setLoading(true);
    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        page: 0,
        perPage: 3,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          { key: "type", operation: "=", value: activeTab, type: "STRING" },
        ],
      })
      .then((res) => setBlogs(res?.data?.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  if (loading)
    return (
      <div className="blogs_loading">
        <Spin size="large" />
      </div>
    );
  if (!blogs.length)
    return <h3 className="blogs_empty">Ma'lumot topilmadi 😕</h3>;

  return (
    <div className="container">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "ENLIGHTENMENT", label: "Enlightenment" },
          { key: "VISIT", label: "Tashriflar" },
          { key: "NEW", label: "Yangiliklar" },
          { key: "ARTICLE", label: "Maqolalar" },
        ]}
      />

      {blogs.map(({ id, photo, name, title, createdAt, views }) => (
        <div
          key={id}
          onClick={() => navigate(`/blog/${id}`)}
          className="news_wrapper"
        >
          <img
            className="blog_img"
            src={getImageUrl(photo?.uuid)}
            alt={name?.uz}
          />

          <div className="blogs_info">
            <h3 className="blogs_title">{name?.uz}</h3>

            <p className="blogs_date">
              {new Date(createdAt).toLocaleDateString()}
            </p>

            <div className="news_info">
              <p className="news_date">{title?.uz}</p>

              <p className="news_date">👁 {views}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="all_btn_wrapper">
        <Button
          className="hammasi_btn"
          onClick={() => navigate("/maqolalar")}
          type="primary"
        >
          Hammasi
        </Button>
      </div>
    </div>
  );
};
export default Blogs;
