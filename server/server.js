import "dotenv/config.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import resolvers from "./src/resolvers";
import typeDefs from "./src/typeDefs";
import mongoose from "mongoose";
import { generateUploadURL } from "./src/s3";

const startApolloServer = async (typeDefs, resolvers) => {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    app.get("/s3Url", async (req, res) => {
        const url = await generateUploadURL();
        res.send({ url });
    });

    await server.start();

    server.applyMiddleware({ app });

    //Connect to Database
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Mongoose connected");

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(
        `🦥 Server ready at http://localhost:4000${server.graphqlPath}`
    );
};

startApolloServer(typeDefs, resolvers);
