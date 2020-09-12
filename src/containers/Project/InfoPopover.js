import React from "react";
import { Popover } from "@material-ui/core";
import { JsonToTable } from "react-json-to-table";

export default function InfoPopover(props) {
  const open = Boolean(props.anchorEl);
  const renderPopoverContent = () => {
    return (
      <div style={{ width: 200 }}>
        <JsonToTable json={props.popoverContent} />
      </div>
    );
  };
  return (
    <div>
      <Popover
        open={open}
        anchorEl={props.anchorEl}
        onClose={props.handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {renderPopoverContent()}
      </Popover>
    </div>
  );
}
