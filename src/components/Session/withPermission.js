import React, { useEffect } from "react";
import { ROUTES } from "../../constants";
import { useAuthUserContext } from "./context";
import { useHistory } from "react-router-dom";
import { Loader } from "../UI";

const withPermission = condition => Component => {
  const WithPermission = props => {
    let history = useHistory();
    const { authUser, dbUser, loading } = useAuthUserContext();

    useEffect(() => {
      if (!loading) {
        if (!authUser) {
          history.push(ROUTES.SIGN_IN);
        } else if (!condition(authUser, dbUser)) {
          history.push(ROUTES.NO_MATCH);
        }
      }
    }, [loading, authUser, dbUser, history]);

    if (loading) {
      return <Loader />;
    }

    return (
      <>
        {authUser && dbUser ? (
          <Component {...props} authUser={authUser} dbUser={dbUser} />
        ) : null}
      </>
    );
  };
  return WithPermission;
};
export default withPermission;
