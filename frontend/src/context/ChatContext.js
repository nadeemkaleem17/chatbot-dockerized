import { createContext, useContext, useReducer } from "react";

import { ChatReducer } from "../reducer";
const initialState = {
  chatList: [],
  currentChat: null,
  userId: sessionStorage.getItem("cbid") || null,
  chatsTitles: [],
  total_chats: 0,
};

const ChatContext = createContext(initialState);

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  function setUserId(id) {
    dispatch({ type: "SET_USER_ID", payload: { id: id } });
  }

  async function initializeChatList() {
    try {
      /*
      const chats = await getChatList(state.userId); // Assuming getChatList fetches chats
      dispatch({ type: "SET_CHAT_LIST", payload: { chats } });
      */
      if (state.chatList.length === 0 && state.userId) {
        const newChat = {
          id: Date.now(),
          messages: [{ text: "Hi, how can I help you today?", sender: "bot" }],
        };
        await addNewChat(newChat); // Add the new chat to state and backend
      }
    } catch (error) {
      console.error("Error initializing chat list:", error);
    }
  }
  async function addNewChat(newChat) {
    if (!state.userId) {
      console.error("Cannot add chat. User ID is null.");
      return;
    }
    try {
      dispatch({ type: "ADD_NEW_CHAT", payload: { newChat: newChat } });
    } catch (err) {
      console.error("Error adding chat", err);
    }
  }

  async function addMessageInChat(id, message) {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { id: id, message: message },
    });
    try {
    } catch (err) {
      console.error("Error deleting chat", err);
    }
  }

  function clearState() {
    dispatch({ type: "CLEAR_STATE", payload: {} });
  }

  async function deleteChat(id) {
    try {
      // await deleteChatFromAPI(userId, id);
      dispatch({ type: "DELETE_CHAT", payload: { id: id } });
    } catch (err) {
      console.error("Error deleting chat", err);
    }
  }

  async function switchToDifferentChat(id) {
    try {
      // const chat = await fetchChatByIdFromAPI(userId, id);
      dispatch({ type: "SWITCH_CHAT", payload: { id: id } });
    } catch (err) {
      console.error("Error switching chat", err);
    }
  }

  function updateAllChatsTitles(titles) {
    dispatch({ type: "UPDATE_ALL_CHATS_TITLES", payload: titles });
  }
  const values = {
    chatList: state.chatList,
    currentChat: state.currentChat,
    userId: state.userId,
    total_chats: state.total_chats,
    chatsTitles: state.chatsTitles,
    initializeChatList,
    addMessageInChat,
    addNewChat,
    deleteChat,
    switchToDifferentChat,
    dispatch,
    state,
    setUserId,
    clearState,
    updateAllChatsTitles,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

// Global context of Cart
const useChat = () => {
  const context = useContext(ChatContext);
  return context;
};

export { useChat, ChatProvider };
