import React from "react";
import "./muallif.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Muallif() {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/page-infos/AUTHOR")

      .then((res) => setAuthor(res.data?.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      {author?.info?.uz && (
        <div
          className="author"
          dangerouslySetInnerHTML={{
            __html: author.info?.uz,
          }}
        />
      )}
    </div>
  );
}

export default Muallif;