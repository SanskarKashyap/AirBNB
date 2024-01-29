import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const observer = new MutationObserver((mutations) => {
  //     // Handle mutations if needed
  //     console.log("DOM mutated:", mutations);
  //   });

  //   // Start observing changes on a relevant DOM element
  //   const targetNode = document.getElementById("yourElementId"); // Replace with the actual ID
  //   observer.observe(targetNode, { attributes: true, childList: true, subtree: true });

  //   // Cleanup function to disconnect the observer when component unmounts
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []); // Empty dependency array ensures useEffect runs once when component mounts

  async function RegisterUser(ev) {
    ev.preventDefault();
    try {
        const response = await axios.post("/register", {
            name: name,
            email: email,
            password: password,
        });
        // Registration successful
        alert("Registration successful");
        // Redirect user to login page
        window.location.href = "/login";
    } catch (error) {
        // Registration failed
        if (error.response) {
            // Server responded with an error status code
            alert("Registration failed: " + error.response.data.error);
        } else if (error.request) {
            // The request was made but no response was received
            alert("Registration failed: No response from server");
        } else {
            // Something else happened while setting up the request
            alert("Registration failed: " + error.message);
        }
    }
}


  return (
    <div className="flex grow items-center justify-center">
      <div className="mb-64">
        <h1 className="text-center text-2xl mb-4">Register</h1>
        <form className="max-w-lg mx-auto" onSubmit={RegisterUser}>
          {/* Add an ID to the element you want to observe */}
          <input
            id="yourElementId"
            type="text"
            placeholder="Sanju Baba"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mb-2 border p-2"
          />
          <input
            type="email"
            placeholder="your@email.com"
            className="mb-2 border p-2"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="mb-2 border p-2"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center text-gray-400">
            Already a member ?{" "}
            <Link className="text-blue-300 underline" to="/login">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
