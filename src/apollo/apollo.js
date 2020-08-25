import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";

const uploadClient = createUploadLink({
  uri: "http://localhost:4000",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null,
    },
  });

  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  concat(authMiddleware, uploadClient)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
