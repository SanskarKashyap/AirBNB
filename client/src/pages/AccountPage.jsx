import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import Placespage from "./Placespage";

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
    let classes = "inline-flex gap-1 py-1 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full py-1 px-2";
    } else {
      classes += " bg-gray-200 text-gray-600";
    }
    return classes;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  return (
    <div className="w-full">
      <nav className="flex mt-10 gap-5 justify-center mb-8 ">
        <Link className={linkClasses("profile")} to="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("booking")} to="/account/booking">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          My booking
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My accommodation
        </Link>
      </nav>

      {/* 1st sub page i.e profile */}

      {subpage === "profile" && (
        <div className="text-center px-6 py-5 mt-10 mx-auto">
          <p>
            Logged in as {user.name} ({user.email})
          </p>
          <button onClick={logout} className="primary max-w-sm mt-40 ">
            Logout
          </button>
        </div>
      )}

      {/* 2nd sub page i.e booking */}
      {subpage === "booking" && (
        <div>
          <h1>Booking</h1>
        </div>
      )}
      {/* 3rd sub page i.e places */}
      {subpage === "places" && (
      <Placespage />)}
    </div>
    // <div>
    //   account page for {user.name}
    // </div>
  );
}
