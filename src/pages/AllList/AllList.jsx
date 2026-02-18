import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./lists.css";
const { Meta } = Card;
export default function AsmaulHusna() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/names-of-god/list")
      .then((res) => {
        setList(res?.data || []);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="spinner">
        <Spin size="large" />
      </div>
    );

  if (!list.length) return <p>Ma'lumot topilmadi</p>;

  return (
    <div className="container">
      <h2 className="news">Asmaul Husna</h2>
      <div className="grid">
        {list.map((item, index) => (
          <Card
            onClick={() => navigate(`/listid/${item.id}`)}
            key={item.id}
            hoverable
            className="asmaul-card"
            cover={
              <img alt={item.name?.uz} src={getImageUrl(item.photo.uuid)} />
            }
          >
            <Meta
              title={`${index + 1}. ${item.name?.uz || "Noma'lum"}`}
              description={item.name?.ar || ""}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
