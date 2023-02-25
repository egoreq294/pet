import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mongoose from "mongoose";
import dotenv from "dotenv";
import lodash from "lodash";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { baseTypeDefs, userTypeDefs } from "./src/graphql/typeDefs/index.js";
import { userResolvers } from "./src/graphql/resolvers/index.js";
import { parseToken, validateAccessToken } from "./src/utils/index.js";

dotenv.config();

const MONGODB = process.env.MONGODB;
const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs: [baseTypeDefs, userTypeDefs],
  resolvers: lodash.merge({}, userResolvers),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .then(() => {
    return server.start();
  })
  .then(() => {
    return app.use(
      "/graphql",
      cors({ origin: "http://localhost:3000", credentials: true }),
      bodyParser.json(),
      cookieParser(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const token = parseToken(req?.headers?.authorization);
          const userData = validateAccessToken(token);
          return { userId: userData?._id, res, req };
        },
      })
    );
  })
  .then(() => {
    httpServer.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
