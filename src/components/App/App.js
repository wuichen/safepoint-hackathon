import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthUserContext, useAuthState } from "../Session";
import { ROUTES } from "../../constants";
import {
  Header,
  Home,
  About,
  SignUp,
  SignIn,
  ForgotPassword,
  NoMatch,
  NotAllowed,
  Dashboard,
  Account,
  Report,
  Admin,
  Map,
  Hospital,
  Sick
} from "../";
import { Loader } from "../UI";
import "./App.css";
import { ProvideLocation } from "../../hooks/useLocation";
import { ThemeProvider } from "styled-components";
import theme from "themes/default.theme";
import GlobalStyles from "assets/style/Global.style";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://safepoint-hasura.herokuapp.com/v1/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      }
    }),
    cache: new InMemoryCache()
  });
};

export const App = () => {
  const { authUser, dbUser, loading, idToken } = useAuthState();
  const client = createApolloClient(idToken);
  if (loading) {
    return <Loader />;
  }
  return (
    <ApolloProvider client={client}>
      <ProvideLocation>
        <AuthUserContext.Provider value={{ authUser, dbUser, loading }}>
          <ThemeProvider theme={theme}>
            {/* <GlobalStyles /> */}

            <div className="app" data-testid="comp-app">
              <Header />
              <Switch>
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route exact path={ROUTES.REPORT} component={Report} />
                <Route exact path={ROUTES.ABOUT} component={About} />
                <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                <Route
                  exact
                  path={ROUTES.FORGOT_PASSWORD}
                  component={ForgotPassword}
                />
                <Route path={ROUTES.HOSPITAL} component={Hospital} />

                <Route path={ROUTES.SICK} component={Sick} />
                <Route exact path={ROUTES.MAP} component={Map} />
                {/* <Route exact path={ROUTES.ACCOUNT} component={Account} /> */}
                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route exact path={ROUTES.NOT_ALLOWED} component={NotAllowed} />
                <Route path={ROUTES.NO_MATCH} component={NoMatch} />
              </Switch>
            </div>
          </ThemeProvider>
        </AuthUserContext.Provider>
      </ProvideLocation>
    </ApolloProvider>
  );
};
