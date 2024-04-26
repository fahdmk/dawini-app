import React, { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allConversations, setAllConversations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [currentChatMessage, setCurrentChatMessage] = useState(""); 
  const [allChatMessages, setAllChatMessages] = useState([]);
  const [role, setRole] = useState("");
  const [id, setID] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        id,
        setID,
        role,
        setRole,
        showLoginView,
        setShowLoginView,
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
        allConversations,
        setAllConversations,
        modalVisible,
        setModalVisible,
        currentConversation,
        setCurrentConversation,
        currentChatMessage, 
        setCurrentChatMessage, 
        allChatMessages,
        setAllChatMessages, 
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
