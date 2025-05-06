import { resolvers } from "./resolvers";
import {makeExecutableSchema} from "graphql-tools"
import { typeDefs } from './type-def';


export const executableschema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
