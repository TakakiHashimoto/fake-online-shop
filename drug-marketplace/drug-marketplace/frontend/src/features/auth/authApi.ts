import type { LoginType, SignupType } from "./auth.type";

const BASE_URL = "http://localhost:5000/api/auth";

async function loginApi(data: LoginType) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to log you in");
  }

  const user = await res.json();
  return user.user;
}

async function signupApi(data: SignupType) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to sign up");
  }

  const user = await res.json();
  return user.user;
}

async function logoutApi() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to log out");
  }

  const data = await res.json();
  return data;
}

async function getMeApi() {
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to get user");
  }

  const user = await res.json();
  return user.user;
}

export { loginApi, signupApi, logoutApi, getMeApi };
