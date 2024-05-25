import BASE_URL from '../Route/Route'
import {io} from "socket.io-client"
export const socket = io(BASE_URL,{ transports: ["websocket"] });
