import { Hono } from "hono";

export async function loginTestUser(
  app: Hono,
  email = "kuc8301@gmail.com",
  password = "kuc8301@gmail.com",
): Promise<string> {
  const res = await app.request("/api/auth/sign-in/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Login failed: ${res.status} ${body}`);
  }

  const setCookies = res.headers.getSetCookie();

  const cookies = setCookies.map((cookie) => {
    const nameValue = cookie.split(";")[0].trim();
    return nameValue;
  });

  return cookies.join("; ");
}
