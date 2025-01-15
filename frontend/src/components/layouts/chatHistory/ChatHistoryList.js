// ChatHistoryList.js

import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import ChatHistoryItem from "./components/ChatHistoryItem";
import DropdownMenu from "./components/DropdownMenu";
import RenameChat from "./components/RenameChat";
import "./ChatHistoryList.css";
import { useChat } from "../../../context/ChatContext";

export const ChatHistoryList = ({ chats }) => {
  const {
    chatList,
    chatsTitles,
    deleteChat,
    switchToDifferentChat,
    updateAllChatsTitles,
  } = useChat();

  const [messageTitle, setMessageTitle] = useState(chatsTitles || []); // Start with context titles if available
  const [renameTitleId, setRenameTitleId] = useState(null);
  const [renameTitleValue, setRenameTitleValue] = useState("");

  async function handleDeleteChat(id) {
    await deleteChat(id);
  }

  function getChatTitle(chat, index) {
    if (messageTitle[index]) return messageTitle[index];
    let message =
      chat.messages.length > 1
        ? chat.messages[1].text + " user chat..." || ""
        : chat.messages[0].text || "";
    const displayMessage = message.split(" ").slice(0, 5).join(" ");
    return displayMessage.length < message.length
      ? `${displayMessage}...`
      : displayMessage;
  }

  // Only recalculate titles if they are not available in context or if chatList changes
  useEffect(() => {
    if (!chatsTitles || chatsTitles.length === 0) {
      const titles = chatList.map((chat, index) => getChatTitle(chat, index));
      setMessageTitle(titles);
      updateAllChatsTitles(titles);
    } else {
      // Check if new chats were added
      const newTitles = chatList
        .slice(messageTitle.length)
        .map((chat, index) => getChatTitle(chat, index + messageTitle.length));
      if (newTitles.length > 0) {
        const updatedTitles = [...messageTitle, ...newTitles];
        setMessageTitle(updatedTitles);
        updateAllChatsTitles(updatedTitles);
      }
    }
  }, [chatList, chatsTitles, updateAllChatsTitles, messageTitle]);

  function handleSwitchChat(id) {
    switchToDifferentChat(id);
  }

  // ----------- Renaming title for chat ----------------
  function handleRenameChat(id) {
    setRenameTitleId(id);
  }

  function handleRenameSubmit(index) {
    const newTitles = messageTitle.map((title, i) =>
      index === i ? renameTitleValue : title
    );
    setMessageTitle(newTitles);
    updateAllChatsTitles(newTitles); // Update context with new titles
    setRenameTitleId(null); // Exit edit mode
    setRenameTitleValue(""); // Clear input value
  }

  function handleRenameCancel() {
    setRenameTitleId(null); // Exit edit mode
    setRenameTitleValue(""); // Clear input value
  }

  return (
    <ListGroup variant="flush">
      {chatList.map((chat, index) => (
        <ListGroup.Item
          key={chat.id}
          className="chat-list-item d-flex justify-content-between align-items-center"
        >
          {renameTitleId === index ? (
            <RenameChat
              renameTitleValue={renameTitleValue}
              onRenameChange={handleRenameSubmit}
              onRenameSubmit={handleRenameSubmit}
              onRenameCancel={handleRenameCancel}
              index={index}
            />
          ) : (
            <ChatHistoryItem
              chat={chat}
              index={index}
              messageTitle={messageTitle}
              renameTitleId={renameTitleId}
              renameTitleValue={renameTitleValue}
              onSwitchChat={handleSwitchChat}
              onRenameChange={(e) => setRenameTitleValue(e.target.value)}
              onRenameSubmit={handleRenameSubmit}
              onRenameCancel={handleRenameCancel}
            />
          )}

          <DropdownMenu
            onDeleteChat={() => handleDeleteChat(chat.id)}
            onRenameChat={() => handleRenameChat(chat.id)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
