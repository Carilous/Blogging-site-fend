
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {
     
    }
  }, []);

  const getInitials = (username, email) => {
    if (username && username.trim()) {


      const parts = username.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return parts[0][0].toUpperCase();
    }
    if (email) return email[0].toUpperCase();
    return "?";
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        // clear auth
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <nav className="sticky top-0 w-full bg-white/90 text-black backdrop-blur-sm z-50">
      <div className="ml-4 p-2 flex mr-4 gap-1 justify-between items-center">
      
          <div className="flex items-center space-x-2">

           <Link to ="/" >
            <span className="brand-badge ml-0 text-xl font-semibold text-white bg-emerald-900 rounded-2xl px-3 py-2">
              DB
            </span>
           </Link>

         <Link to = "/users" >
          <span className="hover:bg-green-100">  DevBlogers</span></Link>
          </div>
      

        <div className="flex items-center space-x-8">
          <Link to="/create">
            <h1 className="hover:text-emerald-300 cursor-pointer">Create</h1>
          </Link>
          <Link to="/posts">
            <h1 className="hover:text-emerald-300 cursor-pointer">Blogs</h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="hover:text-emerald-300">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="bg-emerald-900 rounded-2xl text-white py-2 px-4 hover:bg-emerald-700">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              {/* User initials button */}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-900 text-white font-bold"
                title={user.username || user.email}
              >
                {getInitials(user.username, user.email)}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 py-2 px-4 rounded-2xl text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
