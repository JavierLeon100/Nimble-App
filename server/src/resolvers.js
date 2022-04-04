import { gql } from "apollo-server";
import { Parent, Child, Task, Reward, Home } from "./models/model";

const resolvers = {
    Query: {
        getAllHomes: async () => {
            // If needed we could add more types before return fro parent, child , etc
            const homes = await Home.find();
            return homes;
        },
        getHome: async (parent, args, context, info) => {
            const { id } = args;
            return await Home.findById(id);
        },

        getParent: async (parent, args, context, info) => {
            const { homeId } = args;
            return await Parent.find({ homeId });
        },

        getChildren: async (parent, args, context, info) => {
            const { homeId } = args;
            return await Child.find({ homeId });
        },
        getChild: async (parent, args, context, info) => {
            const { id } = args;
            return await Child.findById(id);
        },

        getAllTasks: async (parent, args, context, info) => {
            const { homeId } = args;
            return await Task.find({ homeId });
        },
        getTasksByChild: async (parent, args, context, info) => {
            const { childId } = args;

            return await Task.find({ childId });
        },
        getTask: async (parent, args, context, info) => {
            const { id } = args;
            return await Task.findById(id);
        },

        getAllRewards: async (parent, args, context, info) => {
            const { homeId } = args;
            return await Reward.find({ homeId });
        },
        getRewardsByChild: async (parent, args, context, info) => {
            const { childId } = args;
            return await Reward.find({ childId });
        },
        getReward: async (parent, args, context, info) => {
            const { id } = args;
            return await Reward.findById(id);
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
            const updates = {};

            if (name !== undefined) {
                updates.name = name;
            }

            //  new: true returns the object after the update is applied
            const home = await Home.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return home;
        },

        createParent: async (parent, args, context, info) => {
            const { homeId } = args.parent;
            const { name } = args.parent;
            const newParent = new Parent({ name, homeId });
            await newParent.save();
            return newParent;
        },
        deleteParent: async (parent, args, context, info) => {
            const { id } = args;
            await Parent.findByIdAndDelete(id);
            return `Parent with id: ${id} DELETED `;
        },
        updateParent: async (parent, args, context, info) => {
            const { id } = args;
            const { name } = args.parent;
            const updates = {};

            if (name !== undefined) {
                updates.name = name;
            }

            const updatedParent = await Parent.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return updatedParent;
        },

        createChild: async (parent, args, context, info) => {
            const { homeId } = args.child;
            const { name } = args.child;
            const child = new Child({ name, homeId, points: 0 });

            await child.save();
            return child;
        },
        deleteChild: async (parent, args, context, info) => {
            const { id } = args;
            await Child.findByIdAndDelete(id);
            return `Child with id: ${id} DELETED `;
        },
        updateChild: async (parent, args, context, info) => {
            const { id } = args;
            const { name } = args.child;
            const { points } = args.child;
            const updates = {};

            if (name !== undefined) {
                updates.name = name;
            }

            if (points !== undefined) {
                updates.points = points;
            }

            const child = await Child.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return child;
        },

        createTask: async (parent, args, context, info) => {
            const task = new Task(args.task);
            await task.save();
            return task;
        },
        deleteTask: async (parent, args, context, info) => {
            const { id } = args;
            await Task.findByIdAndDelete(id);
            return `Task with id: ${id} DELETED `;
        },
        updateTask: async (parent, args, context, info) => {
            const { id } = task;
            const { title } = args.task;
            const { date } = args.task;
            const { img } = args.task;
            const { notes } = args.task;
            const { rewardPoints } = args.task;
            const { urgent } = args.task;
            const { focusMode } = args.task;
            const { status } = args.task;
            const { childId } = args.task;
            console.log(args);
            const updates = {};

            if (title !== undefined) {
                updates.title = title;
            }

            if (date !== undefined) {
                updates.date = date;
            }

            if (img !== undefined) {
                updates.img = img;
            }

            if (notes !== undefined) {
                updates.notes = notes;
            }

            if (rewardPoints !== undefined) {
                updates.rewardPoints = rewardPoints;
            }

            if (urgent !== undefined) {
                updates.urgent = urgent;
            }
            if (focusMode !== undefined) {
                updates.focusMode = focusMode;
            }

            if (status !== undefined) {
                updates.status = status;
            }
            if (childId !== undefined) {
                updates.childId = childId;
            }

            const task = await Task.findByIdAndUpdate(id, updates, {
                new: true,
            });

            return task;
        },

        createReward: async (parent, args, context, info) => {
            const reward = new Reward(args.reward);
            await reward.save();
            return reward;
        },
        deleteReward: async (parent, args, context, info) => {
            const { id } = args;
            await Reward.findByIdAndDelete(id);
            return `Reward with id: ${id} DELETED `;
        },
        updateReward: async (parent, args, context, info) => {
            const { id } = args;
            const { title } = args.reward;
            const { cost } = args.reward;
            const { img } = args.reward;
            const { url } = args.reward;
            const { notes } = args.reward;
            const { childId } = args.reward;

            const updates = {};

            if (title !== undefined) {
                updates.title = title;
            }

            if (cost !== undefined) {
                updates.cost = cost;
            }

            if (img !== undefined) {
                updates.img = img;
            }

            if (url !== undefined) {
                updates.url = url;
            }

            if (notes !== undefined) {
                updates.notes = notes;
            }

            if (childId !== undefined) {
                updates.childId = childId;
            }

            const reward = await Reward.findByIdAndUpdate(id, updates, {
                new: true,
            });
            return reward;
        },
    },
};

export default resolvers;
