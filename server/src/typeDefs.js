import { gql } from "apollo-server";

const typeDefs = gql`
    type Parent {
        _id: String!
        name: String
        tasks: [Task]
        rewards: [Reward]
        homeId: String
    }

    type Child {
        _id: String!
        name: String
        points: Int
        tasks: [Task]
        rewards: [Reward]
        homeId: String
    }

    type Task {
        _id: String!
        title: String
        ## Create Date Type
        date: String
        ## Create Image type apollo
        img: String
        notes: String
        rewardPoints: Int
        urgent: Boolean
        focusMode: Boolean
        homeId: String
        childId: String
        status: String
    }

    type Reward {
        _id: String!
        title: String
        cost: Int
        ## Create Image type apollo
        img: String
        url: String
        notes: String
        homeId: String
        childId: String
    }

    type Home {
        _id: String
        name: String
        parents: [Parent]
        children: [Child]
        tasks: [Task]
        rewards: [Reward]
    }

    type Query {
        getAllHomes: [Home]
        getHome(id: String): Home
    }

    input HomeInput {
        name: String
        # check if its a good idea to nest everything on home or if it si it better just link it with id's
        # parents: [Parent]
        # children: [Child]
        # tasks: [Task]
        # rewards: [Reward]
    }

    type Mutation {
        createHome(home: HomeInput): Home
        deleteHome(id: String): String
        updateHome(id: String, home: HomeInput): Home
    }
`;

export default typeDefs;
