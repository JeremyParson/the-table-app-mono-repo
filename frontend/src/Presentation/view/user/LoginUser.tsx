import React, { FormEvent } from "react";
import useViewModel from "../../model/user/AuthenticateUserModel";

export default function LoginUser() {
  let { email, password, onChange, authUser, user, display, setDisplay } = useViewModel();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authUser();
  };
  
  function getDisplay() {
    if (user?._id) {
      return <div>{user.username}</div>;
    } else if (display) {
      return <button onClick={(_e) => setDisplay(false)}>
        Login
      </button>
    }

    return (
      <div className="bg-blue-400">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            className="border-2	border-black mx-3 my-1"
          ></input>
          <br></br>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            className="border-2	border-black mx-3 my-1"
          ></input>
          <br></br>
          <input
            type="submit"
            className="border-2 border-black mx-3 my-1 py-1 px-1"
          />
        </form>
      </div>
    );
  }
  return <div>{getDisplay()}</div>;
}
