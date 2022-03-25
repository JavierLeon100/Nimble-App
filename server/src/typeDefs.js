import { gql } from "apollo-server";

const typeDefs = gql`
    type Parent {
        _id: String
        name: String
        homeId: String
    }

    type Child {
        _id: String
        name: String
        points: Int
        homeId: String
    }

    type Task {
        _id: String
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
        _id: String
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
        parents: Parent
        children: [Child]
        tasks: [Task]
        rewards: [Reward]
    }

    type Query {
        getAllHomes: [Home]
        getHome(id: String): Home

        getParent(homeId: String): Parent

        getChildren(homeId: String): [Child]
        getChild(id: String): Child

        getAllTasks(homeId: String): [Task]
        getTasksByChild(childId: String): [Task]
        getTask(id: String): Task

        getAllRewards(homeId: String): [Reward]
        getRewardsByChild(childId: String): [Reward]
        getReward(id: String): Reward
    }

    input HomeInput {
        name: String
    }

    input ParentInput {
        name: String
        homeId: String
    }

    input ChildInput {
        name: String
        points: Int
        homeId: String
    }

    input TaskInput {
        title: String
        ## Create Date Type
        date: String
        ## Create Image type apollo
        img: String
        notes: String
        rewardPoints: Int
        urgent: Boolean
        focusMode: Boolean
        status: String
        childId: String
        homeId: String
    }

    input RewardInput {
        title: String
        cost: Int
        ## Create Image type apollo
        img: String
        url: String
        notes: String
        childId: String
        homeId: String
    }

    type Mutation {
        createHome(home: HomeInput): Home
        deleteHome(id: String): String
        updateHome(id: String, home: HomeInput): Home

        createParent(parent: ParentInput): Parent
        deleteParent(id: String): String
        updateParent(id: String, parent: ParentInput): Parent

        createChild(child: ChildInput): Child
        deleteChild(id: String): String
        updateChild(id: String, child: ChildInput): Child

        createTask(task: TaskInput): Task
        deleteTask(id: String): String
        updateTask(id: String, task: TaskInput): Task

        createReward(reward: RewardInput): Reward
        deleteReward(id: String): String
        updateReward(id: String, reward: RewardInput): Reward
    }
`;

export default typeDefs;
