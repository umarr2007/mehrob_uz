import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Tabs } from "antd";
import "./photoid.css";

function PhotoId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/PHOTO")
      .then((res) => {
        setCategories(res?.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/photos/${id}`)
      .then((res) => {
        const data = res?.data?.data;
        setPhoto(data);

        if (data?.category?.id) {
          setActiveTab(String(data.category.id));
        }

        return axios.post("https://sofft.uz/api/v1/client/photos/pageable", {
          page: 0,
          perPage: 6,
          sort: { name: "createdAt", direction: "desc" },
          search: [
            {
              key: "category.id",
              operation: "=",
              value: data?.category?.id,
              type: "NUMBER",
            },
          ],
        });
      })
      .then((res) => {
        setRelatedPhotos(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container video_page">
      {/* 🔹 Sidebar */}
      <div className="video_sidebar">
        <Tabs
          className="video_tabs"
          tabPlacement="left"
          activeKey={activeTab}
          onChange={(key) => navigate(`/rasmlar?category=${key}`)}
          items={categories?.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />
      </div>

      <div className="photo_detail_content">
        {photo && (
          <>
            <div className="blogs_img_wrapper">
              <img
                className="blogs_img"
                src={getImageUrl(photo?.photo?.uuid)}
                alt={photo?.title?.uz}
              />
            </div>

            <h2>{photo?.title?.uz}</h2>
            <p>{photo?.description?.uz}</p>
          </>
        )}

      <div className="audio_wrapper">
          {relatedPhotos
            .filter((item) => item.id !== Number(id))
            .map((item) => (
              <Card
                key={item.id}
                className="blog_img"
                onClick={() => navigate(`/rasmlar/${item.id}`)}
              >
                <img
                  className="audio_img"
                  src={getImageUrl(item?.photo?.uuid)}
                  alt={item?.title?.uz}
                />
                <div className="audio_text">
                  <span className="audio_title">{item?.title?.uz}</span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
export default PhotoId;