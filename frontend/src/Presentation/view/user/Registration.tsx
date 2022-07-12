import useModel from "../../model/user/NewUserModel";

export default function Registration() {
  const {
    email,
    username,
    password,
    onChange,
    saveUser,
    cancel,
    confirmPassword,
    message,
  } = useModel();
  return (
    <section className="bg-blue-munsell rounded-3xl p-20 max-w-3xl m-auto flex flex-col items-center">
      <form className="flex justify-around">
        <div className="inline px-5">
          <label className="block">Email</label>
          <input
            className="block"
            type="text"
            value={email}
            name="email"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            autoComplete="current-email"
            id="email"
          />
          <label className="block">Password</label>
          <input
            className="block"
            type="password"
            value={password}
            name="password"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            autoComplete="new-password"
            id="new-password"
          />
          <label className="block">Confirm Password</label>
          <input
            className="block"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            autoComplete="new-password"
            id="confirm-new-password"
          />
        </div>
        <div className="inline px-5">
          <label className="block">Username</label>
          <input
            className="block"
            type="text"
            value={username}
            name="username"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            autoComplete="current-username"
            id="username"
          />
        </div>
      </form>
      {message.length ? (
        <p className="border-danger border-2 my-2">{message}</p>
      ) : null}
      <div>
        <button
          className="border-danger border-2 text-danger px-8 py-2 m-2 rounded-full"
          onClick={(_e) => cancel()}
        >
          Cancel
        </button>
        <button
          className="bg-tea-green px-8 py-2 m-2 rounded-full"
          onClick={(_e) => saveUser()}
        >
          Register
        </button>
      </div>
    </section>
  );
}
