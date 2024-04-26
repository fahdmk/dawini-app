const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://192.168.100.25:3000/",
  },
});

const PORT = 4000;

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let conversations = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);
 
  
  socket.on("newAppointment", (appointmentData) => {
    const { date, duration, sender, conversationId, timeData, status, price , senderid, caretaker} = appointmentData;
  
    const messageWithAppointment = {
        id: createUniqueId(),
        text: `Appointment on ${date} for ${duration} hours.`,
        sender: sender,
        time: `${timeData.hr}:${timeData.mins}`,
        date: date,
        duration: duration,
        status:status,
        price :price ,
        senderid: senderid,
        caretaker: caretaker
    };
  
    if (conversations[conversationId]) {
        conversations[conversationId].messages.push(messageWithAppointment);
        socketIO.to(conversationId).emit("newMessage", messageWithAppointment);
    } else {
        console.error(`Conversation ${conversationId} not found.`);
    }
});
socket.on("appointmentAction", ({ action, appointmentId, conversationId }) => {
  handleAppointmentAction(action, appointmentId, conversationId, socket);
});
  socket.on("getAllConversations", () => {
    // Emit detailed information for each conversation
    const conversationDetails = Object.values(conversations).map(conv => ({
      id: conv.id,
      latestMessage: conv.latestMessage || {}  // Ensure latestMessage is not null
    }));
    socket.emit("conversationList", conversationDetails);
  });
  socket.on("startConversation", (participants) => {
    const conversationId = participants.sort().join("-");
    if (!conversations[conversationId]) {
      conversations[conversationId] = {
        id: conversationId,
        participants: participants,
        messages: [],
        latestMessage: null,
      };
    }
    socket.join(conversationId);
    // Emit updated conversation list when a new conversation is started
    const conversationDetails = Object.values(conversations).map(conv => ({
      id: conv.id,
      latestMessage: conv.latestMessage || {}
    }));
    socket.emit("conversationList", conversationDetails);
  });
  socket.on("getConversation", (conversationId) => {
    socket.emit("foundConversation", conversations[conversationId] || {});
  });
  socket.on("findGroup", (conversationId) => {
    const conversation = conversations[conversationId];
    if (conversation) {
      socket.emit("foundGroup", conversation);
    } else {
      console.error(`Conversation ${conversationId} not found.`);
      // Optionally, emit an error event or handle it appropriately
    }
  });
  socket.on("newChatMessage", (data) => {
    const { message, conversationId, currentUser, timeData } = data;
     
    if (!conversations[conversationId]) {
      console.error(`Conversation ${conversationId} not found.`);
      return;
    }
  
    const newMessage = {
      id: createUniqueId(),
      text: message,
      sender: currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
    };
  
    // Push the new message to the messages array of the conversation
    conversations[conversationId].messages.push(newMessage);
    conversations[conversationId].latestMessage = newMessage;
    // Emit an event to notify all clients in the conversation about the new message
    socketIO.to(conversationId).emit("newMessage", newMessage);
    socketIO.to(conversationId).emit("latestMessageUpdate", {
      conversationId: conversationId,
      latestMessage: newMessage
    });
    // Log the new message
    console.log(`New message added to conversation ${conversationId}:`, newMessage);
  });
});
function handleAppointmentAction(action, appointmentId, conversationId, socket) {
  const conversation = conversations[conversationId];
  if (!conversation) {
    console.error(`Conversation ${conversationId} not found.`);
    return;
  }

  const appointmentIndex = conversation.messages.findIndex(msg => msg.id === appointmentId);
  if (appointmentIndex === -1) {
    console.error(`Appointment ${appointmentId} not found in conversation ${conversationId}`);
    return;
  }

  conversation.messages[appointmentIndex].status = action === "accept" ? "accepted" : "declined";

  // Update latestMessage if needed
  if (conversation.latestMessage.id === appointmentId) {
    conversation.latestMessage.status = conversation.messages[appointmentIndex].status;
  }

  // Emit updated message and latestMessage to all clients in the conversation
  socketIO.to(conversationId).emit("updateMessage", conversation.messages[appointmentIndex]);
  socketIO.to(conversationId).emit("latestMessageUpdate", {
    conversationId,
    latestMessage: conversation.latestMessage 
  });
}
http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});