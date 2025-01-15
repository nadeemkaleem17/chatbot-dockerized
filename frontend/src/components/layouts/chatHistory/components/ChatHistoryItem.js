// components/ChatHistoryItem.js

import React from "react";
import { FormControl } from "react-bootstrap";
import { HideDownArrow } from "../../../Elements/HideDownArrow";
import "../ChatHistoryList.css";

const ChatHistoryItem = ({
  chat,
  index,
  messageTitle,
  renameTitleId,
  renameTitleValue,
  onSwitchChat,
  onRenameChange,
  onRenameSubmit,
  onRenameCancel,
}) => {
  return (
    <span
      style={{ cursor: "pointer" }}
      className="text-truncate"
      onClick={() => onSwitchChat(chat.id)}
    >
      {renameTitleId === chat.id ? (
        <FormControl
          autoFocus
          value={renameTitleValue}
          onChange={onRenameChange}
          onBlur={() => onRenameSubmit(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRenameSubmit(index);
            if (e.key === "Escape") onRenameCancel();
          }}
        />
      ) : (
        messageTitle[index] && messageTitle[index]
      )}
      <HideDownArrow />
    </span>
  );
};

export default ChatHistoryItem;
