import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android" ? "http://192.168.17.55:3000/" : "http://192.168.17.55:3000";

export const socket = io.connect("http://192.168.17.55:4000/");
