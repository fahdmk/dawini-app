import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android" ? "http://10.255.255.172:3000/" : "http://10.255.255.172:3000";

export const socket = io.connect("http://10.255.255.172:4000/");
