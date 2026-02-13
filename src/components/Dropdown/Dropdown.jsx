import React from "react";
import { Dropdown as AntDropdown } from "antd";
function Dropdown({
  items = [],
  children,
  menuWidth = 160,
  trigger = ["hover"],
}) {
  return (
    <AntDropdown
      trigger={trigger}
      overlayStyle={{ width: menuWidth }}
      menu={{
        items: items.map((item, index) => ({
          key: index,
          label: (
            <div className="dropdown_item">
              {item.icon && typeof item.icon == "string" ? (
                <img src={item.icon} alt="" className="dropdown_icon" />
              ) : (
                item.icon
              )}
              <span className="dropdown_label">{item.label}</span>
            </div>
          ),
        })),
      }}
    >
      <h5 style={{ cursor: "pointer" }}>{children}</h5>
    </AntDropdown>
  );
}
export default Dropdown;