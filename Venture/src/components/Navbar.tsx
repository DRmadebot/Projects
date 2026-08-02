import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          ComplyEasy AI
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          to="/features"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Features
        </Link>

        <Link
          to="/pricing"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Pricing
        </Link>
      </div>

      {/* Authentication */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;