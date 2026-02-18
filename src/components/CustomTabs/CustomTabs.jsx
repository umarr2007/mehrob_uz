import React from "react";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./customTabs.css";
function CustomTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    { label: "Fiqh", link: "/fiqh" },
    { label: "Aqida", link: "/aqida" },
    { label: "Qur'on", link: "/quran" },
    { label: "Tafsir", link: "/tafsir" },
    { label: "Rasululloh mo'jizalari", link: "/mojiza" },

    { label: "Ayollar sahifasi", icon: "/women.svg", link: "/ayollar" },
    { label: "Islom tarixi", icon: "/iymon.svg", link: "/islom-tarixi" },
    { label: "Ulug' siymolar", icon: "/siymolar.svg", link: "/ulug-siymolar" },
    { label: "Siyrat", icon: "/siyrat.svg", link: "/siyrat" },
    {
      label: "Rivoyatlar silsilasi",
      link: "/rivoyatlar",
    },
    { label: "Savol-javoblar", icon: "/question.svg", link: "/savol-javob" },
  ];
  const activeKey = tabs.find((tab) =>
    location.pathname.startsWith(tab.link)
  )?.link;
  return (
    <Tabs
      className="fiqh_tabs"
      activeKey={activeKey}
      onChange={(key) => navigate(key)}
      items={tabs.map((tab) => ({
        key: tab.link,
        label: (
          <div className="custom_tab_wrapper">
            <div className="custom_tab_label">
              <span className="tab_text">{tab.label}</span>
            </div>
          </div>
        ),
      }))}
    />
  );
}
export default CustomTabs;
