import React, { useEffect, useState } from "react";
import "./audio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs, Card } from "antd";

function Audio() {
  const navigate = useNavigate();
  const [audiocategories, setAudiocategories] = useState([]);
  const [avtiveaudio, setActiveaudio] = useState(null);
  const [audio, setAudio] = useState([]);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/AUDIO")
      .then((res) => {
        const data = res?.data || [];
        setAudiocategories(data);

        if (data.length > 0) {
          setActiveaudio(String(data[0].id));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!avtiveaudio) return;

    axios
      .post("https://sofft.uz/api/v1/client/audios/pageable", {
        page: 0,
        perPage: 12,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(avtiveaudio),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => setAudio(res?.data?.data || []))
      .catch((err) => console.log(err));
  }, [avtiveaudio]);

  return (
    <div className="container audio_page">
      <div className="audio_layout">
        <Tabs
          className="video_tabs"
          tabPosition="left"
          activeKey={avtiveaudio}
          onChange={(key) => setActiveaudio(key)}
          items={audiocategories?.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />

        <div className="audio_wrapper">
          {audio?.map((item) => (
            <div
              key={item?.id}
              className="audio"
              hoverable
              onClick={() => navigate(`/audio/${item?.id}`)}
            >
              <div className="video_img_box">
                <img
                  className="video_img"
                  src={getImageUrl(item?.photo?.uuid)}
                  alt="video"
                />
                <div className="play_icon">▶</div>
              </div>

              <div className="audio_text">
                <span className="audio_title">{item?.title?.uz}</span>

                <div className="audio_date">
                  <span>Views: {item?.views}</span>
                  <span>{new Date(item?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Audio;
