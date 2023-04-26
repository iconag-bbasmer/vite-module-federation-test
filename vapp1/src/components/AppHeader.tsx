import * as React from "react";
import useUserStore from "sbhContainer/UserStore";

const AppHeader = () => {
  const [user] = useUserStore();
  // const [check, setCheck] = React.useState<boolean>(false);

  // const buttonHandler = (e: any) => {
  //   setCheck(true);
  // };

  return (
    <div>
      <h1>App 1</h1>
      <p>User in App1: {user}</p>
      {/* <p>
        <button onClick={buttonHandler}>Check?</button>
      </p>
      {check === true ? <p>Check!</p> : null} */}
    </div>
  );
};

export default AppHeader;
