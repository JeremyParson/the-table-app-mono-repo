export async function indexCharacter () {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}characters`);
    const json = await response.json();
    return json;
}

export async function detailCharacter (id: string): Promise<Character> {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}characters/${id}`);
    const json = await response.json();
    return json;
}

export async function createCharacter (data: { [x: string]: string | number | boolean | string[]}): Promise<Character> {
    delete data['_id'];
    if (data?.campaign && data.campaign == '') {
        delete data['campaign']
    }
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}characters`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode(data)
    })
    const json = await response.json();
    return json;
}

export async function deleteCharacter (id: string) {
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}characters/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })
    const json = await response.json();
    return json;
}

export async function updateCharacter(id: string, changes: { [x: string]: string | number | boolean| string[] }): Promise<Character> {
    const TOKEN = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}characters/${id}`, {
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

function encode(body: { [x: string]: string | number | boolean |  string[] }) {
  var formBody = [];
  for (var property in body) {
    var encodedKey = encodeURIComponent(property);
    let a = body[property]
    if (a instanceof Array) {
        let temp = ""
        for (let e of a) {
            temp += `${e},`
        }
        a = `[${temp}]`
    }
    var encodedValue = encodeURIComponent(a);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let encodedBody = formBody.join("&");
  return encodedBody;
}
