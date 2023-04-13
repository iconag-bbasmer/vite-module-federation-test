import * as React from "react";
import useUserStore from "sbhContainer/UserStore";

const AppHeader = () => {
  const [user] = useUserStore();

  return (
    <div>
      <h1>App 2</h1>
      <p>User in App2: {user}</p>
    </div>
  );
};

export default AppHeader;
