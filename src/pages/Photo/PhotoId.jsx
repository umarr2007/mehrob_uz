import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";

function PhotoId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [relatedPhotos, setRelatedPhotos] = useState([]);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/photos/${id}`)
      .then((res) => setPhoto(res?.data?.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!photo?.category?.id) return;

    axios
      .post("https://sofft.uz/api/v1/client/photos/pageable", {
        page: 0,
        perPage: 12,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(photo?.category?.id),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => setRelatedPhotos(res?.data?.data || []))
      .catch((err) => console.log(err));
  }, [photo]);

  return (
    <div className="container">
      <div className="blogs_img_wrapper">
        <img
          className="blogs_img"
          src={getImageUrl(photo?.photo?.uuid)}
          alt={photo?.title?.uz}
        />
      </div>
      <p>{photo?.description}</p>

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
  );
}

export default PhotoId;
