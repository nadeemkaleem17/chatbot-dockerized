import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { InputText } from "./components/InputText";
import { ChatsSection } from "./components/ChatsSection";
import { getBotResponse } from "./chatUtils";
import { useChat } from "../../context/ChatContext";
import "./ChatPage.css";
export const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    initializeChatList,
    /*addMessageInChat,*/ userId,
    setUserId,
    currentChat,
    dispatch,
  } = useChat();
  const [msgstream, setMsgstream] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      if (!userId) {
        const id = sessionStorage.getItem("cbid");
        setUserId(id);
      }
      if (userId && sessionStorage.getItem("token")) {
        await initializeChatList();
      }
      setLoading(false);
    }
    init();
  }, []);

  const messages = currentChat ? currentChat.messages : [];
  const [isNewQuery, setIsNewQuery] = useState(false); // Flag for new query
  useEffect(() => {
    if (currentChat) {
      setIsNewQuery(false);
    }
  }, [currentChat]);
  async function fetchResponse(message) {
    const userMessage = { text: message, sender: "user" };
    const response = await getBotResponse(message);
    const botMessage = { text: response, sender: "bot" };
    return { userMessage, botMessage };
  }
  const handleSendMessage = async (message) => {
    if (!messages || messages.length === 0) {
      return;
    }
    try {
      setLoading(true);
      setMsgstream(true);
      setIsNewQuery(true);

      const { userMessage, botMessage } = await fetchResponse(message);
      botMessage.text = botMessage.text.replace(/\*/g, "");
      dispatch({
        type: "UPDATE_CURRENT_CHAT_MESSAGES",
        payload: { newMessages: [userMessage, botMessage] },
      });
    } catch (error) {
      console.error("Error while getting response from Backend");
    } finally {
      setLoading(false);
    }

    /*
      await addMessageInChat(userId, currentChat.id, userMessage);
      await addMessageInChat(userId, currentChat.id, botMessage);
      */
  };

  return (
    <Container className="chat-page-container d-flex flex-column">
      <div className="chats-section chat-page d-flex flex-column mx-5">
        {loading && <div className="chat-bot">Generating Response...</div>}
        {messages && messages.length > 0 ? (
          <ChatsSection
            messages={messages}
            msgstream={msgstream && isNewQuery}
            setMsgstream={setMsgstream}
          />
        ) : (
          <p>Sorry Chat Is not available now...</p>
        )}
        <div>
          <InputText handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </Container>
  );
};
