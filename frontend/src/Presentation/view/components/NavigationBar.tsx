import LoginUser from '../user/LoginUser';

export default function Home() {
  return (
    <nav className="flex justify-between bg-tea-green items-center">
      <div>
        <img src="/logo no name.png" className="object-contain h-10 inline" />
        <p className="inline">The Table App</p>
      </div>
      <LoginUser />
    </nav>
  );
}
