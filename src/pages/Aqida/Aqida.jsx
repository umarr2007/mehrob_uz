import React, { useEffect, useState } from "react";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Aqida() {
  const navigate = useNavigate();
  const [aqida, setAqida] = useState([]);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

    useEffect(() => {
      axios
        .post("https://sofft.uz/api/v1/client/blogs/pageable", {
          perPage: 10,
          page: 0,
          sort: { name: "createdAt", direction: "desc" },
          search: [
            {
              key: "type",
              operation: "=",
              value: "AQIDA",
              type: "STRING",
            },
          ],
        })
        .then((res) => {
          setAqida(res.data.data);
        })
        .catch((err) => console.log(err));
    }, []);
    

  return (
    <div className="container">
      <CustomTabs />
      <div>
        {aqida.map((item) => (
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
    </div>
  );
}
export default Aqida;
