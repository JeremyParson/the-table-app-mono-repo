import { FormEvent } from "react";
import useViewModel from "../../model/user/AuthenticateUserModel";

export default function LoginUser() {
  let { email, password, onChange, authUser, user, display, setDisplay, gotoDash } =
    useViewModel();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authUser();
  };

  function getDisplay() {
    if (user?._id) {
      return (
        <div>
          {user.username}{" "}
          <button
            className="px-8 py-2 m-2 rounded-full bg-blue-munsell"
            onClick={(_e) => gotoDash()}
          >
            Dashboard
          </button>
        </div>
      );
    } else if (display) {
      return (
        <button
          className="block px-8 py-2 m-2 rounded-full bg-blue-munsell"
          onClick={(_e) => setDisplay(false)}
        >
          Login
        </button>
      );
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
        <button onClick={_e => setDisplay(true)}>Cancel</button>
      </div>
    );
  }
  return <div>{getDisplay()}</div>;
}
