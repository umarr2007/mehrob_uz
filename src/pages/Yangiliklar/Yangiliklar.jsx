import React, { useEffect, useState } from "react";
import "./news.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Yangiliklar() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        page: 0,
        perPage: 10,
        sort: { name: "createdAt", direction: "desc" },
        search: [{ key: "type", operation: "=", value: "NEW", type: "STRING" }],
      })
      .then((res) => setNews(res?.data?.data || []))
      .catch(() => setNews([]));
  }, []);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  return (
    <div className="container">
      <h2 className="news">Yangiliklar</h2>
      {news.map((i) => (
        <div
          onClick={() => navigate(`/blog/${i?.id}`)}
          className="news_wrapper"
          key={i.id}
        >
          <div>
            <img
              className="news_img"
              src={getImageUrl(i?.photo?.uuid)}
              alt="news"
            />
          </div>
          <div>
            <h5 className="news_text">{i?.name?.uz}</h5>
            <div className="news_info">
              <p className="news_date">
                {new Date(i?.createdAt).toLocaleDateString()}
              </p>
              <p className="news_date"> 👁 {i.views}</p>
            </div>
            <div
              className="news_desc"
              dangerouslySetInnerHTML={{ __html: i?.description?.uz }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Yangiliklar;
