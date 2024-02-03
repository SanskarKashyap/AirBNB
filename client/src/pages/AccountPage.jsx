import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  if (!ready) {
    return "loading...";
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  console.log("ready:", ready);
  console.log("user:", user);

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  function linkClasses(type = null) {
    // subpage
    let classes = "py-1 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full py-1 px-2";
    }
    return classes;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect('/');
    setUser(null);
  }

  return (
    <div className="w-full">
      <nav className="flex mt-10 gap-5 justify-center">
        <Link className={linkClasses("profile")} to="/account">
          My Profile
        </Link>
        <Link className={linkClasses("booking")} to="/account/booking">
          My booking
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My accommodation
        </Link>
      </nav>

      {/* 1st sub page i.e profile */}

      {subpage === "profile" && (
        <div className="text-center px-6 py-5 mt-10 mx-auto">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button onClick={logout} className="primary max-w-sm mt-2 ">
            Logout
          </button>
        </div>
      )}
    </div>
    // <div>
    //   account page for {user.name}
    // </div>
  );
}
