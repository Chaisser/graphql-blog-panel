import React from "react";

import { Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createBrowserHistory } from "history";

import client from "./../apollo/apollo";
import ScrollToTop from "./ScrollToTop";
import PrivateRoute from "./PrivateRoute";

import Login from "./../components/auth/Login";
import Dashboard from "./../components/Dashboard";
import User from "./../components/user/User";
import Category from "./../components/category/Category";
import Post from "./../components/post/Post";
import Comment from "./../components/comment/Comment";
import Content from "./../components/content/Content";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/users" component={User} />
            <PrivateRoute path="/news-categories" component={Category} />
            <PrivateRoute path="/posts" component={Post} />
            <PrivateRoute path="/contents" component={Content} />
            <PrivateRoute path="/comments" component={Comment} />
          </Switch>
        </ScrollToTop>
      </ApolloProvider>
    </Router>
  );
};

export default AppRouter;
