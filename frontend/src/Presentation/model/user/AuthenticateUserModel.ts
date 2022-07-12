import { useState, useContext, useEffect } from "react";
import loginUser from "../../../Domain/user/loginUser";
import getProfile from "../../../Domain/user/profileUser";
import { UserReducerContext } from "../../context/UserReducerContext";
import { useNavigate } from "react-router-dom";

export default function AuthenticateUserModel() {
  const { user, setUser } = useContext(UserReducerContext);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    autoLogin();
  }, []);

  async function autoLogin() {
    const user = await getProfile();
    setUser(user);
  }

  function onChange(value: string, prop: string) {
    setValues({ ...values, [prop]: value });
  }

  function gotoDash() {
    navigate('dashboard')
  }

  async function authUser() {
    await loginUser(values.email, values.password);
    const user = await getProfile();
    setUser(user);
    navigate("dashboard");
  }

  return {
    ...values,
    onChange,
    authUser,
    user,
    display,
    setDisplay,
    gotoDash
  };
}
