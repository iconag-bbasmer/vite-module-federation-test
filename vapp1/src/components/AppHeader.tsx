import * as React from "react";
import useUserStore from "sbhContainer/UserStore";

const AppHeader = () => {
  const [user] = useUserStore();

  return (
    <div>
      <h1>App 1</h1>
      <p>User in App1: {user}</p>
    </div>
  );
};

export default AppHeader;
