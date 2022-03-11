import { gql } from "apollo-server";
import { Parent, Child, Task, Rewards, Home } from "./models/model";

const resolvers = {
    Query: {
        getAllHomes: async () => {
            const homes = await Home.find();
            return homes;
        },
        getHome: async (parent, args, context, info) => {
            const { id } = args;
            return await Home.findById(id);
        },
    },

    Mutation: {
        createHome: async (parent, args, context, info) => {
            const { name } = args.home;
            const home = new Home({ name });
            await home.save();
            return home;
        },
        deleteHome: async (parent, args, context, info) => {
            const { id } = args;
            await Home.findByIdAndDelete(id);
            return `Home with id: ${id} DELETED `;
        },
        updateHome: async (parent, args, context, info) => {
            const { id } = args;
            const { name } = args.home;

            //  new: true returns the object after the update is applied
            const home = await Home.findByIdAndUpdate(
                id,
                { name: name },
                { new: true }
            );
            return home;
        },
    },
};

export default resolvers;
