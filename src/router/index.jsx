import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Iymon from "../pages/Iymon/Iymon";
import Namoz from "../pages/Namoz/Namoz";
import Zakot from "../pages/Zakot/Zakot";
import Roza from "../pages/Roza/Roza";
import Haj from "../pages/Haj/Haj";
import Yangiliklar from "../pages/Yangiliklar/Yangiliklar";
import BlogDetail from "../components/Blog/BlogDetail";
import Tashriflar from "../pages/Tashriflar/Tashriflar";
import Maqolalar from "../pages/Maqolalar/Maqolalar";
import Muallif from "../pages/Muallif/Muallif";
import Video from "../pages/Video/Video";
import VideoId from "../pages/Video/VideoId";
import Audio from "../pages/Audio/Audio";
import AudioId from "../pages/Audio/AudioId";
import Photo from "../pages/Photo/Photo";
import PhotoId from "../pages/Photo/PhotoId";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "iymon", element: <Iymon /> },
      { path: "namoz", element: <Namoz /> },
      { path: "zakot", element: <Zakot /> },
      { path: "roza", element: <Roza /> },
      { path: "haj", element: <Haj /> },
      { path: "news", element: <Yangiliklar /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "tashriflar", element: <Tashriflar /> },
      { path: "maqolalar", element: <Maqolalar /> },
      { path: "muallif", element: <Muallif /> },
      { path: "video", element: <Video /> },
      { path: "video/:id", element: <VideoId /> },
      { path: "audio", element: <Audio /> },
      { path: "audio/:id", element: <AudioId /> },
      { path: "rasmlar", element: <Photo /> },
      { path: "rasmlar/:id", element: <PhotoId /> },
    ],
  },
]);
