// cors.js
import cors from "cors";
// Allow a specific address to access the server (replace with the actual addresses)
const allowedOrigin = [
  "https://mlfp.chill-hub.net",
  "https://abyss.chill-hub.net",
  "http://localhost:4173",
  "http://localhost:4174",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
};

export default cors(corsOptions);
