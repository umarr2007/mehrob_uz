import React from "react";
import IymanSidebar from "../../components/IymanSidebar/IymanSidebar";

function Zakot() {
  return (
    <div>
      <img style={{ width: "100%" }} src="/arabic3.jpg" alt="" />
      <div className="iyman_wrapper">
        <div className="iyman_left">
          <IymanSidebar />
        </div>
        <div className="iyman_right">
          <div className="empty">
            <h4 className="empty_text">Ma'lumot yoq</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zakot;
