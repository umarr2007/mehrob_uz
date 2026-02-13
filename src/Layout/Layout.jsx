import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppFooter from "./components/Footer/AppFooter";
import Navbar from "./components/Navbar/Navbar";

const { Content } = Layout;

function MainLayout() {
  const contentStyle = {
    padding: "10px",
  };  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />

      <Content style={contentStyle}>
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
}

export default MainLayout;
