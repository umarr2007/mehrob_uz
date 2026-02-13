import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tabs } from "antd";

function VideoId() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/videos/${id}`)
      .then((res) => {
        setVideo(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const getYoutubeId = (url) => {
    const regExp = /v=([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: "20px"  }}>{video?.title?.uz}</h2>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${getYoutubeId(video?.url)}`}
        frameBorder="0"
        allowFullScreen
        title="video"
      ></iframe>
    </div>
  );
}
export default VideoId;