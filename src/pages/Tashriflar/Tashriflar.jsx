import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Tashriflar() {
  const navigate = useNavigate();
  const [tashrif, setTashrif] = useState([]);

  useEffect(() => {
    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        page: 0,
        perPage: 10,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          { key: "type", operation: "=", value: "VISIT", type: "STRING" },
        ],
      })
      .then((res) => setTashrif(res?.data?.data || []))
      .catch(() => setTashrif([]));
  }, []);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  return (
    <div className="container">
      <h2 className="news">Tashriflar</h2>

      {tashrif.map((i) => (
        <div
          key={i.id}
          className="news_wrapper"
          onClick={() => navigate(`/blog/${i?.id}`)}
        >
          <img
            className="blog_img"
            src={getImageUrl(i?.photo?.uuid)}
            alt="tashrif"
          />

          <div className="tashrif_content">
            <h3 className="news_text">{i?.name?.uz}</h3>

            <div className="news_info">
              <span className="news_date">
                {new Date(i?.createdAt).toLocaleDateString()}
              </span>
              <span className="news_date">👁 {i?.views}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tashriflar;
