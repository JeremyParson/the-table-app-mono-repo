import LoginUser from "../user/LoginUser";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav className="flex justify-between bg-tea-green items-center">
      <div className="mx-2">
        <Link to="/">
          <img src="/logo no name.png" className="object-contain h-10 inline" />
          <p className="inline">The Table App</p>
        </Link>
      </div>
      <LoginUser />
    </nav>
  );
}
