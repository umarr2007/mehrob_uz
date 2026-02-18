import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tabs, Button } from "antd";
import "./audioId.css";

const getFileUrl = (uuid) =>
  uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

function AudioId() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [audio, setAudio] = useState(null);
  const [relatedAudios, setRelatedAudios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  /* ================= CATEGORY LIST ================= */
  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/AUDIO")
      .then((res) => {
        const data = res?.data || [];
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* ================= AUDIO DETAIL ================= */
  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/audios/${id}`)
      .then((res) => {
        const data = res?.data?.data;
        setAudio(data);

        if (data?.category?.id) {
          setActiveTab(String(data.category.id));
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  /* ================= CATEGORY BO‘YICHA AUDIOLAR ================= */
  useEffect(() => {
    if (!activeTab) return;

    axios
      .post("https://sofft.uz/api/v1/client/audios/pageable", {
        page: 0,
        perPage: 6,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(activeTab),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => setRelatedAudios(res?.data?.data || []))
      .catch((err) => console.log(err));
  }, [activeTab]);

  if (!audio) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container audio_id_page">
      <div className="video_sidebar">
        <Tabs
          className="video_tabs"
          tabPosition="left"
          activeKey={activeTab}
          onChange={(key) => setActiveaudio(key)}
          items={categories?.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />
      </div>

      <div className="audio_id_main">
        <div className="audio_card">
          <img
            className="audio_cover"
            src={getFileUrl(audio?.photo?.uuid)}
            alt=""
          />

          {audio?.audio?.uuid && (
            <audio controls className="custom_audio">
              <source src={getFileUrl(audio?.audio?.uuid)} type="audio/mpeg" />
            </audio>
          )}

          <h2 className="audio_title">{audio?.title?.uz}</h2>

          <div className="audio_meta">
            <span>👁 {audio?.views}</span>
            <span>{new Date(audio?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <h3 className="related_title">O‘xshash audiolar</h3>

        <div className="related_audio_grid">
          {relatedAudios
            .filter((item) => item.id !== Number(id))
            .map((item) => (
              <div
                key={item.id}
                className="related_audio_item"
                onClick={() => navigate(`/audio/${item.id}`)}
              >
                <img src={getFileUrl(item?.photo?.uuid)} alt="" />
                <span>{item?.title?.uz}</span>
              </div>
            ))}
        </div>

        <div className="back_btn">
          <Button type="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AudioId;
