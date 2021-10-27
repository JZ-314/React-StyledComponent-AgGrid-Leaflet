import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAccessToken, setAuthenticated } from "../../store/app/actions";

const RouteWithLayout = ({ component: Component, layout: Layout, ...rest }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const path = location.pathname;

  const [isFetchToken, setIsFetchToken] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAccessToken());
      setIsFetchToken(true);
    };
    fetchData();
  }, []);

  // console.log(app?.userToken);

  // Fetch data that is used throughout the app
  useEffect(() => {
    if (isFetchToken) {
      const authenticate = async () => {
        if (!app?.authenticated) {
          if (app?.userToken?.access_token === "") {
            // console.log('hello');
            if (path !== "/signUp" && path !== "/reset-password") {
              history.replace("/login");
            }
            return;
          }
          await dispatch(setAuthenticated());
        }
      };
      authenticate();
    }
  }, [isFetchToken]);

  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <Layout {...routeProps}>
          <Component {...routeProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
