import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { Provider } from "react-redux";
import store from "./redux";
import { history } from "./redux/reducers";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' exact>
          <App />
        </Route>
        <Route path='/blog' exact>
          <Blog />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
