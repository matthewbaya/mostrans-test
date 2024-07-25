import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CharacterDetailPage from "./pages/character-detail-page.jsx";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/character/:id",
    element: <CharacterDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
