import { authenticateUser } from "../../Data/user/DataStore";

export default async function loginUser(email: string, password: string) {
    await authenticateUser(email, password);
    return localStorage.getItem('token') !== undefined;
}
