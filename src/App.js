import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import RouteWithLayout from "./components/RouteWithLayout";

import PublicLayout from "./components/Layouts/Public";
import LandingLayout from "./components/Layouts/Landing";
import MainLayout from "./components/Layouts/Main";

import Landing from "../src/pages/Landing";
import About from "../src/pages/About";
import Fields from "../src/pages/Fields";
import Resources from "../src/pages/Resources";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import EmailVerification from "../src/pages/EmailVerification";
import ResetPassword from "../src/pages/ResetPassword";
import Main from "../src/pages/Main";
import Names from "../src/pages/Names";
import Catalog from "../src/pages/Catalog";

import PageNotFound from "../src/pages/PageNotFound";
import WordList from "./pages/WordList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWithLayout
          exact
          path="/"
          component={Landing}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/about"
          component={About}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/fields"
          component={Fields}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/resources"
          component={Resources}
          layout={LandingLayout}
        />
        {/* <RouteWithLayout path="/users" component={User} layout={MainLayout} />
        <RouteWithLayout path="/user-edit" component={UserEdit} layout={MainLayout} /> */}

        <RouteWithLayout path="/main" component={Main} layout={MainLayout} />
        <RouteWithLayout
          path="/main-names"
          component={Names}
          layout={MainLayout}
        />
        <RouteWithLayout
          path="/main-words"
          component={WordList}
          layout={MainLayout}
        />

        <RouteWithLayout
          path="/catalog"
          component={Catalog}
          layout={MainLayout}
        />

        <RouteWithLayout
          exact
          path="/login"
          component={SignIn}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/signUp"
          component={SignUp}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/email-verification"
          component={EmailVerification}
          layout={LandingLayout}
        />
        <RouteWithLayout
          exact
          path="/reset-password"
          component={ResetPassword}
          layout={LandingLayout}
        />
        <RouteWithLayout
          path="/*"
          component={PageNotFound}
          layout={PublicLayout}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
