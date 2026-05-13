const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGODB_URI = process.env.MONGODB_URI;
const SALT_NUMBER = Number(process.env.SALT_NUMBER);
const ENVIRONMENT = process.env.ENVIRONMENT;

if (!BACKEND_PORT) {
  throw new Error("Backend port is missing");
}

if (!JWT_SECRET_KEY) {
  throw new Error("jwt secret key is missing");
}

if (!FRONTEND_URL) {
  throw new Error("Front end url is missing");
}

if (!MONGODB_URI) {
  throw new Error("Mongo db connection is not defined");
}

if (!SALT_NUMBER || Number.isNaN(SALT_NUMBER)) {
  throw new Error("Salt number is not defined");
}

if (!ENVIRONMENT) {
  throw new Error("Environment is not defined");
}

export const env = {
  BACKEND_PORT,
  JWT_SECRET_KEY,
  FRONTEND_URL,
  MONGODB_URI,
  SALT_NUMBER,
  ENVIRONMENT,
};
