import { useState, useContext } from "react";
import loginUser from "../../../Domain/user/loginUser";
import getProfile from "../../../Domain/user/profileUser";
import { UserReducerContext } from "../../context/UserReducerContext";

export default function AuthenticateUserModel() {
  const {user, setUser} = useContext(UserReducerContext)
  const [display, setDisplay] = useState(true)

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  function onChange(value: string, prop: string) {
    setValues({ ...values, [prop]: value });
  }

  async function authUser() {
    await loginUser(values.email, values.password);
    const user = await getProfile()
    setUser(user)
  }



  return {
    ...values,
    onChange,
    authUser,
    user,
    display,
    setDisplay
  };
}
