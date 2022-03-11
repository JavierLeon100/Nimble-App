import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    // tasksId: [String],
    // rewardsId: [String],
});

const childSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    points: {
        type: Number,
    },
    tasksId: [String],
    rewardsId: [String],
});

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    child: childSchema,
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
});

const rewardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    cost: {
        type: Number,
    },
    child: childSchema,
    img: {
        type: String,
    },
    url: {
        type: String,
    },
    notes: {
        type: Number,
    },
});

const homeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: String,
    parents: [parentSchema],
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
