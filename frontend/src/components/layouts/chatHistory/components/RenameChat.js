// components/RenameChat.js

import React from "react";
import { FormControl } from "react-bootstrap";

const RenameChat = ({
  renameTitleValue,
  onRenameChange,
  onRenameSubmit,
  onRenameCancel,
  index,
}) => {
  return (
    <FormControl
      autoFocus
      value={renameTitleValue}
      onChange={onRenameChange}
      onBlur={() => onRenameSubmit(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onRenameSubmit(index); // Save on Enter
        if (e.key === "Escape") onRenameCancel(); // Cancel on Escape
      }}
    />
  );
};

export default RenameChat;
