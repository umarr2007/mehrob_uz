import React, { useEffect, useState } from "react";
import "./iymon.css";
import axios from "axios";
import { Button, Tabs } from "antd";
import IymanSidebar from "../../components/IymanSidebar/IymanSidebar";
import DetailTab from "./DetailTab";
function Iymon() {
  const [tabsData, setTabsData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const IYMON_TAB = [6, 1];

  useEffect(() => {
    axios
      .post("https://sofft.uz/api/v1/client/pillars-of-islam/pageable", {
        page: 0,
        perPage: 20,
        sort: { name: "id", direction: "asc" },
      })
      .then((res) => {
        const items = res?.data?.data || [];

        const filter = items.filter((item) => IYMON_TAB.includes(item.id));
        setTabsData(filter);
      })
      .catch(() => setTabsData([]));
  }, []);

  return (
    <div className="container">
      <img style={{ width: "100%" }} src="/arabic.jpg" alt="" />
      <div className="iyman_wrapper">
        <div className="iyman_left">
          <IymanSidebar>
            <Tabs
              style={{ marginTop: "20px" }}
              tabPlacement="left"
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              items={tabsData.map((item) => ({
                key: String(item.id),
                label: <h4>{item?.name?.uz}</h4>,
              }))}
            />
          </IymanSidebar>
        </div>

        {isMobile &&
          tabsData.map((item) => (
            <Button
              type="primary"
              className="iyman_button"
              key={item.id}
              onClick={() => setActiveTab(String(item.id))}
            >
              {item.name.uz}
            </Button>
          ))}
        <div className="iyman_right">
          <DetailTab activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}
export default Iymon;
