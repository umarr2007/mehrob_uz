import React, { useEffect, useState } from "react";
import axios from "axios";

function DetailTab({ activeTab }) {
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    if (!activeTab) return;

    axios
      .get(`https://sofft.uz/api/v1/client/pillars-of-islam/${activeTab}`)
      .then((res) => setSingleData(res?.data?.data))
      .catch(() => setSingleData(null));
  }, [activeTab]);

  if (!singleData) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      <h2 className="iyman_title">{singleData?.name?.uz}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: singleData?.description?.uz,
        }}
      />
    </div>
  );
}
export default DetailTab;