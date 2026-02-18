import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tabs, Spin, Button } from "antd";
import IymanSidebar from "../IymanSidebar/IymanSidebar";

function ListId() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    setListLoading(true);
    axios
      .get("https://sofft.uz/api/v1/client/names-of-god/list")
      .then((res) => {
        setList(res?.data || []);
      })
      .catch(() => setList([]))
      .finally(() => setListLoading(false));
  }, []);


  useEffect(() => {
    if (!id) return;

    setItemLoading(true);

    axios
      .get(`https://sofft.uz/api/v1/client/names-of-god/${id}`)
      .then((res) => {
        const data = res?.data?.data || res?.data || null;
        setActiveItem(data);
      })
      .catch(() => setActiveItem(null))
      .finally(() => setItemLoading(false));
  }, [id]);

  return (
    <div className="container">
      <img style={{ width: "100%" }} src="/arabic.jpg" alt="" />

      <div className="iyman_wrapper">
        <div className="iyman_left">
          <IymanSidebar>
            <div className="tabs_scroll">
              {listLoading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  <Spin size="large" />
                </div>
              ) : (
                <Tabs
                  tabPlacement="left"
                  activeKey={id?.toString()}
                  onChange={(key) => navigate(`/listid/${key}`)}
                >
                  {list.map((item) => (
                    <Tabs.TabPane
                      key={item.id.toString()}
                      tab={item.name?.uz || "No name"}
                    />
                  ))}
                </Tabs>
              )}
            </div>
          </IymanSidebar>
        </div>

        <div className="iyman_right">
          {itemLoading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spin size="large" />
            </div>
          ) : activeItem ? (
            <>
              <h2 className="iyman_title">
                {activeItem.name?.uz || "No title"}
              </h2>
              {activeItem.description?.uz ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: activeItem.description.uz,
                  }}
                />
              ) : (
                <p>Ma'lumot topilmadi</p>
              )}
             
            </>
          ) : (
            <h2>Ma'lumot topilmadi</h2>
          )}
        </div>
      </div>
    </div>
  );
}
export default ListId;