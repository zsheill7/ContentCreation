import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import write from "../assets/images/write.jpg";

injectTapEventPlugin();
const dest = document.getElementById("content");
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
      resolve();
    }, 500);
  });

let render = () => {
  const MaterialUiForm = require("./MaterialUiForm").default;
  //const readme = require("./MaterialUi.md");
  ReactDOM.render(
    <div style={mainStyle}>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <MaterialUiForm onSubmit={showResults} />
          </div>
        </MuiThemeProvider>
      </Provider>
    </div>,
    dest
  );
};

const mainStyle = {
  padding: "210px",
  backgroundImage: "url(" + write + ")",
  backgroundSize: "cover"
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = error => {
    const RedBox = require("redbox-react");
    ReactDOM.render(<RedBox error={error} className="redbox" />, dest);
  };
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
  const rerender = () => {
    setTimeout(render);
  };
  module.hot.accept("./MaterialUiForm", rerender);
}

render();

/* <Markdown content={readme} />*/
