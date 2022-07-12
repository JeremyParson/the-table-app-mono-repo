import { getUserInfo } from "../../Data/user/DataStore";

export default async function loginUser() {
    return await getUserInfo();
}
