import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Currencies from "../../pages/currencies";
import Analysis from "../../pages/analysis";
import { store } from "../../store/store";
import Header from "../Header";
import ErrorBoundary from "../ErrorBoyndary";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Currencies} />
            <Route path="/currencies" component={Currencies} />
            <Route path="/analysis" component={Analysis} />
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
