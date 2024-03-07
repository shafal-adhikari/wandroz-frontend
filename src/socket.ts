import { io } from "socket.io-client";

const URL = "http://localhost:5500";

export const socket = io(URL, {
  path: "/socket.io",
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("token"),
  },
});
