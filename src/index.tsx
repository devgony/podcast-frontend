import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { client } from "./apollo";
import "./styles/styles.css";
import "react-multi-carousel/lib/styles.css";
import App from "./components/app";
import { HelmetProvider } from "react-helmet-async";
// import "./styles/custom-player.scss";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  rootElement
);
