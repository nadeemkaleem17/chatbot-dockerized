// components/DropdownMenu.js

import React from "react";
import { Dropdown } from "react-bootstrap";
import "../ChatHistoryList.css";
const DropdownMenu = ({ onDeleteChat, onRenameChat }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div" // Custom component to prevent caret
        id="dropdownUserAvatarButton"
        className="chat-item-menu-icon text-muted"
      >
        ⋯
      </Dropdown.Toggle>
      <Dropdown.Menu className="chat-item-menu-options">
        <Dropdown.Item
          as="button"
          className="text-danger"
          onClick={onDeleteChat}
        >
          Delete Chat
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className="text-danger"
          onClick={onRenameChat}
        >
          Rename Chat
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
