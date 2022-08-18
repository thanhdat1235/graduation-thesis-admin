import { Fragment } from "react";
import { components } from "react-select";
const MenuList = (props) => {
  return (
    <Fragment>
      <hr className="m-0" />
      <div
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          backgroundColor: "red !important",
          fontWeight: "bolder",
          display: "flex",
          alignItems: "center",
        }}
        className="select-menu"
        onClick={() => {
          props?.selectProps?.openModal();
        }}
      >
        {props?.selectProps?.title}
      </div>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </Fragment>
  );
};

export default MenuList;
