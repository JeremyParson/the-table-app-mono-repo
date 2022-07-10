export async function createUser(
  email: string,
  username: string,
  password: string
) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}user`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: encode({
      email,
      username,
      password,
    }),
  });
  const json = await response.json();
  return json;
}

export async function authenticateUser(email: string, password: string) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encode({
      email,
      password,
    }),
  });
  const text = await response.text();
  localStorage.setItem("token", text);
}

export async function getUserInfo() {
  const TOKEN = localStorage.getItem("token");
  if (!TOKEN) return;
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}auth/profile`, {
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const json = await response.json();
  return json;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export async function deleteUser(id: string) {
  const TOKEN = localStorage.getItem("token");
  if (!TOKEN) return;
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}user/${id}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });
  const json = await response.json();
  return json;
}

function encode(body: { [x: string]: string | number | boolean }) {
  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let encodedBody = formBody.join("&");
  return encodedBody;
}
