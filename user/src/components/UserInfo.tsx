import * as React from "react";
import useUserStore from "sbhContainer/UserStore";

const UserInfo = () => {
  const [user, setUser] = useUserStore("");

  React.useEffect(() => {
    if (setUser !== undefined) setUser("Test User");
  }, []);

  return (
    <div>
      <h3>User-Info: {user && user}</h3>
    </div>
  );
};

export default UserInfo;
