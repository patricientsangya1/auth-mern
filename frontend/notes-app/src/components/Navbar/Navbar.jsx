import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/Login">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
