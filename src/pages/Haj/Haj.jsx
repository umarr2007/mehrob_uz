import React, { useState, useEffect } from "react";
import IymanSidebar from "../../components/IymanSidebar/IymanSidebar";
import { Tabs, Button } from "antd";
import axios from "axios";
import DetailTab from "../Iymon/DetailTab";

function Roza() {
  const [activeKey, setActiveKey] = useState("4q");
  const [tabData, setTabData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const HAJ_TABS = [{ id: 4, label: "Haj" }];

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/pillars-of-islam/${activeKey}`)
      .then((res) => setSingleData(res?.data?.data))
      .catch(() => setSingleData(null));
  }, [activeKey]);

  return (
    <div>
      <img style={{ width: "100%" }} src="/arabic3.jpg" alt="" />
      <div className="iyman_wrapper">
        <div className="iyman_left">
          {!isMobile && (
            <IymanSidebar>
              <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                tabPlacement="left"
                style={{ marginTop: "10px" }}
                items={HAJ_TABS.map((tab) => ({
                  key: String(tab.id),
                  label: tab.label,
                }))}
              />
            </IymanSidebar>
          )}
        </div>

        {isMobile &&
          HAJ_TABS.map((tab) => (
            <Button
              key={tab.id}
              type="primary"
              className="iyman_button"
              onClick={() => setActiveKey(String(tab.id))}
            >
              {tab.label}
            </Button>
          ))}

        <div className="iyman_right">
          <DetailTab activeTab={activeKey} />
        </div>
      </div>
    </div>
  );
}

export default Roza;
