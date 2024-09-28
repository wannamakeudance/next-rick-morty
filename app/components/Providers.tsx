"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
};

export default Providers;
