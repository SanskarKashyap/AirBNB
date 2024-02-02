import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import Register from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>{" "}
    </UserContextProvider>
  );
}

export default App;
