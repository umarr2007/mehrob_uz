import React from "react";
import { Tabs, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import IymanSidebar from "../../components/IymanSidebar/IymanSidebar";
import DetailTab from "../Iymon/DetailTab";

function Namoz() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [tabData, setTabData] = useState([]);
  const [activeKey, setActiveKey] = useState("2");
  const NAMOZ_TAB = [{ id: 2, label: "Namoz" }];

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/pillars-of-islam/${activeKey}`)
      .then((res) => setSingleData(res?.data?.data))
      .catch(() => setSingleData(null));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <img style={{ width: "100%" }} src="/arabic2.jpeg" alt="" />

      <div className="iyman_wrapper">
        <div className="iyman_left">
          {!isMobile && (
            <IymanSidebar>
              <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={NAMOZ_TAB.map((item) => ({
                  key: String(item.id),
                  label: item.label,
                }))}
                tabPlacement="left"
                style={{ marginTop: "10px" }}
              ></Tabs>
            </IymanSidebar>
          )}
        </div>

        {isMobile &&
          tabData.map((item) => (
            <Button
              type="primary"
              key={item.id}
              className="iyman_button"
              onClick={() => setActiveKey(item.id)}
            >
              {item.name.uz}
            </Button>
          ))}
        <div className="iyman_right">
          <DetailTab activeTab={activeKey} />
        </div>
      </div>
    </div>
  );
}

export default Namoz;
