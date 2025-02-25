const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchAPI(input: string, options) {
  const url = `${BASE_URL}/${input.replace(/^\/+/, "")}`;
  const token = await getSavedToken();
  const newOptions: any = options || {};
  newOptions.headers = newOptions.headers || {};

  if (token) {
    newOptions.headers.authorization = `Bearer ${token}`;
  }

  newOptions.headers["content-type"] = "application/json";

  if (newOptions.body) {
    newOptions.body = JSON.stringify(newOptions.body);
  }

  const res = await fetch(url, newOptions);
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}

export async function sendCode(email: string) {
  return fetchAPI("/auth", {
    method: "POST",
    body: { email },
  });
}

export async function getToken(email: string, code: string) {
  const data = await fetchAPI("/auth/token", {
    method: "POST",
    body: { email, code: parseInt(code) },
  });
  saveToken(data.token);
  return true;
}

export async function saveToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export async function getSavedToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export async function fetchApiAuth(api: [string, RequestInit?]) {
  const [urlPath, options = {}] = api;

  try {
    const response = await fetch(BASE_URL + urlPath, options);
    const data = await response.json();

    if (data) {
      return data;
    }

    throw new Error("No data received");
  } catch (e) {
    console.error(e); // Log the error for debugging
    return "Algo salió mal"; // Return a generic error message
  }
}
