import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import FontFaceObserver from "fontfaceobserver";
import $ from 'jquery';
import logo from "./logo.svg";
import "./App.css";

// Import root app
import App from "./containers/App";

// Import Language Provider
import LanguageProvider from "./containers/LanguageProvider";

import { store, history } from "./configureStore";

// Import i18n messages
import { translationMessages } from "./i18n";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const openSansObserver = new FontFaceObserver("Open Sans", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});


function Main() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  );
}

export default Main;
