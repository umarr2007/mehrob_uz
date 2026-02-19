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
import Fiqh from "../pages/Fiqh/Fiqh";
import Aqida from "../pages/Aqida/Aqida";
import Quran from "../pages/Quran/Quran";
import Tafsir from "../pages/Tafsir/Tafsir";
import Mojiza from "../pages/Rasululloh mo'jizalar/Mojiza";
import Ayollar from "../pages/Ayollar/Ayollar";
import IslomTarixi from "../pages/Islom-Tarix/IslomTarixi";
import UlugSiymolar from "../pages/Ulug'-Siymolar/UlugSiymolar";
import Siyrat from "../pages/Siyrat/Siyrat";
import Rivoyatlar from "../pages/Rivoyatlar/Rivoyatlar";
import Savollar from "../pages/Savol-Javob/Savollar";
import MobilApp from "../pages/MobilApp/MobilApp";
import ListId from "../components/Carousel_list/ListId";
import AllList from "../pages/AllList/AllList";

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
      { path: "fiqh", element: <Fiqh /> },
      { path: "aqida", element: <Aqida /> },
      { path: "quran", element: <Quran /> },
      { path: "tafsir", element: <Tafsir /> },
      { path: "mojiza", element: <Mojiza /> },
      { path: "ayollar", element: <Ayollar /> },
      { path: "islom-tarixi", element: <IslomTarixi /> },
      { path: "ulug-siymolar", element: <UlugSiymolar /> },
      { path: "siyrat", element: <Siyrat /> },
      { path: "rivoyatlar", element: <Rivoyatlar /> },
      { path: "savol-javob", element: <Savollar /> },
      { path: "privacy-policy", element: <MobilApp /> },
      { path: "listid/:id", element: <ListId /> },
      { path: "lists", element: <AllList /> },
    ],
  },
]);
