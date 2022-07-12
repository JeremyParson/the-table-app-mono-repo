import { useEffect, useState } from "react";
import registerUser from "../../../Domain/user/registerUser";
import { useNavigate } from "react-router-dom";

export default function NewUserModel() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    let errors = '';
    if (values.password !== values.confirmPassword) {
      errors += '\n* Passwords must match'
    }
  const {email, username, password, confirmPassword} = values;
    if (!email.length || !username.length || !password.length || !confirmPassword.length) {
      errors += '\n* All required fields must be filled'
    }
    setMessage(errors)
  }, [values])
  
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  function onChange(prop: string, value: string) {
    setValues({ ...values, [prop]: value });
  }

  function cancel () {
    navigate(-1);
  }

  async function saveUser() {
    if (message.length) return;
    const response = await registerUser(values.email, values.username, values.password);
    console.log(response)
    if (response?.username) {
      navigate('dashboard');
    }
  }

  return {
    ...values,
    onChange,
    saveUser,
    cancel,
    message,
  };
}
