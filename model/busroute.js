import mongoose from "mongoose";

const busRouteSchema = mongoose.Schema({
    commentsID: String,
    name: String,
    email: String,
    movieID: String,
    text: String,
    date: Date
})

const busRouteModel = mongoose.model('comments',busRouteSchema);

export default busRouteModel;