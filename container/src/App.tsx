import * as React from "react";
import "./App.css";
import useUserStore from "sbhContainer/UserStore";
import { Outlet, Link } from "react-router-dom";
import RemoteComponent from "./components/RemoteComponent";

function App() {
  const [user] = useUserStore();
  const [showInfo, setShowInfo] = React.useState<boolean>(false);
  const [loadedModules, setLoadedModules] = React.useState<any[]>([]);

  const loadModules = (e: any) => {
    fetch("./externalRemotes.json").then((response) => {
      response.json().then((obj) => {
        setLoadedModules(obj);
      });
    });
  };

  React.useEffect(() => {
    setShowInfo(true);
  }, [loadedModules]);

  return (
    <div className="App">
      <div>
        <h1>Container</h1>
        User in Container: {user}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={loadModules} style={{ backgroundColor: "#444" }}>
          Load Modules
        </button>
        {showInfo === true ? (
          <>
            <RemoteComponent modulesToLoad={loadedModules} fallback={<div>Loading...</div>} />
            {/* {loadedModules.map((remoteApp, idx) => (
              <div style={{ marginTop: 10 }} key={idx}>
                <RemoteComponent
                  remoteUrl={remoteApp.remoteUrl}
                  remote={remoteApp.component}
                  component={remoteApp.module}
                  fallback={<div>Loading...</div>}
                />
              </div>
            ))} */}
            {/* <nav>
              <ul>
                {loadedModules.map((component, idx) => (
                  <li key={idx}>
                    <Link to={component.remoteUrl}>{component.module}</Link>
                  </li>
                ))}
              </ul>
            </nav> */}
            <div>
              <Outlet />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
