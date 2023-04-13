import * as React from "react";
import "./App.css";
import useUserStore from "./components/store/UserStore";
import { Outlet, Link } from "react-router-dom";
import externalComponents from "./externalComponents.json";
const UserInfo = React.lazy(() => import("sbhUser/UserInfo"));

function App() {
  const [user] = useUserStore();
  const [showInfo, setShowInfo] = React.useState<boolean>(false);

  const loadUserInfo = (e: any) => {
    setShowInfo(true);
  };

  return (
    <div className="App">
      <div>
        <h1>Container</h1>
        User in Container: {user}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={loadUserInfo} style={{ backgroundColor: "#444" }}>
          Userinfo Laden
        </button>
        <React.Suspense fallback={<div>Loading...</div>}>{showInfo && <UserInfo />}</React.Suspense>
      </div>
      <nav>
        <ul>
          {externalComponents.map((component, idx) => (
            <li key={idx}>
              <Link to={component.path}>{component.linkName}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
