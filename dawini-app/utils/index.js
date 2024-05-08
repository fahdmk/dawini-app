import { Platform } from "react-native";
import { io } from "socket.io-client";
import config from '../config.json';
const ip = config.ip;
export const BaseUrl =
  Platform.OS === "android" ? `http://${ip}:3000/` : `http://${ip}:3000`;

export const socket = io.connect(`http://${ip}:4000/`);
