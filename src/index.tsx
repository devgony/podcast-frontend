import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { client } from "./apollo";
import "./styles/styles.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>,
  rootElement
);
