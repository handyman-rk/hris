"use client";

import {
  ApolloNextAppProvider,
} from "@apollo/client-integration-nextjs";
import { makeClient } from "./client-maker";

export function ApolloWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
