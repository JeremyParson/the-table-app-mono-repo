import { createUser } from "../../Data/user/DataStore";

export default async function registerUser(email: string, username: string, password: string) {
    return await createUser(email, username, password);
}
