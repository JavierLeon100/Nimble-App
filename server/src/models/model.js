import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Test = mongoose.model("test", TestSchema);
export default Test;
