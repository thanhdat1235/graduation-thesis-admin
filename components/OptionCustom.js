import { components } from "react-select";

export const OptionCustom = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>{props.label}</label>
          <img
            src="/img/png-red-round-close-x-icon-31631915146jpppmdzihs.png"
            style={{ height: "20px", width: "20px" }}
          />
        </div>
      </components.Option>
    </div>
  );
};
