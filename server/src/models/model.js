import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    homeId: String,
});

const childSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    points: {
        type: Number,
    },
    homeId: String,
});

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    childId: String,
    img: {
        type: String,
    },
    notes: {
        type: String,
    },
    rewardPoints: {
        type: Number,
    },
    urgent: {
        type: Boolean,
    },
    focusMode: {
        type: Boolean,
    },
    status: String,
    homeId: String,
});

const rewardSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    cost: {
        type: Number,
    },
    childId: String,
    img: {
        type: String,
    },
    url: {
        type: String,
    },
    notes: {
        type: String,
    },
    homeId: String,
});

const homeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: String,
    parents: parentSchema,
    children: [childSchema],
    tasks: [taskSchema],
    rewards: [rewardSchema],
});

const Parent = mongoose.model("parent", parentSchema);

const Child = mongoose.model("children", childSchema);

const Task = mongoose.model("task", taskSchema);

const Reward = mongoose.model("reward", rewardSchema);

const Home = mongoose.model("home", homeSchema);

export { Parent, Child, Task, Reward, Home };
