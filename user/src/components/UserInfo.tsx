import React, { useEffect, useState } from "react";
import useUserStore from "sbhContainer/UserStore";

const UserInfo = () => {
  const [user, setUser] = useUserStore("");
  // const [done, setDone] = useState<boolean>(false);

  const handleButtonClick = (e: any) => {
    setUser("Test 12345");
  };

  // useEffect(() => {
  //   if (user !== "") {
  //     setDone(true);
  //   }
  // }, [user]);

  return (
    <>
      <div>
        <h1>User</h1>
        <h3>User-Info: {user}</h3>
        <button onClick={handleButtonClick}>Set User</button>
      </div>
      {/* <div>{done === true ? <h3>Done!</h3> : null}</div> */}
    </>
  );
};

export default UserInfo;
