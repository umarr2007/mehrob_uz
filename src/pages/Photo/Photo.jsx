import React, { useEffect, useState } from "react";
import "./photo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";

function Photo() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState([]);
  const [activephoto, setActivephoto] = useState(null);
  const [photocategory, setPhotocategory] = useState([]);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  
  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/PHOTO")
      .then((res) => {
        const data = res?.data || [];
        setPhotocategory(data);
        if (data.length > 0) setActivephoto(String(data[0].id));
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (!activephoto) return;

    axios
      .post("https://sofft.uz/api/v1/client/photos/pageable", {
        page: 0,
        perPage: 12,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(activephoto),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => setPhoto(res?.data?.data || []))
      .catch((err) => console.log(err));
  }, [activephoto]);

  return (
    <div className="container video_page">
      <div className="video_sidebar">
        <Tabs
          className="video_tabs"
          tabPlacement="left"
          activeKey={activephoto}
          onChange={(key) => setActivephoto(key)}
          items={photocategory?.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />
      </div>

      <div className="audio_wrapper">
        {photo.map((i) => (
          <div
            onClick={() => navigate(`/rasmlar/${i.id}`)}
            className="audio"
            key={i.id}
          >
            <img
              className="blog_img"
              src={getImageUrl(i?.photo?.uuid)}
              alt={i?.title?.uz}
            />
            <h3>{i?.title?.uz}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photo;
