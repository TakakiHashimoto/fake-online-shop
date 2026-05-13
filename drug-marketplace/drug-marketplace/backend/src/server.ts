import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const PORT = env.BACKEND_PORT;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}\r\n`);
  });
}

startServer();
