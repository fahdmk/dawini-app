const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000/",
  },
});
const axios = require('axios');

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
    const { idAppointment ,date, duration, sender, conversationId, timeData, status, price , senderid , caretaker} = appointmentData;
  
    const messageWithAppointment = {
        idAppointment:idAppointment,
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
        const apiUrl = 'http://localhost:3000/api/appointments';
        axios.post(apiUrl, {
          idAppointment:idAppointment,
          Price: price,
          Date: date,
          status: status,
          IdCareTaker: caretaker,
          User_idUser: senderid,
          duration: duration
        })
        .then(response => {
          console.log('Appointment saved to database', response.data);
        })
        .catch(error => {
          console.error('Failed to save appointment:', error);
        });
    } else {
        console.error(`Conversation ${conversationId} not found.`);
    }
});
socket.on("appointmentAction", ({ action, idAppointment, conversationId }) => {
  handleAppointmentAction(action, idAppointment, conversationId, socket);
});
  socket.on("getAllConversations", () => {
    // Emit detailed information for each conversation
    const conversationDetails = Object.values(conversations).map(conv => ({
      id: conv.id,
      latestMessage: conv.latestMessage || {}  
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
function handleAppointmentAction(action, idAppointment, conversationId, socket) {
  const conversation = conversations[conversationId];
  if (!conversation) {
    console.error(`Conversation ${conversationId} not found.`);
    return;
  }

  // Find the appointment object using idAppointment
  const appointment = conversation.messages.find(msg => msg.idAppointment === idAppointment);
  if (!appointment) {
    console.error(`Appointment ${idAppointment} not found in conversation ${conversationId}`);
    return;
  }

  const newStatus = action === "accept" ? "accepted" : "declined";
  const id = appointment.idAppointment;
  appointment.status = newStatus;
 console.log(newStatus)
  
  // if (conversation.latestMessage.id === appointmentId) {
  //   conversation.latestMessage.status = newStatus;
  // }

  // Emit updated message and latestMessage to all clients in the conversation
  socketIO.to(conversationId).emit("updateMessage", appointment, newStatus);
  socketIO.to(conversationId).emit("latestMessageUpdate", {
    conversationId,
    latestMessage: conversation.latestMessage
  });
  
  // Update appointment status in MySQL database
  const apiUrl = 'http://localhost:3000/api/appointments/update-status'; // Adjust the API endpoint
  axios.post(apiUrl, {
    idAppointment : id,
    status: newStatus
  })
  .then(response => {
    console.log('Appointment status updated in database', response.data);
  })
  .catch(error => {
    console.error('Failed to update appointment status:', error);
  });
}
http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});