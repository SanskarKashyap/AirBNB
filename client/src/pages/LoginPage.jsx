import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function LoginUser(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        {
          email: email,
          password: password,
        },
        // { withCredentials: true }
      );
      
      // Extract user data and token from the response
      const { user, token } = response.data;
      
      // Save token to local storage or session storage for future use
      localStorage.setItem("token", token);

      // Login successful
      alert("Login successful");
      // Update the loggedIn state
      setRedirect(true);
    } catch (error) {
      // Login failed
      if (error.response) {
        // Server responded with an error status code
        alert("Login failed: " + error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Login failed: No response from server");
      } else {
        // Something else happened while setting up the request
        alert("Login failed: " + error.message);
      }
    }
  }

  if (redirect) {
    // Use Navigate to redirect to home page
    return <Navigate to="/" />;
  }

  return (
    <div className="flex grow items-center justify-center">
      <div className="mb-64">
        <h1 className="text-center text-2xl mb-4">Login</h1>
        <form className="max-w-lg mx-auto" onSubmit={LoginUser}>
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
          <button className="primary">Login</button>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link className="text-blue-300 underline" to="/register">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
