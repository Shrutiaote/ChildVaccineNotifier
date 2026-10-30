
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import ChildRegistration from "./components/ChildRegistration";
import ChildList from "./components/ChildList";
import VaccinationCentres from "./components/VaccinationCentres";
import Register from "./pages/Register";
import Login from "./pages/login";

function App() {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    refreshChildren();
  }, []);

  async function refreshChildren() {
    try {
      const response = await fetch(
        "http://localhost:8080/api/children"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch children");
      }

      const data = await response.json();
      setChildren(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <BrowserRouter>
      <div>
        <h1>Child Vaccination Notifier</h1>

        <nav>
         <Link to="/">Home</Link>{" | "}
         <Link to="/register">Register</Link>{" | "}
         <Link to="/login">Login</Link>{" | "}
         <Link to="/register-child">Register Child</Link>{" | "}
         <Link to="/my-children">My Children</Link>{" | "}
         <Link to="/vaccination-centres">Vaccination Centres</Link>
     </nav>

        <hr />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome!</h2>
                <p>
                  Manage your children's vaccination records
                  and find vaccination centres.
                </p>
              </div>
            }
          />

          <Route
            path="/register-child"
            element={
              <ChildRegistration
                onChildRegistered={refreshChildren}
              />
            }
          />

          <Route
            path="/my-children"
            element={
              <ChildList
                children={children}
                setChildren={setChildren}
              />
            }
          />

          <Route
            path="/vaccination-centres"
            element={<VaccinationCentres />}
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
