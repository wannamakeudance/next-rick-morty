import { ApolloClient, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient();
export default client;
