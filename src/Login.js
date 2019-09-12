import React from "react";
import { useAuth0 } from "./auth/react-auth0-wrapper";

const Login = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  console.log('user', user)
  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect()
          }
        >
          Log in
        </button>
      )}

      {
        isAuthenticated &&
        <button onClick={() => logout()}>Log out</button>
        }
    </div>
  );
};

export default Login;
