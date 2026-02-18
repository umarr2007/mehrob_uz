import React, { use } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
function Maqolalar() {
  const navigate = useNavigate();
  const [maqolalar, setMaqolalar] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [total, setTotal] = useState(0);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        page: pagination - 1,
        perPage: 10,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          { key: "type", operation: "=", value: "ARTICLE", type: "STRING" },
        ],
      })
      .then((res) => {
        setMaqolalar(res?.data?.data || []);
        setTotal(res?.data?.totalCount || 0);
      })
      .catch(() => {
        setMaqolalar([]);
      });
  }, [pagination]);
  return (
    <div className="container">
      <h2 className="news">Maqolalar</h2>
      {maqolalar.map((i) => (
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
            <p>{i.title.uz}</p>
          </div>
        </div>
      ))}
      <div className="pagination_wrapper">
        <Pagination
          current={pagination}
          total={total}
          onChange={(e) => setPagination(e)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default Maqolalar;
