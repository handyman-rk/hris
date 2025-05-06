// "use client";

import { HttpLink } from "@apollo/client";
import { SchemaLink } from '@apollo/client/link/schema';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { executableschema } from "../../app/api/graphql/schema-uri";

const GraphQLEndpoint = "http://localhost:3000/api/graphql";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: GraphQLEndpoint,
  });
  const schemaLink = new SchemaLink({
    schema: executableschema,
  })

  const isSSR = typeof window === "undefined";

  const link = isSSR ? schemaLink : httpLink;

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}
