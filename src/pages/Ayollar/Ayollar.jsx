import React, { useEffect, useState } from "react";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";

function Ayollar() {
  const navigate = useNavigate();
  const [women, setWomen] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        perPage: 10,
        page: page - 1,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "type",
            operation: "=",
            value: "WOMEN_PAGE",
            type: "STRING",
          },
        ],
      })
      .then((res) => {
        setWomen(res.data.data || []);
        setTotal(res.data.totalCount || 0);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div className="container">
      <CustomTabs />

      <div>
        {women.map((item) => (
          <div
            className="news_wrapper"
            onClick={() => navigate(`/blog/${item.id}`)}
            key={item.id}
          >
            <img
              className="blog_img"
              src={getImageUrl(item?.photo?.uuid)}
              alt=""
            />

            <div className="tashrif_content">
              <h3 className="news_text">{item?.name?.uz}</h3>

              <div className="news_info">
                <span className="news_date">
                  {new Date(item?.createdAt).toLocaleDateString()}
                </span>
                <span className="news_date">👁 {item?.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>    

      {total > 10 && (
        <div className="pagination_wrapper">
          <Pagination
            current={page}
            total={total}
            pageSize={10}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default Ayollar;
