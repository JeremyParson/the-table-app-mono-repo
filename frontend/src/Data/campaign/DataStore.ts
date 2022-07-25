

export async function indexCampaigns () {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns`);
    const json = await response.json();
    return json;
}

export async function detailCampaign (id: string): Promise<Campaign> {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns/${id}`);
    const json = await response.json();
    return json;
}

export async function createCampaign (title: string, portrait: string, description: string, is_public: boolean): Promise<Campaign> {
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
            title,
            portrait,
            description,
            public: is_public
        })
    })
    const json = await response.json();
    return json;
}

export async function deleteCampaign (id: string) {
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })
    const json = await response.json();
    return json;
}

export async function updateCampaign(id: string, changes: { [x: string]: string | number | boolean }): Promise<Campaign> {
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode(changes)
    })
    const json = await response.json();
    return json;
}

export async function joinCampaign(id: string): Promise<Campaign>{
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}campaigns/${id}/join`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
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
