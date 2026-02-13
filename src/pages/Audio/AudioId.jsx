import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "antd";

const getFileUrl = (uuid) =>
  uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

function AudioId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);
  const [relatedAudios, setRelatedAudios] = useState([]);
  const [relatedpagination, setRelatedPagination] = useState(1);

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/audios/${id}`)
      .then((res) => {
        const data = res?.data?.data;
        setAudio(data);

        return axios.post("https://sofft.uz/api/v1/client/audios/pageable", {
          page: 0,
          perPage: 6,
          sort: { name: "createdAt", direction: "desc" },
          key: "category.id",
        });
      })
      .then((res) => {
        setRelatedAudios(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!audio) return <p>Loading...</p>;

  return (
    <div className="container">
      <Card style={{ marginTop: "20px" }} className="audio_item">
        <img
          style={{ height: "300px" }}
          className="audio_img"
          src={getFileUrl(audio?.photo?.uuid)}
          alt=""
        />

        {audio?.audio?.uuid && (
          <audio controls className="custom_audio">
            <source src={getFileUrl(audio?.audio?.uuid)} type="audio/mpeg" />
          </audio>
        )}

        <div className="audio_text">
          <span className="audio_title">{audio?.title?.uz}</span>
          <div className="audio_date">
            <span>Views: {audio?.views}</span>
            <span>{new Date(audio?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
      <div className="audiodetail_wrapper">
        {relatedAudios
          .filter((item) => item.id !== Number(id))
          .map((item) => (
            <Card
              key={item.id}
              className="audio_item"
              onClick={() => navigate(`/audio/${item.id}`)}
            >
              <img
                className="audio_img"
                src={getFileUrl(item?.photo?.uuid)}
                alt=""
              />
              <div className="audio_text">
                <span className="audio_title">{item?.title?.uz}</span>
              </div>
            </Card>
          ))}
      </div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "end" , marginBottom: "20px" }}
      >
        <Button onClick={() => navigate(-1)} style={{width: "100px"}} type="primary"> Back </Button>
      </div>
    </div>
  );
}
export default AudioId;

// import React, { useEffect, useState } from "react";
// import "./audio.css";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Tabs, Card } from "antd";

// const getFileUrl = (uuid) =>
//   uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

// function AudioId() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [audio, setAudio] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const [relatedAudios, setRelatedAudios] = useState([]);

//   // 1) Kategoriyalarni olish
//   useEffect(() => {
//     axios
//       .get("https://sofft.uz/api/v1/client/media-categories/list/AUDIO")
//       .then((res) => {
//         const data = res?.data || [];
//         setCategories(data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // 2) Tanlangan audioni olish
//   useEffect(() => {
//     axios
//       .get(`https://sofft.uz/api/v1/client/audios/${id}`)
//       .then((res) => {
//         const data = res?.data?.data;
//         setAudio(data);

//         if (data?.category?.id) {
//           setActiveCategory(String(data.category.id));
//         }
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   useEffect(() => {
//     if (!activeCategory) return;

//     axios
//       .post("https://sofft.uz/api/v1/client/audios/pageable", {
//         page: 0,
//         perPage: 12,
//         sort: { name: "createdAt", direction: "desc" },
//         search: [
//           {
//             key: "category.id",
//             operation: "=",
//             value: Number(activeCategory),
//             type: "NUMBER",
//           },
//         ],
//       })
//       .then((res) => setAudios(res?.data?.data || []))
//       .catch((err) => console.log(err));
//   }, [activeCategory]);

//   useEffect(() => {
//     if (!audio?.category?.id) return;

//     axios
//       .post("https://sofft.uz/api/v1/client/audios/pageable", {
//         page: 0,
//         perPage: 6,
//         sort: { name: "createdAt", direction: "desc" },
//         search: [
//           {
//             key: "category.id",
//             operation: "=",
//             value: Number(audio.category.id),
//             type: "NUMBER",
//           },
//         ],
//       })
//       .then((res) => setRelatedAudios(res?.data?.data || []))
//       .catch((err) => console.log(err));
//   }, [audio]);

//   if (!audio) return <p>Loading...</p>;

//   return (
//     <div className="container audio_page">
//       <div className="audio_layout">
//         <div className="audio_tabs_box">
//           <Tabs
//             tabPosition="left"
//             activeKey={activeCategory}
//             onChange={(key) => setActiveCategory(key)}
//             items={categories?.map((item) => ({
//               label: item?.name?.uz,
//               key: String(item?.id),
//             }))}
//           />
//         </div>

//         <div className="audio_content">
//           {audio?.category?.id === Number(activeCategory) && (
//             <Card className="audio_item">
//               <img
//                 className="audio_detail_img"
//                 src={getFileUrl(audio?.photo?.uuid)}
//                 alt=""
//               />

//               {audio?.audio?.uuid && (
//                 <audio controls className="custom_audio">
//                   <source
//                     src={getFileUrl(audio?.audio?.uuid)}
//                     type="audio/mpeg"
//                   />
//                 </audio>
//               )}

//               <div className="audio_text">
//                 <span className="audio_title">{audio?.title?.uz}</span>
//                 <div className="audio_date">
//                   <span>Views: {audio?.views}</span>
//                   <span>{new Date(audio?.createdAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </Card>
//           )}

//           {/* Tab bo‘yicha audios */}
//           <div className="audio_wrapper">
//             {audios
//               .filter((item) => item.id !== Number(id))
//               .map((item) => (
//                 <Card
//                   key={item.id}
//                   className="audio_item"
//                   hoverable
//                   onClick={() => navigate(`/audio/${item.id}`)}
//                 >
//                   <img
//                     className="audio_img"
//                     src={getFileUrl(item?.photo?.uuid)}
//                     alt=""
//                   />
//                   <div className="audio_text">
//                     <span className="audio_title">{item?.title?.uz}</span>
//                   </div>
//                 </Card>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AudioId;
