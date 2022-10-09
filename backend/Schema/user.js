import mongoose from "mongoose";

const user = mongoose.Schema({
    name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: true,
        },
    password: {
        type: String,
        required: true,
        minlength: 6,
        },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
        ],
});

export default mongoose.model("user", user);