import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { resolvers } from "./resolvers";

// Read schema file using process.cwd() instead of __dirname
const typeDefs = gql(
    readFileSync(path.join(process.cwd(), 'app/api/graphql/schema.graphql'), {
        encoding: "utf-8",
    })
);

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
