import io from "socket.io-client";

const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || "http://localhost:3000";

const socket = io(SOCKET_URL, { path: "/socket.io", forceNew: true });

export { socket };
