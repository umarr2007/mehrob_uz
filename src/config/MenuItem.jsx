import { MdLanguage } from "react-icons/md";
import "./menuitem.css";
import { AiOutlineMenu } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
export const MENU = [
  {
    label: (
      <Link to="/" className="navbar_link">
        <span>Bosh sahifa</span>
      </Link>
    ),
  },
  {
    label: "Islom",
    children: [
      {
        label: (
          <Link to="/iymon" className="dropdown_item">
            <img src="/iymon.svg" alt="" />
            <span className="item_title">Iymon</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/namoz"} className="dropdown_item">
            <img src="/namoz.svg" alt="" />
            <span className="item_title">Namoz</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/zakot"} className="dropdown_item">
            <img src="/zakot.svg" alt="" />
            <span className="item_title">Zakot</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/roza"} className="dropdown_item">
            <img src="/roza.svg" alt="" />
            <span className="item_title">Ro'za</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/haj"} className="dropdown_item">
            <img src="/haj.svg" alt="" />
            <span className="item_title">Haj</span>
          </Link>
        ),
      },
    ],
  },

  {
    label: (
      <div>
        <Link to="/news" className="navbar_link">
          <span>Yangiliklar</span>
        </Link>
      </div>
    ),
  },

  {
    label: (
      <div>
        <Link to="/tashriflar" className="navbar_link">
          <span>Tashriflar</span>
        </Link>
      </div>
    ),
  },

  {
    label: (
      <div>
        <Link to="/maqolalar" className="navbar_link">
          <span>Maqolalar</span>
        </Link>
      </div>
    ),
  },

  {
    label: "Media",
    children: [
      {
        label: (
          <Link to="/video" className="dropdown_item">
            <img src="/video.svg" alt="" />
            <span className="item_title">Video</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to="/audio" className="dropdown_item">
            <img src="/audio.svg" alt="" />
            <span className="item_title">Audio</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to="/rasmlar" className="dropdown_item">
            <img src="/rasm.svg" alt="" />
            <span className="item_title">Rasmlar</span>
          </Link>
        ),
      },
    ],
  },

  {
    label: (
      <div>
        <Link to="/muallif" className="navbar_link">
          <span>Muallif</span>
        </Link>
      </div>
    ),
  },
];

export const RIGHT_MENU = [
  {
    key: "lang",

    trigger: "click",
    icon: "language",
    width: 120,
    items: [
      {
        label: "O'zbekcha",
        icon: (
          <ReactCountryFlag
            countryCode="UZ"
            svg
            style={{ width: 20, height: 20 }}
          />
        ),
      },
      {
        label: "Ўзбекча",
        icon: (
          <ReactCountryFlag
            countryCode="UZ"
            svg
            style={{ width: 20, height: 20 }}
          />
        ),
      },
    ],
  },
  {
    key: "burger",

    trigger: "click",
    icon: "menu",
    width: 200,
    isMobile: true,

    items: [
      {
        label: (
          <Link to="/iymon" className="dropdown_mobile">
            <img src="/iymon.svg" alt="" />
            <span className="item_title">Iymon</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/namoz"} className="dropdown_mobile">
            <img src="/namoz.svg" alt="" />
            <span className="item_title">Namoz</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/zakot"} className="dropdown_mobile">
            <img src="/zakot.svg" alt="" />
            <span className="item_title">Zakot</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/roza"} className="dropdown_mobile">
            <img src="/roza.svg" alt="" />
            <span className="item_title">Ro'za</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/haj"} className="dropdown_mobile">
            <img src="/haj.svg" alt="" />
            <span className="item_title">Haj</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/news"} className="dropdown_mobile">
            <img src="/aqida.svg" alt="" />
            <span className="item_title">Yangiliklar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/tashriflar"} className="dropdown_mobile">
            <img src="/fiqh.svg" alt="" />
            <span className="item_title">Tashriflar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/maqolalar"} className="dropdown_mobile">
            <img src="/aqida.svg" alt="" />
            <span className="item_title">Maqolalar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/video"} className="dropdown_mobile">
            <img src="/video.svg" alt="" />
            <span className="item_title">Videolar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/audio"} className="dropdown_mobile">
            <img src="/audio.svg" alt="" />
            <span className="item_title">Audiolar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/rasmlar"} className="dropdown_mobile">
            <img src="/rasm.svg" alt="" />
            <span className="item_title">Rasmlar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/muallif"} className="dropdown_mobile">
            <img src="/iymon.svg" alt="" />
            <span className="item_title">Muallif</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to="/fiqh" className="dropdown_item">
            <img src="/fiqh.svg" alt="" />
            <span className="item_title">Fiqh</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/aqida"} className="dropdown_item">
            <img src="/aqida.svg" alt="" />
            <span className="item_title">Aqida</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/quran"} className="dropdown_item">
            <img src="/fiqh.svg" alt="" />
            <span className="item_title">Qur'on</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/tafsir"} className="dropdown_item">
            <img src="/aqida.svg" alt="" />
            <span className="item_title">Tafsir</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/ayollar"} className="dropdown_item">
            <img src="/women.svg" alt="" />
            <span className="item_title">Ayollar sahifasi</span>
          </Link>
        ),
      },
      {
        label: (
          <Link to={"/islom-tarixi"} className="dropdown_item">
            <img src="/iymon.svg" alt="" />
            <span className="item_title">Islom tarixi</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/ulug-siymolar"} className="dropdown_item">
            <img src="/siymolar.svg" alt="" />
            <span className="item_title">Ulug'siymolar</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/siyrat"} className="dropdown_item">
            <img src="/siyrat.svg" alt="" />
            <span className="item_title">Siyrat</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/rivoyatlar"} className="dropdown_item">
            <img src="/silsila.svg" alt="" />
            <span className="item_title">Rivoyatlar silsilasi</span>
          </Link>
        ),
      },

      {
        label: (
          <Link to={"/privacy-policy"} className="dropdown_item">
            <img className="img_app" src="/app.svg" alt="" />
            <span className="item_title">Mobile Ilova</span>
          </Link>
        ),
      },
    ],
  },
];
