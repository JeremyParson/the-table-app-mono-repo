export async function indexHandouts() {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}handouts`);
  const json = await response.json();
  return json;
}

export async function detailHandout(id: string): Promise<Handout> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}handouts/${id}`
  );
  const json = await response.json();
  return json;
}

export async function createHandout(campaignId: string, name: string, image: string, description: string, gmNotes: string): Promise<Handout> {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}handouts/${campaignId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encode({
        name,
        image,
        description,
        gmNotes
    }),
  });
  const json = await response.json();
  return json;
}

export async function deleteHandout(id: string) {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}handouts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  const json = await response.json();
  return json;
}

export async function updateHandout(
  id: string,
  changes: { [x: string]: string | number | boolean }
): Promise<Handout> {
  const TOKEN = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}handouts/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encode(changes),
    }
  );
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
