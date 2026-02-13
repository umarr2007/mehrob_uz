import React, { useState, useEffect } from "react";
import IymanSidebar from "../../components/IymanSidebar/IymanSidebar";
import { Tabs, Button } from "antd";
import axios from "axios";
import DetailTab from "../Iymon/DetailTab";
function Roza() {
  const [activeKey, setActiveKey] = useState("3");
  const [tabData, setTabData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ROZA_TABS = [
    { id: 20, label: "Saharlik duosi" },
    { id: 19, label: "Ramazon ro‘zasini tutish" },
    { id: 18, label: "RO‘ZANING TABOBATDA FOYDASI" },
    { id: 17, label: "RO‘ZA KO‘PLAB BEMORLARNI DAVOLASHDA QO‘L KELMOQDA" },
    { id: 16, label: "TAROVEH NAMOZI" },
    { id: 15, label: "SAHARLIK VA IFTORLIK" },
    { id: 14, label: "RO‘ZA TUTISH MAKRUH BO‘LGAN KUNLAR" },
    { id: 13, label: "RO‘ZA TUTISH HAROM BO‘LGAN KUNLAR" },
    { id: 12, label: "RO‘ZA QANDAY IBODAT?" },
    { id: 11, label: "RO‘ZA TUTMASLIKKA RUXSATLAR" },
    { id: 10, label: "RO‘ZANING MUSTAHABLARI" },
    { id: 9, label: "RO‘ZANING SHARTLARI" },
    { id: 8, label: "RO‘ZA TUTISH QACHON LOZIM BO‘LADI?" },
    { id: 7, label: "RO‘ZANING TURLARI" },
    { id: 6, label: "Ro‘zaga oid savol-javoblar" },
    { id: 5, label: "Ramazon oyida sodir bo‘ladigan ba’zi xatolar" },
  ];

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
              <div className="tabs_scroll">
                <Tabs
                  activeKey={activeKey}
                  onChange={(key) => setActiveKey(key)}
                  tabPlacement="left"
                  style={{ marginTop: "10px" }}
                  items={ROZA_TABS.map((tab) => ({
                    key: String(tab.id),
                    label: tab.label,
                  }))}
                />
              </div>
            </IymanSidebar>
          )}
        </div>

        {isMobile &&
          ROZA_TABS.map((tab) => (
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