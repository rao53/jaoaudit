const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const COOKIE_NAME = "receipt_session";

function getSecret() {
  const secret = process.env.APP_SECRET;
  if (!secret) {
    throw new Error("APP_SECRET is not set.");
  }
  return secret;
}

function signSession(payload) {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

function getSession(req) {
  const header = req.headers.cookie || "";
  const cookies = cookie.parse(header);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, getSecret());
  } catch (error) {
    return null;
  }
}

function sessionCookie(token) {
  return cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

function clearSessionCookie() {
  return cookie.serialize(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

module.exports = { signSession, getSession, sessionCookie, clearSessionCookie };
