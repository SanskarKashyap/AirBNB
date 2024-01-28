import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
      <div className="flex grow items-center justify-center">
        <div className="mb-64">
          <h1 className="text-center text-2xl mb-4">Login</h1> 
          <form className="max-w-lg mx-auto">
            <input type="email" placeholder="your@email.com" className="mb-2 border p-2" />
            <input type="password" placeholder="password" className="mb-2 border p-2" />
            <button className="primary">Login</button> 
            <div className="text-center text-gray-400">
                Dont have an account? <Link className="text-blue-300 underline"  to="/register">Register Now</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  