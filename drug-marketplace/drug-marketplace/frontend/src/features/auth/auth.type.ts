export type LoginType = { email: string; password: string };

export type SignupType = {
  username: string;
  email: string;
  password: string;
  role: "customer" | "seller";
};
