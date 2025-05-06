import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { makeClient } from "./client-maker";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return makeClient();
});
